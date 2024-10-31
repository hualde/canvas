import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Canvas } from './pages/Canvas';
import { SharedCanvas } from './pages/SharedCanvas';
import { Login } from './pages/Login';
import { Tutorial } from './components/Tutorial';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/share/:shareId" element={<SharedCanvas />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="canvas/:id" element={<Canvas />} />
        <Route path="tutorial" element={<Tutorial />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AppContent />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;