import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  GraduationCap,
  Chrome,
  Github,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { login, loginWithGoogle, loginWithGitHub } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      // Let OnboardingCheck handle the redirection based on onboarding status
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      // Let OnboardingCheck handle the redirection based on onboarding status
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGitHub();
      // Let OnboardingCheck handle the redirection based on onboarding status
      navigate('/dashboard');
    } catch (err) {
      setError('GitHub login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/30">
              <img 
                src="/logo.svg" 
                alt="EduDisha Logo" 
                className="h-8 w-8" 
              />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">EduDisha</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Sign in to continue your academic journey.
          </p>
        </div>

        <Card className="p-6 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4">
              <div className="text-center mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Student Portal
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <div className="text-center mb-4">
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Dashboard
                </Badge>
              </div>
            </TabsContent>
          </Tabs>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start gap-3 hover:bg-primary/5 hover:border-primary/30"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5 text-[#4285F4]" />
              <span className="flex-1">Continue with Google</span>
              <ArrowRight className="h-4 w-4 opacity-50" />
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start gap-3 hover:bg-secondary/5 hover:border-secondary/30"
              onClick={handleGitHubLogin}
              disabled={isLoading}
            >
              <Github className="h-5 w-5" />
              <span className="flex-1">Continue with GitHub</span>
              <ArrowRight className="h-4 w-4 opacity-50" />
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={activeTab === 'student' ? 'student@gtu.edu.in' : 'admin@edudisha.com'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary-gradient hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 p-4 bg-muted/50 border-dashed">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Demo Credentials</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-card border">
              <div className="text-xs">
                <p className="font-medium">Student Account</p>
                <p className="text-muted-foreground">nakuldesai2006@gmail.com / 123456</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setFormData({ email: 'nakuldesai2006@gmail.com', password: '123456' })}
                className="text-xs h-7"
              >
                Use
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-card border">
              <div className="text-xs">
                <p className="font-medium">Admin Account</p>
                <p className="text-muted-foreground">admin@edudisha.com / admin123</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setFormData({ email: 'admin@edudisha.com', password: 'admin123' })}
                className="text-xs h-7"
              >
                Use
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;