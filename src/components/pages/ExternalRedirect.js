import { useEffect } from 'react';

const ExternalRedirect = ({ to }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
    return <div>Redirecting...</div>;
};

export default ExternalRedirect;