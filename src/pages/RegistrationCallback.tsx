import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationCallback() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // El usuario se ha registrado exitosamente
        // Aquí es donde implementaremos el seguimiento de eventos
        trackRegistrationEvent();
      }
      // Redirigir al usuario a la página principal o al dashboard
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  function trackRegistrationEvent() {
    // Aquí implementaremos el código de seguimiento de X Ads
    if (window.twq) {
      window.twq('event', 'tw-xxxxxxxx-registration', {
        // Puedes añadir propiedades adicionales si es necesario
      });
    }
  }

  // Muestra un loader mientras se procesa la autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
}