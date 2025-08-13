import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AnalysisModal } from "@/components/dashboard/AnalysisModal";
import { AnalysisCard, type Analysis } from "@/components/dashboard/AnalysisCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Filter, ChevronUp, ChevronDown } from "lucide-react";

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

type SortBy = 'createdAt' | 'score' | 'type' | null;
type SortOrder = 'asc' | 'desc';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('tous');
  const [typeFilter, setTypeFilter] = useState('tous');
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // États pour les monnaies
  const [credits] = useState(150);
  const [aura] = useState(3.5);

  const handleSort = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      // Toggle order if same sort criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort criteria, default to desc
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortLabel = (type: SortBy) => {
    switch (type) {
      case 'createdAt': return 'Date de création';
      case 'score': return 'Score Aura';
      case 'type': return 'Type d\'analyse';
      default: return '';
    }
  };

  const filteredAndSortedAnalyses = mockAnalyses
    .filter(analysis => {
      if (statusFilter !== 'tous' && analysis.status !== statusFilter) return false;
      if (typeFilter !== 'tous' && analysis.type !== typeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      
      let comparison = 0;
      
      if (sortBy === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'score') {
        const aScore = a.score || 0;
        const bScore = b.score || 0;
        comparison = aScore - bScore;
      } else if (sortBy === 'type') {
        comparison = a.type.localeCompare(b.type);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
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
        </div>

        {/* Actions et filtres */}
        <div className="flex flex-wrap gap-6 mb-6 justify-between items-start">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Lancer une nouvelle analyse
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                <Filter className="w-5 h-5 mr-2" />
                {sortBy ? `Tri: ${getSortLabel(sortBy)}` : 'Filtres'}
                {sortBy && (
                  sortOrder === 'asc' ? 
                    <ChevronUp className="w-4 h-4 ml-2" /> : 
                    <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleSort('createdAt')}>
                <div className="flex items-center justify-between w-full">
                  <span>Date de création</span>
                  {sortBy === 'createdAt' && (
                    sortOrder === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('score')}>
                <div className="flex items-center justify-between w-full">
                  <span>Score Aura</span>
                  {sortBy === 'score' && (
                    sortOrder === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('type')}>
                <div className="flex items-center justify-between w-full">
                  <span>Type d'analyse</span>
                  {sortBy === 'type' && (
                    sortOrder === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </DropdownMenuItem>
              {sortBy && (
                <DropdownMenuItem onClick={() => { setSortBy(null); setSortOrder('desc'); }}>
                  <span className="text-muted-foreground">Réinitialiser le tri</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Grille d'analyses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {filteredAndSortedAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>

        {filteredAndSortedAnalyses.length === 0 && (
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