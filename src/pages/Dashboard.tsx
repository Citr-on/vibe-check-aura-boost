import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AnalysisModal } from "@/components/dashboard/AnalysisModal";
import { AnalysisCard } from "@/components/dashboard/AnalysisCard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, FilterIcon, ArrowUp01Icon, ArrowDown01Icon, Calendar03Icon, FavouriteIcon, Layers01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { useCredits } from "@/hooks/useCredits";
import { useAnalyses } from "@/hooks/useAnalyses";

type SortBy = 'createdAt' | 'score' | 'type' | 'status' | null;
type SortOrder = 'asc' | 'desc';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('tous');
  const [typeFilter, setTypeFilter] = useState('tous');
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  const { credits } = useCredits();
  const { analyses, loading, refetch } = useAnalyses();
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
      case 'status': return 'Statut';
      default: return '';
    }
  };

  const getSortIcon = (type: SortBy) => {
    switch (type) {
      case 'createdAt': return Calendar03Icon;
      case 'score': return FavouriteIcon;
      case 'type': return Layers01Icon;
      case 'status': return Clock01Icon;
      default: return FilterIcon;
    }
  };

  const filteredAndSortedAnalyses = analyses
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
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

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
            <HugeiconsIcon icon={PlusSignIcon} size={20} className="mr-2" />
            Lancer une nouvelle analyse
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                {sortBy ? (
                  <>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const iconName = getSortIcon(sortBy);
                        return <HugeiconsIcon icon={iconName} size={20} />;
                      })()}
                      {sortOrder === 'asc' ? 
                        <HugeiconsIcon icon={ArrowUp01Icon} size={16} /> : 
                        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                      }
                    </div>
                    {getSortLabel(sortBy)}
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={FilterIcon} size={20} className="mr-2" />
                    Filtres
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleSort('createdAt')}>
                <div className="flex items-center justify-between w-full">
                  <span>Date de création</span>
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={Calendar03Icon} size={16} />
                    {sortBy === 'createdAt' && (
                      sortOrder === 'asc' ? 
                        <HugeiconsIcon icon={ArrowUp01Icon} size={16} /> : 
                        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('score')}>
                <div className="flex items-center justify-between w-full">
                  <span>Score Aura</span>
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={FavouriteIcon} size={16} />
                    {sortBy === 'score' && (
                      sortOrder === 'asc' ? 
                        <HugeiconsIcon icon={ArrowUp01Icon} size={16} /> : 
                        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('type')}>
                <div className="flex items-center justify-between w-full">
                  <span>Type d'analyse</span>
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={Layers01Icon} size={16} />
                    {sortBy === 'type' && (
                      sortOrder === 'asc' ? 
                        <HugeiconsIcon icon={ArrowUp01Icon} size={16} /> : 
                        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('status')}>
                <div className="flex items-center justify-between w-full">
                  <span>Statut</span>
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={Clock01Icon} size={16} />
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? 
                        <HugeiconsIcon icon={ArrowUp01Icon} size={16} /> : 
                        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                    )}
                  </div>
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">Chargement des analyses...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAndSortedAnalyses.map((analysis) => (
                <AnalysisCard key={analysis.id} analysis={analysis} />
              ))}
            </div>

            {filteredAndSortedAnalyses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-4">
                  {analyses.length === 0 
                    ? "Aucune analyse pour le moment. Lancez votre première analyse !"
                    : "Aucune analyse trouvée avec ces filtres"
                  }
                </div>
                {analyses.length > 0 && (
                  <Button variant="outline" onClick={() => {
                    setStatusFilter('tous');
                    setTypeFilter('tous');
                  }}>
                    Réinitialiser les filtres
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <AnalysisModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        credits={credits}
        aura={aura}
        onAnalysisCreated={refetch}
      />
    </div>
  );
};

export default Dashboard;