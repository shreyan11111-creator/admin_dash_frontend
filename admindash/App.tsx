import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
import Analytics from './pages/Analytics';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/analytics" replace />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Route>
    </Routes>
  );
};

export default App;