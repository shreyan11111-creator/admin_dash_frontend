import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, UserStatus } from '../types';
import { MOCK_USERS } from '../constants';

// State Definition
interface AppState {
  users: User[];
  isDarkMode: boolean;
  isLoading: boolean;
}

// Action Definition
type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_USER'; payload: { id: string; name: string; status: UserStatus } }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial State
const initialState: AppState = {
  users: MOCK_USERS,
  isDarkMode: false,
  isLoading: false,
};

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id
            ? { ...u, name: action.payload.name, status: action.payload.status }
            : u
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider
export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync theme with DOM
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};