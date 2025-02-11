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

function App() {
  return <LandingPage />
}

export default App