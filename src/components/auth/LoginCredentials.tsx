import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, User, Shield } from "lucide-react";
import { useState } from "react";

interface LoginCredentialsProps {
  onFillCredentials: (email: string, password: string) => void;
}

const LoginCredentials = ({ onFillCredentials }: LoginCredentialsProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const credentials = [
    {
      type: 'Student Account',
      email: 'nakuldesai2006@gmail.com',
      password: '123456',
      icon: <User className="h-4 w-4" />,
      description: 'Full student dashboard access'
    },
    {
      type: 'Admin Account',
      email: 'admin@edudisha.com',
      password: 'admin123',
      icon: <Shield className="h-4 w-4" />,
      description: 'Administrative privileges'
    },
    {
      type: 'Demo Student',
      email: 'student@gtu.edu',
      password: 'student123',
      icon: <User className="h-4 w-4" />,
      description: 'Alternative student account'
    }
  ];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card className="mt-6 border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Demo Login Credentials
        </CardTitle>
        <CardDescription className="text-xs">
          Click any account below to auto-fill the login form
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {credentials.map((cred, index) => (
          <div key={index} className="p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {cred.icon}
                <span className="font-medium text-sm">{cred.type}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFillCredentials(cred.email, cred.password)}
                className="h-7 px-3 text-xs"
              >
                Use Account
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{cred.description}</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Email:</span>
                <div className="flex items-center gap-1">
                  <code className="text-xs bg-muted px-1 rounded">{cred.email}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    onClick={() => copyToClipboard(cred.email, `email-${index}`)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copiedField === `email-${index}` && (
                    <span className="text-xs text-green-600">Copied!</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Password:</span>
                <div className="flex items-center gap-1">
                  <code className="text-xs bg-muted px-1 rounded">{cred.password}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    onClick={() => copyToClipboard(cred.password, `password-${index}`)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copiedField === `password-${index}` && (
                    <span className="text-xs text-green-600">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LoginCredentials;