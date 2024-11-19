import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    twq?: (command: string, event: string, parameters?: object) => void;
  }
}

export default function RegistrationCallback() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('RegistrationCallback: useEffect ejecutado');
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('RegistrationCallback: Usuario autenticado, llamando a trackRegistrationEvent');
        trackRegistrationEvent();
      }
      console.log('RegistrationCallback: Redirigiendo al dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  function trackRegistrationEvent() {
    console.log('RegistrationCallback: Ejecutando trackRegistrationEvent');
    if (window.twq) {
      console.log('RegistrationCallback: Enviando evento a X Ads', {
        status: 'completed',
        conversion_id: user?.sub,
        email_address: user?.email
      });
      window.twq('event', 'tw-or5as-or5au', {
        status: 'completed',
        conversion_id: user?.sub,
        email_address: user?.email
      });
    } else {
      console.error('RegistrationCallback: window.twq no está disponible');
    }
  }

  if (isLoading) {
    console.log('RegistrationCallback: Mostrando loader');
    return <div>Loading...</div>;
  }

  console.log('RegistrationCallback: Renderizando null');
  return null;
}