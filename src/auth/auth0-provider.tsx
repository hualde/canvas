import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { SUBSCRIPTION_TIERS } from '../constants/subscriptionTiers';

export function Auth0ProviderWithNavigate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const domain = process.env.AUTH0_DOMAIN || 'dev-ija5oo440jauecgb.us.auth0.com';
  const clientId = process.env.AUTH0_CLIENT_ID || 'QRC2hhMda2sfEz9igJhuvIZutrHrP5tO';

  const onRedirectCallback = (appState: any) => {
    navigate('/registration-callback');  // Redirige a nuestra nueva página
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/registration-callback`,  // Actualiza la URI de redirección
      }}
      onRedirectCallback={onRedirectCallback}
      // Añadir esta línea para incluir los metadatos del usuario en el token
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}