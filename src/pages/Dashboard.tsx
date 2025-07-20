import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AnalysisModal } from "@/components/dashboard/AnalysisModal";
import { AnalysisCard, type Analysis } from "@/components/dashboard/AnalysisCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

// Données d'exemple
const mockAnalyses: Analysis[] = [
  {
    id: '1',
    type: 'photo',
    title: 'Photo de profil principal',
    status: 'terminé',
    isPremium: true,
    createdAt: '2024-01-15T10:30:00Z',
    score: 8.2,
    votesReceived: 50,
    totalVotes: 50
  },
  {
    id: '2',
    type: 'bio',
    title: 'Description de profil',
    status: 'en-cours',
    isPremium: false,
    createdAt: '2024-01-20T14:15:00Z',
    progress: 65,
    votesReceived: 13,
    totalVotes: 20
  },
  {
    id: '3',
    type: 'photo',
    title: 'Photo en pied',
    status: 'terminé',
    isPremium: false,
    createdAt: '2024-01-18T09:45:00Z',
    score: 6.8,
    votesReceived: 20,
    totalVotes: 20
  },
  {
    id: '4',
    type: 'profil-complet',
    title: 'Analyse complète de profil',
    status: 'en-cours',
    isPremium: true,
    createdAt: '2024-01-22T16:30:00Z',
    progress: 45,
    votesReceived: 18,
    totalVotes: 40
  }
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('tous');
  const [typeFilter, setTypeFilter] = useState('tous');
  
  // États pour les monnaies
  const [credits] = useState(150);
  const [aura] = useState(3.5);

  const filteredAnalyses = mockAnalyses.filter(analysis => {
    if (statusFilter !== 'tous' && analysis.status !== statusFilter) return false;
    if (typeFilter !== 'tous' && analysis.type !== typeFilter) return false;
    return true;
  });

  const handleAnalysisSelect = (optionId: string) => {
    console.log('Analysis selected:', optionId);
    // Ici on ajouterait la logique pour créer une nouvelle analyse
  };

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action principale et filtres */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Mes Analyses
            </h1>
            <p className="text-muted-foreground">
              Suivez vos analyses en cours et consultez vos rapports
            </p>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Lancer une nouvelle analyse
          </Button>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-6 mb-6">
          {/* Filtre Statut */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Statut</label>
            <div className="flex gap-2">
              {['tous', 'en-cours', 'terminé'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border'
                  }`}
                >
                  {status === 'tous' ? 'Tous' : status === 'en-cours' ? 'En cours' : 'Terminé'}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Type</label>
            <div className="flex gap-2">
              {['tous', 'photo', 'bio', 'profil-complet'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border'
                  }`}
                >
                  {type === 'tous' ? 'Tous' : type === 'photo' ? 'Photo' : type === 'bio' ? 'Bio' : 'Profil complet'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille d'analyses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>

        {filteredAnalyses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              Aucune analyse trouvée avec ces filtres
            </div>
            <Button variant="outline" onClick={() => {
              setStatusFilter('tous');
              setTypeFilter('tous');
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </main>

      <AnalysisModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        credits={credits}
        aura={aura}
        onAnalysisSelect={handleAnalysisSelect}
      />
    </div>
  );
};

export default Dashboard;