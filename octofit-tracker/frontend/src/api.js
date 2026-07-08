const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const codespaceApiBaseUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`

export const apiBaseUrl = codespaceName ? codespaceApiBaseUrl : 'http://localhost:8000/api'

export function collectionUrl(collection) {
  return `${apiBaseUrl}/${collection}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  for (const key of ['results', 'items', 'data', 'docs', 'records']) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchCollection(collection) {
  const response = await fetch(collectionUrl(collection))

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}

export async function fetchEndpoint(endpointUrl) {
  const response = await fetch(endpointUrl)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}
