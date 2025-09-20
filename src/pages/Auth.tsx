import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false
  });
  const validatePassword = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'password') {
      validatePassword(value);
    }
  };
  const isPasswordStrong = passwordStrength.length && passwordStrength.number && passwordStrength.special;
  return <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 bg-[#438cae]">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">AuraMind</h1>
              <p className="text-sm opacity-90">Student Support</p>
            </div>
          </Link>
        </div>

        <Card className="backdrop-blur bg-white/95 dark:bg-gray-900/95 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Your mental health journey starts here
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signin-email" type="email" placeholder="your.email@university.edu" className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signin-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="pl-10 pr-10" />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button variant="link" className="text-sm p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>
                
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account? Switch to Sign Up tab
                  </p>
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="text-xs">
                      🔒 All data is encrypted and confidential
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-name" type="text" placeholder="Your full name" className="pl-10" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="your.email@university.edu" className="pl-10" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" className="pl-10 pr-10" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {formData.password && <div className="space-y-2 mt-3">
                      <p className="text-sm font-medium">Password requirements:</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${passwordStrength.length ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={passwordStrength.length ? 'text-green-500' : 'text-muted-foreground'}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${passwordStrength.number ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={passwordStrength.number ? 'text-green-500' : 'text-muted-foreground'}>
                            At least one number
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${passwordStrength.special ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={passwordStrength.special ? 'text-green-500' : 'text-muted-foreground'}>
                            At least one special character
                          </span>
                        </div>
                      </div>
                    </div>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className="pl-10 pr-10" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && <p className="text-sm text-destructive">Passwords do not match</p>}
                </div>
                
                <Button className="w-full" size="lg" disabled={!isPasswordStrong || formData.password !== formData.confirmPassword || !formData.email || !formData.name}>
                  Create Account
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our privacy policy and terms of service.
                    All your data is encrypted and confidential.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Link to="/">
            <Button variant="link" className="text-white/80 hover:text-white">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>;
}