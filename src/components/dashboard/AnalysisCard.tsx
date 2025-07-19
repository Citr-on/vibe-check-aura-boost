import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Clock, CheckCircle, Sparkles, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import portraitSample1 from "@/assets/portrait-sample-1.jpg";
import portraitSample2 from "@/assets/portrait-sample-2.jpg";
import bioSample1 from "@/assets/bio-sample-1.jpg";
import bioSample2 from "@/assets/bio-sample-2.jpg";

export interface Analysis {
  id: string;
  type: 'photo' | 'bio';
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
  
  // Sélectionner l'image appropriée selon le type d'analyse
  const getAnalysisImage = () => {
    if (analysis.type === 'photo') {
      return analysis.id === '1' ? portraitSample1 : portraitSample2;
    } else {
      return analysis.id === '2' ? bioSample1 : bioSample2;
    }
  };
  
  return (
    <Card className="hover:shadow-card transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Image d'aperçu */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getAnalysisImage()} 
          alt={`Aperçu ${analysis.type}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <Badge 
            variant={analysis.isPremium ? "default" : "secondary"}
            className="rounded-full bg-white/90 text-foreground"
          >
            {analysis.isPremium ? (
              <>
                <Gem className="w-3 h-3 mr-1" />
                Premium
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 mr-1" />
                Standard
              </>
            )}
          </Badge>
          <Badge variant="outline" className="capitalize rounded-full bg-white/90 text-foreground border-white/20">
            {analysis.type}
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
      
      <CardHeader className="pb-3">
        <h3 className="font-heading font-semibold text-lg">{analysis.title}</h3>
        <p className="text-sm text-muted-foreground">
          Créé le {new Date(analysis.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        {isCompleted ? (
          <div className="space-y-4">
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
            
            <Link to={`/analysis/${analysis.id}`}>
              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Voir le rapport
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Progression</span>
              <span>{analysis.votesReceived || 0}/{analysis.totalVotes || 20} avis</span>
            </div>
            <Progress 
              value={analysis.progress || 0} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              Estimation: {Math.ceil((100 - (analysis.progress || 0)) / 10)} minutes restantes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};