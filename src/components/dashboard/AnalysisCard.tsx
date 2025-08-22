import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Clock, CheckCircle, Sparkles, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import portraitSample1 from "@/assets/portrait-sample-1.jpg";
import portraitSample2 from "@/assets/portrait-sample-2.jpg";
import bioSample1 from "@/assets/bio-sample-1.jpg";
import bioSample2 from "@/assets/bio-sample-2.jpg";

export interface Analysis {
  id: string;
  type: 'photo' | 'profil-complet';
  title: string;
  status: 'en-cours' | 'terminé';
  isPremium: boolean;
  createdAt: string;
  progress?: number;
  score?: number;
  votesReceived?: number;
  totalVotes?: number;
}

interface AnalysisCardProps {
  analysis: Analysis;
}

export const AnalysisCard = ({ analysis }: AnalysisCardProps) => {
  const isCompleted = analysis.status === 'terminé';
  
  // Obtenir le label du type d'analyse
  const getTypeLabel = () => {
    switch (analysis.type) {
      case 'photo': return 'Photo';
      case 'profil-complet': return 'Profil complet';
      default: return 'Analyse';
    }
  };
  
  // Sélectionner l'image appropriée selon le type d'analyse
  const getAnalysisImage = () => {
    if (analysis.type === 'photo') {
      return analysis.id === '1' ? portraitSample1 : portraitSample2;
    } else {
      // Pour profil-complet, on retourne null car on affichera une grille d'images
      return null;
    }
  };

  // Composant de progression circulaire
  const CircularProgress = ({ value, className }: { value: number; className?: string }) => {
    const circumference = 2 * Math.PI * 16; // rayon de 16
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className={cn("relative w-8 h-8", className)}>
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-secondary"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-primary"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium">{Math.round(value)}%</span>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="w-full hover:shadow-card transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Image d'aperçu ou grille d'images pour profil complet */}
      <div className="relative h-48 overflow-hidden">
        {analysis.type === 'profil-complet' ? (
          <div className="grid grid-cols-2 h-full gap-1">
            <img 
              src={portraitSample1} 
              alt="Portrait 1"
              className="w-full h-full object-cover"
            />
            <div className="grid grid-rows-2 gap-1">
              <img 
                src={bioSample1} 
                alt="Bio text"
                className="w-full h-full object-cover"
              />
              <img 
                src={portraitSample2} 
                alt="Portrait 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <img 
            src={getAnalysisImage()!} 
            alt={`Aperçu ${analysis.type}`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/20">
            {getTypeLabel()}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
          {isCompleted ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Clock className="w-4 h-4 text-orange-400" />
          )}
          <span className="capitalize">{analysis.status}</span>
        </div>
      </div>
      
      <CardContent className="p-4 h-32 flex flex-col justify-between">
        <div>
          {isCompleted ? (
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {analysis.score}/10
                </div>
                <div className="text-xs text-muted-foreground">Score Aura</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {analysis.votesReceived}/{analysis.totalVotes}
                </div>
                <div className="text-xs text-muted-foreground">Avis reçus</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CircularProgress value={analysis.progress || 0} />
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {analysis.votesReceived || 0}/{analysis.totalVotes || 20} avis collectés
                </div>
                <div className="text-xs text-muted-foreground">
                  Analyse en cours...
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          {isCompleted ? (
            <Link to={`/analysis/${analysis.id}`}>
              <Button className="w-full rounded-xl" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Voir le rapport
              </Button>
            </Link>
          ) : (
            <Button className="w-full rounded-xl" variant="outline" disabled>
              <Clock className="w-4 h-4 mr-2" />
              En cours d'analyse
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};