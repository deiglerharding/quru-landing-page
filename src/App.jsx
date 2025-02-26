import { Amplify } from 'aws-amplify';
import ReactGA from 'react-ga4';
import { cognitoConfig } from './config/cognito';
import LandingPage from './components/LandingPage';

// Initialize GA4 with your Measurement ID
ReactGA.initialize('G-ZL0C4EZMCK');
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