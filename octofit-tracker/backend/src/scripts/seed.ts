import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofit';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db database');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex-rivera',
        email: 'alex.rivera@example.com',
        profile: {
          displayName: 'Alex Rivera',
          goal: 'Run a spring half marathon',
          fitnessLevel: 'intermediate',
        },
      },
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        profile: {
          displayName: 'Maya Chen',
          goal: 'Build strength and mobility',
          fitnessLevel: 'advanced',
        },
      },
      {
        username: 'sam-patel',
        email: 'sam.patel@example.com',
        profile: {
          displayName: 'Sam Patel',
          goal: 'Stay consistent through busy work weeks',
          fitnessLevel: 'beginner',
        },
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crew',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        members: [users[1]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Outdoor Run',
        durationMinutes: 42,
        points: 420,
        completedAt: new Date('2026-07-01T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        points: 520,
        completedAt: new Date('2026-07-02T18:15:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Yoga Flow',
        durationMinutes: 30,
        points: 250,
        completedAt: new Date('2026-07-03T12:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[1]._id,
        team: teams[1]._id,
        points: 1520,
        rank: 1,
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        points: 1340,
        rank: 2,
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        points: 980,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        name: '5K Builder',
        description: 'Intervals and steady running for improving weekly mileage.',
        difficulty: 'intermediate',
        activities: ['Warm-up walk', 'Run intervals', 'Cooldown stretch'],
      },
      {
        name: 'Desk Reset Mobility',
        description: 'A short mobility session for shoulders, hips, and back.',
        difficulty: 'beginner',
        activities: ['Cat-cow', 'Hip flexor stretch', 'Thoracic rotations'],
      },
      {
        name: 'Full-body Strength Circuit',
        description: 'Compound lifts and bodyweight moves for total-body strength.',
        difficulty: 'advanced',
        activities: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Plank holds'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
