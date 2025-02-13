import { Amplify } from 'aws-amplify';
import { cognitoConfig } from './config/cognito';
import LandingPage from './components/LandingPage';

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolWebClientId,
      region: cognitoConfig.region
    }
  }
});

console.log('Cognito Config:', {
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
});

function App() {
  return <LandingPage />
}

export default App