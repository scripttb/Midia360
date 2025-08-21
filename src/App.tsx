import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';
import CRMDashboard from './pages/CRM/CRMDashboard';
import ChatAssistant from './pages/Chat/ChatAssistant';
import ErrorBoundary from './components/Common/ErrorBoundary';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Super Admin Routes */}
      {user.role === 'super_admin' && (
        <>
          <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/admin/*" element={<SuperAdminDashboard />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </>
      )}

      {/* Tenant Routes */}
      {user.role !== 'super_admin' && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crm/*" element={<CRMDashboard />} />
          <Route path="/chat" element={<ChatAssistant />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </>
      )}

      {/* Common Routes */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <AppRoutes />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
