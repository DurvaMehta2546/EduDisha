import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface OnboardingCheckProps {
  children: React.ReactNode;
}

const OnboardingCheck = ({ children }: OnboardingCheckProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    console.log('OnboardingCheck - Current state:', {
      isAuthenticated,
      pathname: location.pathname,
      user: user?.name
    });

    // Skip onboarding check for certain routes
    const skipRoutes = ['/login', '/register', '/forgot-password', '/', '/features', '/about', '/contact', '/privacy', '/terms', '/faq'];
    if (skipRoutes.includes(location.pathname)) {
      console.log('OnboardingCheck - Skipping check for route:', location.pathname);
      return;
    }

    // If user is on smart-onboarding page but we're now using modal approach, redirect to dashboard
    if (isAuthenticated && location.pathname === '/smart-onboarding') {
      console.log('OnboardingCheck - Redirecting to dashboard - using modal approach now');
      navigate('/dashboard');
      return;
    }
    
  }, [user, isAuthenticated, isLoading, location.pathname, navigate]);

  // Show loading spinner while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up your experience...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default OnboardingCheck;