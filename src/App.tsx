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
import { Examples } from './pages/Examples';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Import example canvas components
import AppleBusinessModelCanvas from './pages/examples/apple/business-model-canvas';
import AppleValuePropositionCanvas from './pages/examples/apple/value-proposition-canvas';
import AppleEmpathyMapCanvas from './pages/examples/apple/empathy-map-canvas';
import ApplePESTELCanvas from './pages/examples/apple/pestel-canvas';
import AppleSWOTCanvas from './pages/examples/apple/swot-canvas';
import GoogleBusinessModelCanvas from './pages/examples/google/business-model-canvas';
import GoogleEmpathyMapCanvas from './pages/examples/google/empathy-map-canvas';
import GooglePESTELCanvas from './pages/examples/google/pestel-canvas';
import GoogleSWOTCanvas from './pages/examples/google/swot-canvas';
import GoogleValuePropositionCanvas from './pages/examples/google/value-proposition-canvas';
import AmazonBusinessModelCanvas from './pages/examples/amazon/business-model-canvas';
import AmazonEmpathyMapCanvas from './pages/examples/amazon/empathy-map-canvas';
import AmazonPESTELCanvas from './pages/examples/amazon/pestel-canvas';
import AmazonSWOTCanvas from './pages/examples/amazon/swot-canvas';
import AmazonValuePropositionCanvas from './pages/examples/amazon/value-proposition-canvas';
import MicrosoftBusinessModelCanvas from './pages/examples/microsoft/business-model-canvas';
import MicrosoftEmpathyMapCanvas from './pages/examples/microsoft/empathy-map-canvas';
import MicrosoftPESTELCanvas from './pages/examples/microsoft/pestel-canvas';
import MicrosoftSWOTCanvas from './pages/examples/microsoft/swot-canvas';
import MicrosoftValuePropositionCanvas from './pages/examples/microsoft/value-proposition-canvas';
import TeslaBusinessModelCanvas from './pages/examples/tesla/business-model-canvas';
import TeslaEmpathyMapCanvas from './pages/examples/tesla/empathy-map-canvas';
import TeslaPESTELCanvas from './pages/examples/tesla/pestel-canvas';
import TeslaSWOTCanvas from './pages/examples/tesla/swot-canvas';
import TeslaValuePropositionCanvas from './pages/examples/tesla/value-proposition-canvas';

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
        console.log('Successful checkout. Session ID:', sessionId);
        navigate('/dashboard', { replace: true });
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
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HandleRedirect />
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="canvas/:id" element={<Canvas />} />
          <Route path="value-proposition/:id" element={<ValuePropositionCanvas />} />
          <Route path="swot/:id" element={<SWOTCanvas />} />
          <Route path="empathy-map/:id" element={<EmpathyMap />} />
          <Route path="pestel/:id" element={<PESTELCanvas />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="upgrade" element={<Upgrade />} />
          <Route path="examples" element={<Examples />} />
          
          {/* Example canvas routes */}
          <Route path="examples/apple/business" element={<AppleBusinessModelCanvas />} />
          <Route path="examples/apple/value-proposition" element={<AppleValuePropositionCanvas />} />
          <Route path="examples/apple/empathy-map" element={<AppleEmpathyMapCanvas />} />
          <Route path="examples/apple/pestel" element={<ApplePESTELCanvas />} />
          <Route path="examples/apple/swot" element={<AppleSWOTCanvas />} />
          <Route path="examples/google/business" element={<GoogleBusinessModelCanvas />} />
          <Route path="examples/google/empathy-map" element={<GoogleEmpathyMapCanvas />} />
          <Route path="examples/google/pestel" element={<GooglePESTELCanvas />} />
          <Route path="examples/google/swot" element={<GoogleSWOTCanvas />} />
          <Route path="examples/google/value-proposition" element={<GoogleValuePropositionCanvas />} />
          <Route path="examples/amazon/business" element={<AmazonBusinessModelCanvas />} />
          <Route path="examples/amazon/empathy-map" element={<AmazonEmpathyMapCanvas />} />
          <Route path="examples/amazon/pestel" element={<AmazonPESTELCanvas />} />
          <Route path="examples/amazon/swot" element={<AmazonSWOTCanvas />} />
          <Route path="examples/amazon/value-proposition" element={<AmazonValuePropositionCanvas />} />
          <Route path="examples/microsoft/business" element={<MicrosoftBusinessModelCanvas />} />
          <Route path="examples/microsoft/empathy-map" element={<MicrosoftEmpathyMapCanvas />} />
          <Route path="examples/microsoft/pestel" element={<MicrosoftPESTELCanvas />} />
          <Route path="examples/microsoft/swot" element={<MicrosoftSWOTCanvas />} />
          <Route path="examples/microsoft/value-proposition" element={<MicrosoftValuePropositionCanvas />} />
          <Route path="examples/tesla/business" element={<TeslaBusinessModelCanvas />} />
          <Route path="examples/tesla/empathy-map" element={<TeslaEmpathyMapCanvas />} />
          <Route path="examples/tesla/pestel" element={<TeslaPESTELCanvas />} />
          <Route path="examples/tesla/swot" element={<TeslaSWOTCanvas />} />
          <Route path="examples/tesla/value-proposition" element={<TeslaValuePropositionCanvas />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <div className="flex flex-col min-h-screen w-full">
          <AppContent />
        </div>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;