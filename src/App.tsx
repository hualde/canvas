import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import Canvas from './pages/Canvas';
import { ValuePropositionCanvas } from './pages/ValuePropositionCanvas';
import { SWOTCanvas } from './pages/SWOTCanvas';
import { EmpathyMap } from './pages/EmpathyMap';
import { PESTELCanvas } from './pages/PESTELCanvas';
import { Login } from './pages/Login';
import { Tutorial } from './components/Tutorial';
import Upgrade from './pages/Upgrade';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider';
import { useInitializeUserSubscription } from './hooks/useInitializeUserSubscription';

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

function HandleRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        // Handle successful checkout
        console.log('Successful checkout. Session ID:', sessionId);
        // You can add more logic here, like updating the user's subscription status
        // Then navigate to the dashboard without the session_id in the URL
        navigate('/', { replace: true });
      }
    }
  }, [location, isAuthenticated, navigate]);

  return null;
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth0();
  useInitializeUserSubscription();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HandleRedirect />
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="canvas/:id" element={<Canvas />} />
        <Route path="value-proposition/:id" element={<ValuePropositionCanvas />} />
        <Route path="swot/:id" element={<SWOTCanvas />} />
        <Route path="empathy-map/:id" element={<EmpathyMap />} />
        <Route path="pestel/:id" element={<PESTELCanvas />} />
        <Route path="tutorial" element={<Tutorial />} />
        <Route path="upgrade" element={<Upgrade />} />
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