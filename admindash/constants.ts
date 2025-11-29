import { User, ActivityLog } from './types';

// Deterministic mock data generation
const NAMES = [
  'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Evan Wright',
  'Fiona Gallagher', 'George Miller', 'Hannah Abbott', 'Ian Somerhalder', 'Julia Roberts',
  'Kevin Bacon', 'Laura Croft', 'Mike Ross', 'Nancy Wheeler', 'Oscar Isaac',
  'Peter Parker', 'Quinn Fabray', 'Rachel Green', 'Steve Rogers', 'Tony Stark'
];

export const MOCK_USERS: User[] = NAMES.map((name, index) => ({
  id: `usr_${index + 100}`,
  name,
  email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
  status: index % 3 === 0 ? 'Inactive' : 'Active',
  avatar: `https://picsum.photos/seed/${index + 100}/150/150`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  role: index % 5 === 0 ? 'Admin' : 'User',
  location: ['New York', 'London', 'San Francisco', 'Berlin', 'Tokyo'][index % 5]
}));

export const RECENT_ACTIVITY: ActivityLog[] = [
  { id: 'act_1', userId: 'usr_100', action: 'Logged in', timestamp: new Date().toISOString() },
  { id: 'act_2', userId: 'usr_100', action: 'Updated profile', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 'act_3', userId: 'usr_100', action: 'Changed password', timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: 'act_4', userId: 'usr_100', action: 'Downloaded report', timestamp: new Date(Date.now() - 172800000).toISOString() },
  { id: 'act_5', userId: 'usr_100', action: 'Invited team member', timestamp: new Date(Date.now() - 259200000).toISOString() },
];