import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Mail, 
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Send
} from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
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
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {isEmailSent ? 'Check your email' : 'Forgot your password?'}
          </h2>
          <p className="text-muted-foreground">
            {isEmailSent 
              ? 'We\'ve sent a password reset link to your email address.'
              : 'No worries! Enter your email and we\'ll send you a reset link.'
            }
          </p>
        </div>

        <Card className="p-6 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          {isEmailSent ? (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-foreground font-medium">Email sent successfully!</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    try again
                  </button>
                </p>
              </div>

              <Button asChild className="w-full">
                <Link to="/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
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
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Reset Link
                  </div>
                )}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;