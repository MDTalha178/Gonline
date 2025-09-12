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


export const getDomainInfo = () => {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  const isAdmin = hostname  ===  'admin.gonlines.com';
  const isMainDomain = (hostname === 'gonlines.com' || hostname === 'www.gonlines.com' || hostname === 'localhost') && !isAdmin;
  const isSubdomain = hostname.includes('.gonlines.com') && !isMainDomain && !isAdmin;
  const isCustomDomain = !hostname.includes('gonlines.com') && !isMainDomain && !isSubdomain && !isAdmin;

  console.log(hostname, subdomain, isMainDomain, isSubdomain, isCustomDomain, isAdmin);
  
  return {
    hostname,
    subdomain: isSubdomain ? subdomain : null,
    isMainDomain,
    isSubdomain,
    isCustomDomain,
    isAdmin,
    storeSlug: isSubdomain ? subdomain : (isCustomDomain ? hostname : null)
  };
};

export const getHeaderDomainInfo = () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const subdomain = hostname.split('.')[0];

  const isMainDomain =
    hostname === 'gonlines.com' ||
    hostname === 'www.gonlines.com' ||
    hostname === 'localhost';

  const isSubdomain = hostname.includes('.gonlines.com') && !isMainDomain;
  const isCustomDomain =
    !hostname.includes('gonlines.com') && !isMainDomain && !isSubdomain;

  let storeSlug = null;

  if (isSubdomain) {
    storeSlug = subdomain;
  } else if (isCustomDomain) {
    storeSlug = hostname;
  } else if (isMainDomain && pathname.startsWith('/store/')) {
    storeSlug = pathname.split('/')[2] || null;
  }

  return {
    hostname,
    subdomain: isSubdomain ? subdomain : null,
    isMainDomain,
    isSubdomain,
    isCustomDomain,
    storeSlug,
  };
};
