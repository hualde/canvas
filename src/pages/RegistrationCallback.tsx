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
      console.log('RegistrationCallback: Enviando evento a X Ads');
      window.twq('event', 'tw-or5as-or5au', {
        status: 'completed', // Asumimos que el registro se ha completado en este punto
        conversion_id: user?.sub, // Usamos el ID único del usuario de Auth0
        email_address: user?.email // Usamos el email del usuario de Auth0
      });
    } else {
      console.log('RegistrationCallback: window.twq no está disponible');
    }
  }

  if (isLoading) {
    console.log('RegistrationCallback: Mostrando loader');
    return <div>Loading...</div>;
  }

  console.log('RegistrationCallback: Renderizando null');
  return null;
}