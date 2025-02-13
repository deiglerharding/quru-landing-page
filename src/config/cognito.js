export const cognitoConfig = {
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  signUpConfig: {
    autoConfirmUser: false,
    autoVerifyEmail: true,
    autoVerifyPhone: false
  }
};