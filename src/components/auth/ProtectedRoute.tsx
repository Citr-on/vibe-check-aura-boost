import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Bypass temporaire - ajouter ?bypass=true dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const hasBypass = urlParams.get('bypass') === 'true';

  useEffect(() => {
    // Redirect to auth page if not authenticated and not loading (sauf si bypass)
    if (!loading && !user && !hasBypass) {
      navigate('/auth');
    }
  }, [user, loading, navigate, hasBypass]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect) sauf si bypass
  if (!user && !hasBypass) {
    return null;
  }

  // Render children if authenticated ou bypass
  return <>{children}</>;
};