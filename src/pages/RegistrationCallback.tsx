import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationCallback() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('RegistrationCallback: useEffect ejecutado');
    if (!isLoading) {
      if (isAuthenticated) {
        // El usuario se ha registrado exitosamente
        // Aquí es donde implementaremos el seguimiento de eventos
        console.log('RegistrationCallback: Usuario autenticado, llamando a trackRegistrationEvent');
        trackRegistrationEvent();
      }
      // Redirigir al usuario a la página principal o al dashboard
      console.log('RegistrationCallback: Redirigiendo al dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  function trackRegistrationEvent() {
    console.log('RegistrationCallback: Ejecutando trackRegistrationEvent');
    // Aquí implementaremos el código de seguimiento de X Ads
    if (window.twq) {
      console.log('RegistrationCallback: Enviando evento a X Ads');
      window.twq('event', 'tw-xxxxxxxx-registration', {
        // Puedes añadir propiedades adicionales si es necesario
      });
    } else {
      console.log('RegistrationCallback: window.twq no está disponible');
    }
  }

  // Muestra un loader mientras se procesa la autenticación
  if (isLoading) {
    console.log('RegistrationCallback: Mostrando loader');
    return <div>Loading...</div>;
  }

  console.log('RegistrationCallback: Renderizando null');
  return null;
}