import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Gem, Clock, Users, Zap, Upload, ChevronLeft, ChevronRight, User, UserCheck } from "lucide-react";

interface AnalysisOption {
  id: string;
  title: string;
  description: string;
  cost: {
    type: 'aura' | 'credits';
    amount: number;
  };
  features: string[];
  isPremium: boolean;
}

const analysisOptions: AnalysisOption[] = [
  {
    id: 'aura-test',
    title: 'Aura test (gratuit)',
    description: 'Analyse standard, vitesse standard',
    cost: { type: 'aura', amount: 2 },
    features: ['20 avis de la communauté', 'Vitesse standard'],
    isPremium: false
  },
  {
    id: 'standard',
    title: 'Test Standard',
    description: 'Analyse Standard, vitesse rapide',
    cost: { type: 'credits', amount: 20 },
    features: ['20 avis ciblés', 'Analyse IA détaillée', 'Traitement prioritaire'],
    isPremium: true
  },
  {
    id: 'precise',
    title: 'Test Précis',
    description: 'Analyse sur une audience large, vitesse rapide',
    cost: { type: 'credits', amount: 50 },
    features: ['50 avis ciblés', 'Analyse IA détaillée', 'Traitement prioritaire'],
    isPremium: true
  },
  {
    id: 'ultra-precise',
    title: 'Test Ultra Précis',
    description: 'Analyse sur une audience très large, vitesse rapide',
    cost: { type: 'credits', amount: 80 },
    features: ['80 avis ciblés', 'Analyse IA détaillée', 'Traitement prioritaire'],
    isPremium: true
  }
];

interface AnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credits: number;
  aura: number;
  onAnalysisSelect: (optionId: string) => void;
}

export const AnalysisModal = ({ 
  open, 
  onOpenChange, 
  credits, 
  aura, 
  onAnalysisSelect 
}: AnalysisModalProps) => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'selection' | 'targeting'>('upload');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
  const [targetGender, setTargetGender] = useState<'men' | 'women' | 'both'>('both');
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);

  const canAfford = (option: AnalysisOption) => {
    if (option.cost.type === 'aura') {
      return aura >= option.cost.amount;
    }
    return credits >= option.cost.amount;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = analysisOptions.find(o => o.id === optionId);
    if (option?.isPremium) {
      // Premium options go directly to final step
      onAnalysisSelect(optionId);
      onOpenChange(false);
    } else {
      // Free options go to targeting step
      setCurrentStep('targeting');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleFinalSubmit = () => {
    if (selectedOption) {
      onAnalysisSelect(selectedOption);
      onOpenChange(false);
    }
  };

  const freeOptions = analysisOptions.filter(option => !option.isPremium);
  const premiumOptions = analysisOptions.filter(option => option.isPremium);

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Sélectionnez une image à analyser
        </h3>
        <p className="text-muted-foreground">
          Uploadez une nouvelle image ou sélectionnez une image existante
        </p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <label className="cursor-pointer">
            <span className="text-sm font-medium">Cliquez pour uploader une image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">ou</span>
        </div>

        <div className="text-center">
          <Button variant="outline" className="w-full">
            Sélectionner une image existante
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Annuler
        </Button>
        <Button 
          onClick={() => setCurrentStep('selection')}
          disabled={!selectedImage}
        >
          Continuer
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderSelectionStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Choisissez votre type d'analyse
        </h3>
      </div>

      {/* Section Gratuit */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Gratuit
        </h4>
        {freeOptions.map((option) => {
          const affordable = canAfford(option);
          
          return (
            <div
              key={option.id}
              className={`p-4 border rounded-xl transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                selectedOption === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              } ${!affordable ? 'opacity-60' : ''}`}
              onClick={() => affordable && handleOptionSelect(option.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>{option.cost.amount} Aura</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {option.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 text-xs bg-muted rounded-full px-3 py-1"
                  >
                    {feature.includes('prioritaire') && <Zap className="w-3 h-3" />}
                    {feature.includes('avis') && <Users className="w-3 h-3" />}
                    {feature.includes('standard') && <Clock className="w-3 h-3" />}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Premium */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Premium
        </h4>
        {premiumOptions.map((option) => {
          const affordable = canAfford(option);
          
          return (
            <div
              key={option.id}
              className={`p-4 border rounded-xl transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                selectedOption === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              } ${!affordable ? 'opacity-60' : ''}`}
              onClick={() => affordable && handleOptionSelect(option.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <Gem className="w-4 h-4 text-primary" />
                  <span>{option.cost.amount} Crédits</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {option.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 text-xs bg-muted rounded-full px-3 py-1"
                  >
                    {feature.includes('prioritaire') && <Zap className="w-3 h-3" />}
                    {feature.includes('avis') && <Users className="w-3 h-3" />}
                    {feature.includes('standard') && <Clock className="w-3 h-3" />}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep('upload')}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Annuler
        </Button>
      </div>
    </div>
  );

  const renderTargetingStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Définissez votre audience cible
        </h3>
        <p className="text-muted-foreground">
          Choisissez le profil des personnes qui évalueront votre contenu
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-3 block">Genre</label>
          <div className="flex gap-3">
            <button
              onClick={() => setTargetGender('men')}
              className={`flex-1 p-3 border rounded-lg transition-colors ${
                targetGender === 'men'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <User className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Hommes</span>
            </button>
            <button
              onClick={() => setTargetGender('women')}
              className={`flex-1 p-3 border rounded-lg transition-colors ${
                targetGender === 'women'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <UserCheck className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Femmes</span>
            </button>
            <button
              onClick={() => setTargetGender('both')}
              className={`flex-1 p-3 border rounded-lg transition-colors ${
                targetGender === 'both'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Users className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Les deux</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">
            Tranche d'âge: {ageRange[0]} - {ageRange[1]} ans
          </label>
          <Slider
            value={ageRange}
            onValueChange={(value) => setAgeRange(value as [number, number])}
            min={18}
            max={65}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep('selection')}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button onClick={handleFinalSubmit}>
          Lancer l'analyse
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            {currentStep === 'upload' && "Sélection d'image"}
            {currentStep === 'selection' && "Type d'analyse"}
            {currentStep === 'targeting' && "Audience cible"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {currentStep === 'upload' && renderUploadStep()}
          {currentStep === 'selection' && renderSelectionStep()}
          {currentStep === 'targeting' && renderTargetingStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};