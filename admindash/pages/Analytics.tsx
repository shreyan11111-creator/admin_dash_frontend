import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Shared';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Analytics = () => {
  const { state } = useApp();
  const { users, isDarkMode } = state;

  // Derive Data
  const activeCount = users.filter(u => u.status === 'Active').length;
  const inactiveCount = users.filter(u => u.status === 'Inactive').length;

  const statusData = [
    { name: 'Active', value: activeCount },
    { name: 'Inactive', value: inactiveCount },
  ];

  // Mock Trend Data (Last 7 days)
  const trendData = [
    { name: 'Mon', signups: 12 },
    { name: 'Tue', signups: 19 },
    { name: 'Wed', signups: 15 },
    { name: 'Thu', signups: 25 },
    { name: 'Fri', signups: 32 },
    { name: 'Sat', signups: 45 },
    { name: 'Sun', signups: 38 },
  ];

  const COLORS = ['#10b981', '#ef4444'];
  const CHART_TEXT_COLOR = isDarkMode ? '#94a3b8' : '#64748b';
  const TOOLTIP_STYLE = {
    backgroundColor: isDarkMode ? '#1e293b' : '#fff',
    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
    color: isDarkMode ? '#fff' : '#000',
    borderRadius: '8px'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KPI Cards */}
        <Card className="flex items-center justify-between border-l-4 border-l-primary-500">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{users.length}</h3>
          </div>
          <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">U</span>
          </div>
        </Card>
        <Card className="flex items-center justify-between border-l-4 border-l-green-500">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Ratio</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {((activeCount / users.length) * 100).toFixed(0)}%
            </h3>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
             <span className="text-green-600 dark:text-green-400 text-xl font-bold">A</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">User Signups (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={CHART_TEXT_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={CHART_TEXT_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line 
                  type="monotone" 
                  dataKey="signups" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Active vs Inactive Users</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;