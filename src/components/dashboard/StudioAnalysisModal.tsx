import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    title: 'Review Standard',
    description: 'Analyse standard par la communauté',
    cost: { type: 'aura', amount: 0 }, // Gratuit depuis le Studio IA
    features: ['20 avis de la communauté', 'Vitesse standard', 'GRATUIT avec Studio IA'],
    isPremium: false
  },
  {
    id: 'standard',
    title: 'Review Premium',
    description: 'Analyse détaillée par nos meilleurs reviewers',
    cost: { type: 'aura', amount: 5 },
    features: ['Feedback prioritaire et détaillé', 'Meilleurs reviewers', 'Analyse IA avancée'],
    isPremium: true
  }
];

interface StudioAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credits: number;
  aura: number;
  aiGenerationCost: number;
  onAnalysisSelect: (optionId: string) => void;
}

export const StudioAnalysisModal = ({ 
  open, 
  onOpenChange, 
  credits, 
  aura, 
  aiGenerationCost,
  onAnalysisSelect 
}: StudioAnalysisModalProps) => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'targeting' | 'demographics'>('selection');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [targetGender, setTargetGender] = useState<'men' | 'women' | 'both'>('both');
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [ethnicity, setEthnicity] = useState<string>('all');
  const [religion, setReligion] = useState<string>('all');
  const [heightRange, setHeightRange] = useState<[number, number]>([150, 190]);

  const canAfford = (option: AnalysisOption) => {
    if (option.cost.type === 'aura') {
      return aura >= option.cost.amount;
    }
    return credits >= option.cost.amount;
  };

  const getAdjustedCost = (option: AnalysisOption) => {
    if (option.isPremium && option.cost.type === 'aura') {
      const adjustedCost = Math.max(0, option.cost.amount - aiGenerationCost);
      return { ...option.cost, amount: adjustedCost };
    }
    return option.cost;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = analysisOptions.find(o => o.id === optionId);
    if (option?.isPremium) {
      setCurrentStep('demographics');
    } else {
      setCurrentStep('targeting');
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

  const renderSelectionStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Choisissez votre type d'évaluation
        </h3>
        <p className="text-sm text-muted-foreground">
          Profitez des tarifs Studio IA pour vos évaluations
        </p>
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
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-semibold">GRATUIT</span>
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
                    {feature.includes('GRATUIT') && <Sparkles className="w-3 h-3 text-green-500" />}
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
          const adjustedCost = getAdjustedCost(option);
          const originalCost = option.cost.amount;
          const savings = originalCost - adjustedCost.amount;
          
          return (
            <div
              key={option.id}
              className={`p-3 border rounded-xl transition-all cursor-pointer group ${
                selectedOption === option.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-border hover:border-primary hover:bg-primary hover:text-white'
              } ${!affordable ? 'opacity-60' : ''}`}
              onClick={() => affordable && handleOptionSelect(option.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm group-hover:text-white/80 transition-colors">
                    {option.description}
                  </p>
                </div>
                
                <div className="text-sm space-y-1">
                  {savings > 0 ? (
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="line-through text-xs opacity-70">
                          {originalCost} Aura
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 font-medium group-hover:text-white">
                        <span className="text-xs">Votre bonus Studio IA : -{savings} Aura</span>
                      </div>
                      <div className="flex items-center space-x-2 font-bold text-primary group-hover:text-white">
                        <Sparkles className="w-4 h-4" />
                        <span>{adjustedCost.amount} Aura</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm font-medium group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4 group-hover:text-white transition-colors" />
                      <span>{adjustedCost.amount} Aura</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {option.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 text-xs bg-muted rounded-full px-3 py-1 group-hover:bg-white group-hover:text-black transition-colors"
                    >
                      {feature.includes('prioritaire') && <Zap className="w-3 h-3 group-hover:text-black transition-colors" />}
                      {feature.includes('avis') && <Users className="w-3 h-3 group-hover:text-black transition-colors" />}
                      {feature.includes('standard') && <Clock className="w-3 h-3 group-hover:text-black transition-colors" />}
                      <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
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
          Choisissez le profil des personnes qui évalueront votre photo
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
          Lancer l'évaluation
        </Button>
      </div>
    </div>
  );

  const renderDemographicsStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Configuration démographique premium
        </h3>
        <p className="text-muted-foreground">
          Affinez votre analyse avec des critères démographiques spécifiques
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-3 block">Genre</label>
          <div className="flex gap-3">
            <button
              onClick={() => setTargetGender('men')}
              className={`flex-1 p-2 border rounded-lg transition-colors ${
                targetGender === 'men'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <User className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs font-medium">Hommes</span>
            </button>
            <button
              onClick={() => setTargetGender('women')}
              className={`flex-1 p-2 border rounded-lg transition-colors ${
                targetGender === 'women'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <UserCheck className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs font-medium">Femmes</span>
            </button>
            <button
              onClick={() => setTargetGender('both')}
              className={`flex-1 p-2 border rounded-lg transition-colors ${
                targetGender === 'both'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Users className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs font-medium">Les deux</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Origine ethnique</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Toutes' },
              { value: 'caucasian', label: 'Caucasien' },
              { value: 'asian', label: 'Asiatique' },
              { value: 'african', label: 'Africain' },
              { value: 'hispanic', label: 'Hispanique' },
              { value: 'middle-eastern', label: 'Moyen-oriental' },
              { value: 'mixed', label: 'Métissé' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setEthnicity(option.value)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  ethnicity === option.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Religion</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Toutes' },
              { value: 'catholic', label: 'Catholique' },
              { value: 'protestant', label: 'Protestant' },
              { value: 'muslim', label: 'Musulman' },
              { value: 'jewish', label: 'Juif' },
              { value: 'hindu', label: 'Hindou' },
              { value: 'buddhist', label: 'Bouddhiste' },
              { value: 'agnostic', label: 'Agnostique' },
              { value: 'atheist', label: 'Athée' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setReligion(option.value)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  religion === option.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">
            Taille: {heightRange[0]}cm - {heightRange[1]}cm
          </label>
          <Slider
            value={heightRange}
            onValueChange={(value) => setHeightRange(value as [number, number])}
            min={150}
            max={200}
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
          Lancer l'évaluation premium
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Évaluation de votre photo</span>
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'selection' && renderSelectionStep()}
        {currentStep === 'targeting' && renderTargetingStep()}
        {currentStep === 'demographics' && renderDemographicsStep()}
      </DialogContent>
    </Dialog>
  );
};