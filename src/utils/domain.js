const getSubdomain = () => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  console.log(hostname)
  
  // For localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return null;
  }
  
  // For production: extract subdomain from *.gonlines.com
  if (parts.length >= 3) {
    const subdomain = parts[0];
    // Exclude 'www' as it's not a merchant subdomain
    if (subdomain !== 'www') {
      return subdomain;
    }
  }
  
  return null;
};

export default getSubdomain;