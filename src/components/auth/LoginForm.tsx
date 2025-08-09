import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Mail, Lock } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@school.edu', password: 'demo123' },
    { role: 'Teacher', email: 'teacher@school.edu', password: 'demo123' },
    { role: 'Student', email: 'student@school.edu', password: 'demo123' },
    { role: 'Parent', email: 'parent@school.edu', password: 'demo123' },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">EduConnect</h1>
              <p className="text-muted-foreground">Unified School Management</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              Welcome to the Future of Education
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive platform integrating E-Learning, CMS, and CRM for K-12 institutions.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-semibold mb-4 text-foreground">Demo Credentials</h3>
              <div className="grid grid-cols-2 gap-3">
                {demoCredentials.map((cred) => (
                  <Button
                    key={cred.role}
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials(cred.email, cred.password)}
                    className="justify-start text-xs h-auto p-2"
                  >
                    <span className="font-medium">{cred.role}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Mobile demo credentials */}
              <div className="md:hidden mt-6">
                <h3 className="font-semibold mb-3 text-center">Demo Accounts</h3>
                <div className="grid grid-cols-2 gap-2">
                  {demoCredentials.map((cred) => (
                    <Button
                      key={cred.role}
                      variant="outline"
                      size="sm"
                      onClick={() => fillDemoCredentials(cred.email, cred.password)}
                      className="text-xs h-auto p-2"
                    >
                      {cred.role}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}