import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gem, Clock, Users, Zap, ChevronLeft, ChevronRight, User, UserCheck, X } from "lucide-react";
import { HugeiconsIcon } from '@hugeicons/react';
import { Image01Icon } from '@hugeicons/core-free-icons';
import { ScrollArea } from "@/components/ui/scroll-area";

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
    features: ['20 avis ciblés', 'Traitement prioritaire'],
    isPremium: true
  },
  {
    id: 'precise',
    title: 'Test Précis',
    description: 'Analyse sur une audience large, vitesse rapide',
    cost: { type: 'credits', amount: 50 },
    features: ['50 avis ciblés', 'Traitement prioritaire'],
    isPremium: true
  },
  {
    id: 'ultra-precise',
    title: 'Test Ultra Précis',
    description: 'Analyse sur une audience très large, vitesse rapide',
    cost: { type: 'credits', amount: 80 },
    features: ['80 avis ciblés', 'Traitement prioritaire'],
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
  const [currentStep, setCurrentStep] = useState<'upload' | 'targeting' | 'profile' | 'selection'>('upload');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<'photo' | 'profile'>('photo');
  const [selectedImages, setSelectedImages] = useState<(File | string)[]>([]);
  const [targetGender, setTargetGender] = useState<'men' | 'women' | 'both'>('both');
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  
  // Profile step states
  const [currentBio, setCurrentBio] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState("authentique");
  const [selectedLength, setSelectedLength] = useState("courte");

  const tones = [
    { id: "amusant", label: "Amusant" },
    { id: "authentique", label: "Authentique" },
    { id: "intriguant", label: "Intriguant" },
    { id: "direct", label: "Direct" },
  ];

  const lengths = [
    { id: "courte", label: "Courte & Percutante" },
    { id: "moyenne", label: "Moyenne & Détaillée" },
  ];

  const canAfford = (option: AnalysisOption) => {
    if (option.cost.type === 'aura') {
      return aura >= option.cost.amount;
    }
    return credits >= option.cost.amount;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    // Selection is now the final step, so we submit directly
    handleFinalSubmit();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (analysisType === 'photo') {
        setSelectedImages([file]);
      } else {
        if (selectedImages.length < 6) {
          setSelectedImages([...selectedImages, file]);
        }
      }
    }
  };

  const handleImageSelect = (imagePath: string) => {
    if (analysisType === 'photo') {
      setSelectedImages([imagePath]);
    } else {
      const isSelected = selectedImages.includes(imagePath);
      if (isSelected) {
        setSelectedImages(selectedImages.filter(img => img !== imagePath));
      } else if (selectedImages.length < 6) {
        setSelectedImages([...selectedImages, imagePath]);
      }
    }
  };

  const handleKeywordAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      if (keywords.length < 8 && !keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
        setKeywordInput("");
      }
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = () => {
    if (selectedOption) {
      onAnalysisSelect(selectedOption);
      onOpenChange(false);
    }
  };

  const getNextStep = () => {
    if (currentStep === 'upload') {
      return analysisType === 'profile' ? 'profile' : 'targeting';
    }
    if (currentStep === 'profile') {
      return 'targeting';
    }
    return 'selection';
  };

  const freeOptions = analysisOptions.filter(option => !option.isPremium);
  const premiumOptions = analysisOptions.filter(option => option.isPremium);

  const renderUploadStep = () => (
    <div className="flex flex-col h-full space-y-3">
      <div className="text-center">
        <Tabs value={analysisType} onValueChange={(value) => setAnalysisType(value as 'photo' | 'profile')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="photo" className="rounded-full">Photo</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full">Profil complet</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <h3 className="text-lg font-heading font-semibold mb-2">
          {analysisType === 'photo' 
            ? 'Sélectionnez une image à analyser' 
            : 'Sélectionnez jusqu\'à 6 images'
          }
        </h3>
        <p className="text-muted-foreground">
          {analysisType === 'photo'
            ? 'Uploadez une nouvelle image ou sélectionnez une image existante'
            : 'Uploadez de nouvelles images ou sélectionnez des images existantes'
          }
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-4 gap-4 h-full">
        {/* Option d'upload */}
        <div className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer">
          <HugeiconsIcon icon={Image01Icon} size={32} className="mb-2 text-muted-foreground" />
          <label className="cursor-pointer text-center">
            <span className="text-xs font-medium">Nouvelle image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Images existantes - exemples */}
        {[
          "/src/assets/portrait-sample-1.jpg",
          "/src/assets/portrait-sample-2.jpg",
          "/src/assets/bio-sample-1.jpg",
          "/src/assets/bio-sample-2.jpg"
        ].map((imagePath, index) => {
          const isSelected = selectedImages.includes(imagePath);
          const selectedIndex = selectedImages.indexOf(imagePath);
          
          return (
            <div
              key={index}
              className={`aspect-square border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-primary/50 relative ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
              onClick={() => handleImageSelect(imagePath)}
            >
              <img
                src={imagePath}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {isSelected && analysisType === 'profile' && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" aria-label={`Photo ${selectedIndex + 1}`}>
                  {selectedIndex + 1}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </ScrollArea>

      {analysisType === 'profile' && (
        <p className="text-xs text-muted-foreground text-center">
          {selectedImages.length}/6 images sélectionnées
        </p>
      )}
    </div>
  );

  const renderSelectionStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Choisissez votre type d'analyse
        </h3>
      </div>

      {/* Section Gratuit - Only show for photo analysis */}
      {analysisType === 'photo' && (
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
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-heading font-semibold text-sm">
                  {option.title}
                </h3>
                
                <div className="flex flex-wrap gap-1">
                  {option.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 text-xs bg-muted rounded-full px-2 py-1"
                    >
                      {feature.includes('prioritaire') && <Zap className="w-3 h-3" />}
                      {feature.includes('avis') && <Users className="w-3 h-3" />}
                      {feature.includes('standard') && <Clock className="w-3 h-3" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>{option.cost.amount} Aura</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                {option.description}
              </p>
            </div>
          );
        })}
        </div>
      )}

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
              className={`p-3 border rounded-xl transition-all cursor-pointer group ${
                selectedOption === option.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-border hover:border-primary hover:bg-primary hover:text-white'
              } ${!affordable ? 'opacity-60' : ''}`}
              onClick={() => affordable && handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-heading font-semibold text-sm">
                  {option.title}
                </h3>
                
                <div className="flex flex-wrap gap-1">
                  {option.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 text-xs bg-muted rounded-full px-2 py-1 group-hover:bg-white group-hover:text-black transition-colors"
                      >
                        {feature.includes('prioritaire') && <Zap className="w-3 h-3 group-hover:text-black transition-colors" />}
                        {feature.includes('avis') && <Users className="w-3 h-3 group-hover:text-black transition-colors" />}
                        {feature.includes('standard') && <Clock className="w-3 h-3 group-hover:text-black transition-colors" />}
                        <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium group-hover:text-white transition-colors">
                  <Gem className="w-4 h-4 group-hover:text-white transition-colors" />
                  <span>{option.cost.amount} Crédits</span>
                </div>
              </div>
              
              <p className="text-sm group-hover:text-white/80 transition-colors mt-2">
                {option.description}
              </p>
            </div>
          );
        })}
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
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Complétez votre profil
        </h3>
        <p className="text-muted-foreground">
          Renseignez votre biographie et vos centres d'intérêt
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Bio */}
        <div>
          <label className="text-sm font-medium mb-3 block">Bio actuelle (optionnel)</label>
          <Textarea
            value={currentBio}
            onChange={(e) => setCurrentBio(e.target.value)}
            placeholder="Votre bio existante pour inspiration..."
            className="min-h-24"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            Vos passions et votre personnalité
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Ajoutez jusqu'à 8 mots-clés. Appuyez sur 'Entrée' pour valider chaque mot.
          </p>
          <Input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeywordAdd}
            placeholder="Ex: voyages, cuisine, photographie..."
            disabled={keywords.length >= 8}
          />
          
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {keyword}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            {keywords.length}/8 mots-clés
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">
              {currentStep === 'upload' && (analysisType === 'photo' ? "Je veux faire évaluer une photo" : "Je veux faire évaluer un profil complet")}
              {currentStep === 'profile' && "Je veux faire évaluer un profil complet"}
              {currentStep === 'targeting' && "Je veux être évalué par..."}
              {currentStep === 'selection' && "Je veux faire évaluer mon contenu"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {currentStep === 'upload' && renderUploadStep()}
          {currentStep === 'profile' && renderProfileStep()}
          {currentStep === 'targeting' && renderTargetingStep()}
          {currentStep === 'selection' && renderSelectionStep()}
        </div>

        <div className="p-6 pt-4">
          <div className="flex justify-between">
            {currentStep === 'upload' && (
              <>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button 
                  onClick={() => setCurrentStep(getNextStep())}
                  disabled={selectedImages.length === 0}
                >
                  Continuer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
            {currentStep === 'profile' && (
              <>
                <Button variant="outline" onClick={() => setCurrentStep('upload')}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button onClick={() => setCurrentStep('targeting')}>
                  Continuer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
            {currentStep === 'targeting' && (
              <>
                <Button variant="outline" onClick={() => setCurrentStep(analysisType === 'profile' ? 'profile' : 'upload')}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button onClick={() => setCurrentStep('selection')}>
                  Continuer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
            {currentStep === 'selection' && (
              <>
                <Button variant="outline" onClick={() => setCurrentStep('targeting')}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button onClick={handleFinalSubmit} disabled={!selectedOption}>
                  Lancer l'analyse
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};