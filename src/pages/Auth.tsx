import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { EmailAuth } from "@/components/auth/EmailAuth";
import { OtpVerification } from "@/components/auth/OtpVerification";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleOtpRequired = (email: string) => {
    setOtpEmail(email);
    setShowOtp(true);
  };

  const handleBackFromOtp = () => {
    setShowOtp(false);
    setOtpEmail("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card drop-shadow-lg">
        <CardHeader className="text-center space-y-2">
          {!showOtp ? (
            <>
              <CardTitle className="text-2xl font-heading font-bold">
                Bienvenue sur Aura
              </CardTitle>
              <CardDescription>
                Connectez-vous ou créez votre compte pour commencer
              </CardDescription>
            </>
          ) : (
            <div className="mb-4">
              <OtpVerification email={otpEmail} onBack={handleBackFromOtp} />
            </div>
          )}
        </CardHeader>

        {!showOtp && (
          <CardContent className="space-y-6">
            <SocialAuth />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou continuez avec
                </span>
              </div>
            </div>

            <EmailAuth onOtpRequired={handleOtpRequired} />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Auth;