import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Gem, Clock, Users, Zap } from "lucide-react";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const canAfford = (option: AnalysisOption) => {
    if (option.cost.type === 'aura') {
      return aura >= option.cost.amount;
    }
    return credits >= option.cost.amount;
  };

  const handleSelect = (optionId: string) => {
    onAnalysisSelect(optionId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            Choisissez votre type d'analyse
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-6 overflow-y-auto flex-1 pr-2">
          {analysisOptions.map((option) => {
            const affordable = canAfford(option);
            
            return (
              <div
                key={option.id}
                className={`relative p-6 border rounded-2xl transition-all cursor-pointer ${
                  selectedOption === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                } ${!affordable ? 'opacity-60' : ''}`}
                onClick={() => affordable && setSelectedOption(option.id)}
              >
                {option.isPremium && (
                  <div className="absolute -top-2 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    {option.cost.type === 'aura' ? (
                      <>
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span>{option.cost.amount} Aura</span>
                      </>
                    ) : (
                      <>
                        <Gem className="w-4 h-4 text-primary" />
                        <span>{option.cost.amount} Crédits</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
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

                <Button
                  onClick={() => handleSelect(option.id)}
                  disabled={!affordable}
                  variant={option.isPremium ? "default" : "secondary"}
                  className="w-full"
                >
                  {affordable ? 'Choisir cette analyse' : 'Fonds insuffisants'}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};