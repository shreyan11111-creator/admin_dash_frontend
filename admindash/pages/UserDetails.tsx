import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button, Card, Badge, Modal } from '../components/ui/Shared';
import { IconArrowLeft, IconEdit } from '../components/ui/Icons';
import { RECENT_ACTIVITY } from '../constants';
import { UserStatus } from '../types';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  
  // Find User
  const user = state.users.find(u => u.id === id);

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState<UserStatus>('Active');
  const [error, setError] = useState('');

  // Hydrate form on open
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditStatus(user.status);
    }
  }, [user, isEditOpen]);

  const handleSave = () => {
    if (!editName.trim()) {
      setError('Name is required');
      return;
    }
    if (user) {
      dispatch({ 
        type: 'UPDATE_USER', 
        payload: { id: user.id, name: editName, status: editStatus } 
      });
      setIsEditOpen(false);
      setError('');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User not found</h2>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/users')}>Back to List</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Navigation */}
      <button 
        onClick={() => navigate('/users')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="w-4 h-4 mr-1" />
        Back to Users
      </button>

      {/* Main Profile Card */}
      <Card>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-slate-700 shadow-sm"
          />
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                   <Badge status={user.status} />
                   <span className="text-xs text-gray-400">•</span>
                   <span className="text-sm text-gray-500 dark:text-gray-400">{user.role}</span>
                   <span className="text-xs text-gray-400">•</span>
                   <span className="text-sm text-gray-500 dark:text-gray-400">{user.location}</span>
                </div>
              </div>
              <Button onClick={() => setIsEditOpen(true)} className="flex items-center gap-2">
                <IconEdit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-wider">Joined</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-wider">Last Login</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">2 hours ago</p>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-wider">Reports</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">12 Generated</p>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-wider">Team</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Engineering</p>
               </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {RECENT_ACTIVITY.map((activity, eventIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {eventIdx !== RECENT_ACTIVITY.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ring-8 ring-white dark:ring-slate-800">
                       <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {activity.action}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <time dateTime={activity.timestamp}>
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        title="Edit User Details"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              id="name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div>
             <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Status</label>
             <select
                id="status"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as UserStatus)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
          </div>

          <div className="mt-5 sm:mt-6 flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetails;