import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onBack: () => void;
}

export const OtpVerification = ({ email, onBack }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  const { verifyOtp, resendConfirmation } = useAuth();
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Code invalide",
        description: "Veuillez saisir un code à 6 chiffres",
      });
      return;
    }

    setLoading(true);
    const { error } = await verifyOtp(email, otp);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur de vérification",
        description: error.message,
      });
    } else {
      toast({
        title: "Compte confirmé",
        description: "Votre compte a été créé avec succès !",
      });
    }
    
    setLoading(false);
  };

  const handleResend = async () => {
    setResendLoading(true);
    const { error } = await resendConfirmation(email);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } else {
      toast({
        title: "Code renvoyé",
        description: "Un nouveau code a été envoyé à votre email",
      });
    }
    
    setResendLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold">Vérifiez votre email</h2>
        <p className="text-muted-foreground">
          Nous avons envoyé un code de confirmation à<br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <InputOTP value={otp} onChange={setOtp} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button onClick={handleVerify} className="w-full" disabled={loading || otp.length !== 6}>
          {loading ? 'Vérification...' : 'Vérifier'}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Vous n'avez pas reçu le code ?
          </p>
          <Button
            variant="ghost"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-primary hover:text-primary/90"
          >
            {resendLoading ? 'Envoi...' : 'Renvoyer le code'}
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={onBack}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>
    </div>
  );
};