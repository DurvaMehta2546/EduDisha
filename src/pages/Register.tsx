import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  GraduationCap,
  Chrome,
  Github,
  Shield,
  Users,
  ArrowRight,
  BookOpen,
  Building,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    semester: '',
    branch: ''
  });
  const [error, setError] = useState('');

  const { register, loginWithGoogle, loginWithGitHub } = useAuth();
  const navigate = useNavigate();

  const universities = [
    'Gujarat Technological University',
    'Ahmedabad University',
    'Nirma University',
    'PDEU',
    'Ganpat University',
    'Other'
  ];

  const semesters = [
    'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
    'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'
  ];

  const branches = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: activeTab as 'student' | 'admin',
        university: formData.university,
        semester: formData.semester,
        branch: formData.branch
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGitHub();
      navigate('/dashboard');
    } catch (err) {
      setError('GitHub registration failed');
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-gradient">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">EduDisha</h1>
          </div>
          <p className="text-muted-foreground">
            Join thousands of students on their academic journey.
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
                  Student Registration
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <div className="text-center mb-4">
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Registration
                </Badge>
              </div>
            </TabsContent>
          </Tabs>

          {/* Social Registration Buttons */}
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
              <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

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

            {activeTab === 'student' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">University</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                    <Select value={formData.university} onValueChange={(value) => setFormData({ ...formData, university: value })}>
                      <SelectTrigger className="pl-10 h-12">
                        <SelectValue placeholder="Select your university" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Semester</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                      <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((sem) => (
                            <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Branch</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                      <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
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
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;