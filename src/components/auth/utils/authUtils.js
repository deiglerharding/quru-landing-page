// Format phone number to E.164 standard
export const formatPhoneNumber = (rawNumber, countryCode) => {
    if (!rawNumber || !countryCode) return '';
    
    // Remove all non-digit characters
    const digitsOnly = rawNumber.replace(/\D/g, '');
    
    if (!digitsOnly) return '';
    
    // If number already starts with +, return as is
    if (rawNumber.startsWith('+')) return rawNumber;
    
    // If number starts with country code, add +
    if (digitsOnly.startsWith(countryCode)) {
      return `+${digitsOnly}`;
    }
    
    // Otherwise, add country code
    return `+${countryCode}${digitsOnly}`;
  };
  
  // Track events to Google Analytics
  export const trackEvent = (category, action, label) => {
    if (typeof window !== 'undefined' && window.ReactGA) {
      window.ReactGA.event({
        category,
        action,
        label
      });
    }
  };
  
  // Handle LinkedIn auth state after redirect
  export const handleLinkedInCallback = (url) => {
    // This will depend on how your app is set up to handle the callback
    // You'll likely need to parse URL parameters and store tokens
    
    // Example:
    const params = new URLSearchParams(url.split('?')[1]);
    const code = params.get('code');
    const state = params.get('state');
    
    // You would then exchange this code for tokens
    // and complete the authentication flow
    
    return { code, state };
  };