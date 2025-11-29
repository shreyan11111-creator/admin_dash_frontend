export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  avatar: string;
  createdAt: string; // ISO Date string
  role: string;
  location: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export type SortField = 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  status: UserStatus | 'All';
}

export interface PaginationState {
  page: number;
  limit: number;
}