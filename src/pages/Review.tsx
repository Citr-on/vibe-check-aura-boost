import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RatingGauge } from "@/components/ui/rating-gauge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { CarouselProfile } from "@/components/ui/carousel-profile";
import { CommentSection } from "@/components/ui/comment-section";
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon, FavouriteIcon, ZapIcon, TaskEdit01Icon, ArrowRight02Icon, InformationCircleIcon, StarIcon, ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { Flag, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCredits } from "@/hooks/useCredits";
import { useProfilesToReview } from "@/hooks/useProfilesToReview";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Review = () => {
  const { credits, deductCredits } = useCredits();
  const [aura] = useState(3.5);
  const { profiles: dbProfiles, loading } = useProfilesToReview();
  const { toast } = useToast();
  
  // État pour le type de contenu sélectionné
  const [contentType, setContentType] = useState<"photos" | "profils" | "tout">("tout");
  
  const isMobile = useIsMobile();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [feelingScore, setFeelingScore] = useState(0);
  const [vibeScore, setVibeScore] = useState(0);
  const [intrigueScore, setIntrigueScore] = useState(0);
  const [positiveComment, setPositiveComment] = useState("");
  const [improvementComment, setImprovementComment] = useState("");
  
  // Cache des commentaires par profil
  const [commentCache, setCommentCache] = useState<{[key: number]: {positive: string, improvement: string}}>({});
  
  // États pour l'interface mobile
  const [currentStep, setCurrentStep] = useState<"ratings" | "comments">("ratings");
  const [showOverlay, setShowOverlay] = useState(false);

  // Utiliser les profils de la base de données
  const profiles = dbProfiles;

  // Filtrage des profils selon le type sélectionné
  const filteredProfiles = profiles.filter(profile => {
    if (contentType === "photos") return profile.type === "photo";
    if (contentType === "profils") return profile.type === "profile";
    return true; // "tout"
  });

  const currentProfile = filteredProfiles[currentProfileIndex] || profiles[0];
  
  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div className="h-screen bg-background flex flex-col">
        <Header credits={credits} aura={aura} />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Chargement des profils...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Afficher un message si aucun profil
  if (profiles.length === 0) {
    return (
      <div className="h-screen bg-background flex flex-col">
        <Header credits={credits} aura={aura} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Aucun profil à évaluer pour le moment</p>
            <p className="text-sm text-muted-foreground">Revenez plus tard !</p>
          </div>
        </div>
      </div>
    );
  }


  const handleSubmit = async () => {
    try {
      // Vérifier que l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour soumettre une évaluation",
          variant: "destructive",
        });
        return;
      }

      // Valider que tous les scores sont renseignés
      if (feelingScore === 0 || vibeScore === 0 || intrigueScore === 0) {
        toast({
          title: "Erreur",
          description: "Veuillez renseigner tous les scores avant de soumettre",
          variant: "destructive",
        });
        return;
      }

      // Déduire les crédits selon le coût de l'analyse
      const costAmount = currentProfile.cost_amount || 1;
      const creditDeducted = await deductCredits(costAmount);
      if (!creditDeducted) {
        toast({
          title: "Crédits insuffisants",
          description: `Vous n'avez pas assez de crédits pour soumettre cette évaluation (${costAmount} crédits requis)`,
          variant: "destructive",
        });
        return;
      }

      // Enregistrer la review dans la base de données
      const { error } = await supabase
        .from('reviews')
        .insert({
          reviewer_id: user.id,
          analysis_id: currentProfile.id,
          feeling_score: feelingScore,
          vibe_score: vibeScore,
          intrigue_score: intrigueScore,
          positive_comment: positiveComment || null,
          improvement_comment: improvementComment || null,
          photo_index: currentPhotoIndex,
          profile_images: currentProfile.images || [],
          profile_bio: currentProfile.bio || null,
          profile_keywords: currentProfile.tags || [],
          profile_metadata: {
            type: currentProfile.type,
            name: currentProfile.name,
            age: currentProfile.age,
            gender: currentProfile.gender,
          },
        });

      if (error) {
        console.error('Error submitting review:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement de votre évaluation",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Évaluation envoyée !",
        description: "Vous avez gagné 0.1 Aura ✨",
      });

      // Passer au profil suivant
      nextProfile();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleSkip = () => {
    console.log("Skipped review for", currentProfile.name);
    nextProfile();
  };

  const nextProfile = () => {
    // Sauvegarder les commentaires du profil actuel
    if (positiveComment || improvementComment) {
      setCommentCache(prev => ({
        ...prev,
        [currentProfile.id]: {
          positive: positiveComment,
          improvement: improvementComment
        }
      }));
    }

    if (currentProfileIndex < filteredProfiles.length - 1) {
      const nextIndex = currentProfileIndex + 1;
      const nextProfile = filteredProfiles[nextIndex];
      setCurrentProfileIndex(nextIndex);
      
      // Restaurer les commentaires du nouveau profil s'ils existent
      const cached = commentCache[nextProfile.id];
      setPositiveComment(cached?.positive || "");
      setImprovementComment(cached?.improvement || "");
      
      // Reset les scores
      setFeelingScore(0);
      setVibeScore(0);
      setIntrigueScore(0);
      setCurrentPhotoIndex(0);
      setCurrentStep("ratings");
    } else {
      // Fin des profils, retourner au premier
      const firstProfile = filteredProfiles[0];
      setCurrentProfileIndex(0);
      
      // Restaurer les commentaires du premier profil s'ils existent
      const cached = commentCache[firstProfile.id];
      setPositiveComment(cached?.positive || "");
      setImprovementComment(cached?.improvement || "");
      
      setFeelingScore(0);
      setVibeScore(0);
      setIntrigueScore(0);
      setCurrentPhotoIndex(0);
      setCurrentStep("ratings");
      console.log("Tous les profils ont été reviewés !");
    }
  };
  
  const handleNext = () => {
    if (feelingScore > 0 && vibeScore > 0 && intrigueScore > 0) {
      setCurrentStep("comments");
    } else {
      alert("Veuillez évaluer tous les critères avant de continuer.");
    }
  };
  
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  // Tags contextuels selon le type de contenu
  const getPositiveChips = () => {
    if (currentProfile?.type === "profile") {
      return [
        { label: "Photos variées", text: "Belle variété de photos" },
        { label: "Bonne description", text: "La description donne envie d'en savoir plus" },
        { label: "Profil cohérent", text: "Profil très cohérent et bien construit" },
        { label: "Authentique", text: "Le profil semble authentique" },
        { label: "Donne confiance", text: "Ce profil m'inspire confiance" },
        { label: "Plein d'humour", text: "J'aime l'humour dans ce profil" }
      ];
    }
    return [
      { label: "Style", text: "J'aime son style vestimentaire" },
      { label: "Sourire", text: "Beau sourire !" },
      { label: "Date", text: "J'accepterais carrément un date avec lui/elle !" },
      { label: "Super photo", text: "Super photo !" },
      { label: "Charme", text: "Beaucoup de charme" },
      { label: "Naturel", text: "Photo très naturelle" }
    ];
  };

  const getImprovementChips = () => {
    if (currentProfile?.type === "profile") {
      return [
        { label: "Manque de photos", text: "Quelques photos supplémentaires seraient un plus" },
        { label: "Bio à développer", text: "La biographie pourrait être plus détaillée" },
        { label: "Trop classique", text: "Le profil manque d'originalité" },
        { label: "Photos similaires", text: "Diversifier les types de photos" },
        { label: "Manque de clarté", text: "Les intentions pourraient être plus claires" }
      ];
    }
    return [
      { label: "Cadre", text: "Je changerais le cadrage de la photo" },
      { label: "Gêné", text: "La personne a l'air mal à l'aise sur cette photo" },
      { label: "Arrière-plan", text: "L'arrière-plan distrait l'attention" },
      { label: "Lunettes", text: "Je préférerais sans lunettes de soleil" },
      { label: "Éclairage", text: "L'éclairage pourrait être amélioré" },
      { label: "Angle", text: "Un angle différent serait plus flatteur" }
    ];
  };

  const positiveChips = getPositiveChips();
  const improvementChips = getImprovementChips();

  if (isMobile) {
    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        <Header credits={credits} aura={aura} />
        
        {/* Sélecteur de type de contenu - Mobile */}
        <div className="flex justify-center px-4 py-2 shrink-0">
          <ToggleGroup 
            type="single" 
            value={contentType} 
            onValueChange={(value) => {
              if (value) {
                setContentType(value as "photos" | "profils" | "tout");
                setCurrentProfileIndex(0);
                setCurrentStep("ratings");
              }
            }}
            className="bg-muted rounded-full p-1 w-full max-w-sm"
          >
            <ToggleGroupItem 
              value="photos" 
              className="rounded-full px-4 py-1 flex-1 text-xs"
              style={{
                backgroundColor: contentType === "photos" ? "white" : "transparent",
                color: contentType === "photos" ? "black" : undefined
              }}
            >
              Photos
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="profils" 
              className="rounded-full px-4 py-1 flex-1 text-xs"
              style={{
                backgroundColor: contentType === "profils" ? "white" : "transparent",
                color: contentType === "profils" ? "black" : undefined
              }}
            >
              Profils
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="tout" 
              className="rounded-full px-4 py-1 flex-1 text-xs"
              style={{
                backgroundColor: contentType === "tout" ? "white" : "transparent",
                color: contentType === "tout" ? "black" : undefined
              }}
            >
              Tout
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Contenu principal - Photo/Profil */}
        <div className="flex-1 px-4 relative overflow-hidden">
          <Card className="rounded-2xl shadow-card h-full">
            <CardContent className="p-4 h-full flex flex-col">
              {currentProfile?.type === "profile" ? (
                <div className="h-full flex flex-col">
                  {/* Carrousel de photos - 70% de la hauteur */}
                  <div className="h-[70%]">
                    <CarouselProfile 
                      images={currentProfile.images} 
                      profileId={currentProfile.id}
                      profileName={currentProfile.name}
                      onImageChange={setCurrentPhotoIndex}
                    />
                  </div>
                  
                  {/* Informations utilisateur - 30% de la hauteur */}
                  <div className="h-[30%] mt-4 px-2 space-y-3 overflow-hidden pb-2">
                    {/* Tags */}
                    {currentProfile.tags && (
                      <div className="flex flex-wrap gap-1">
                        {currentProfile.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Biographie */}
                    {currentProfile.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 overflow-hidden">
                        {currentProfile.bio}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full bg-muted rounded-xl overflow-hidden relative group">
                  <img 
                    src={currentProfile?.images?.[0]} 
                    alt={`Photo de ${currentProfile?.name}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Bouton de signalement pour les photos simples */}
                  <Button
                    onClick={() => {
                      const reportData = {
                        profileId: currentProfile.id,
                        profileName: currentProfile.name,
                        imageUrl: currentProfile?.images?.[0],
                        timestamp: new Date().toISOString(),
                        reason: 'Contenu inapproprié'
                      };
                      console.log('Signalement envoyé:', reportData);
                      // TODO: Ajouter une notification toast ici si nécessaire
                    }}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Boutons flottants */}
          {!showOverlay && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
              <button
                onClick={handleSkip}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 py-3 shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span className="font-medium">Passer</span>
                <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
              </button>
              <button
                onClick={toggleOverlay}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <HugeiconsIcon icon={TaskEdit01Icon} size={20} />
                <span className="font-medium">Évaluer</span>
              </button>
            </div>
          )}

          {/* Overlay pour l'évaluation */}
          {showOverlay && (
            <div className="absolute inset-0 bg-black/50 z-40 flex items-end p-4">
              <div className="w-full bg-background rounded-2xl shadow-2xl border border-border max-h-[80vh] overflow-hidden">
                <div className="p-4 h-full flex flex-col max-h-[70vh]">
                  <div className="flex items-center justify-between mb-4">
                    {currentStep === "comments" && (
                      <button
                        onClick={() => setCurrentStep("ratings")}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
                        <span className="text-sm">Retour</span>
                      </button>
                    )}
                    
                    {/* Titre et icône d'information centrés */}
                    <div className="flex items-center justify-center gap-2 flex-1">
                      <h3 className="text-lg font-semibold">Votre évaluation</h3>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <HugeiconsIcon icon={InformationCircleIcon} size={24} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 pointer-events-auto">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm">Guide de l'évaluation</h4>
                            <p className="text-xs text-muted-foreground">
                              Donnez un avis constructif et gagnez <span className="text-accent font-medium">0.1 Aura ✨</span> pour chaque évaluation validée.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Seuls les retours utiles et respectueux sont récompensés.
                            </p>
                            <div className="space-y-2">
                              <h5 className="font-medium text-xs">Les Critères :</h5>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p><span className="font-medium">Attirance :</span> Votre première impression</p>
                                <p><span className="font-medium">Style :</span> L'esthétique et les photos</p>
                                <p><span className="font-medium">Feeling :</span> L'authenticité et la personnalité</p>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <button 
                      onClick={toggleOverlay}
                      className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
                    >
                      ✕
                    </button>
                  </div>

                  {currentStep === "ratings" ? (
                    <div className="flex-1 flex flex-col">
                      {/* Jauges de notation */}
                      <div className="space-y-4 flex-1">
                        <RatingGauge
                          value={feelingScore}
                          onChange={setFeelingScore}
                          icon={<HugeiconsIcon icon={FavouriteIcon} size={24} className="text-red-500" />}
                          label="Attirance"
                          color="hsl(var(--destructive))"
                          labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                          tooltipText="Attirance : Votre première impression"
                        />

                        <RatingGauge
                          value={vibeScore}
                          onChange={setVibeScore}
                          icon={<HugeiconsIcon icon={SparklesIcon} size={24} className="text-primary" />}
                          label="Style"
                          color="hsl(var(--primary))"
                          labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                          tooltipText="Style : L'esthétique et les photos"
                        />

                        <RatingGauge
                          value={intrigueScore}
                          onChange={setIntrigueScore}
                          icon={<HugeiconsIcon icon={ZapIcon} size={24} className="text-accent" />}
                          label="Feeling"
                          color="hsl(var(--accent))"
                          labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                          tooltipText="Feeling : L'authenticité et la personnalité"
                        />
                      </div>

                      {/* Bouton étape 1 */}
                      <div className="flex flex-col gap-3 pt-4 pb-6 shrink-0">
                        <Button 
                          onClick={handleNext}
                          disabled={feelingScore === 0 || vibeScore === 0 || intrigueScore === 0}
                          className="w-full bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span>Suivant</span>
                          <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      {/* Section commentaire avec composant filtrable */}
                      <div className="flex-1 overflow-y-auto">
                        <CommentSection
                          positiveComment={positiveComment}
                          setPositiveComment={setPositiveComment}
                          improvementComment={improvementComment}
                          setImprovementComment={setImprovementComment}
                          positiveChips={positiveChips}
                          improvementChips={improvementChips}
                        />
                      </div>

                      {/* Bouton étape 2 */}
                      <div className="pt-4 pb-6 shrink-0">
                        <Button 
                          onClick={handleSubmit}
                          className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                        >
                          <HugeiconsIcon icon={SparklesIcon} size={16} className="mr-2" />
                          Soumettre & Gagner de l'Aura
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Version desktop (inchangée)
  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Sélecteur de type de contenu */}
        <div className="flex justify-center mb-8">
          <ToggleGroup 
            type="single" 
            value={contentType} 
            onValueChange={(value) => {
              console.log("ToggleGroup value changed:", value);
              if (value) {
                setContentType(value as "photos" | "profils" | "tout");
                setCurrentProfileIndex(0);
              }
            }}
            className="bg-muted rounded-full p-1 w-96"
          >
            <ToggleGroupItem 
              value="photos" 
              className="rounded-full px-8 py-2 flex-1"
              style={{
                backgroundColor: contentType === "photos" ? "white" : "transparent",
                color: contentType === "photos" ? "black" : undefined
              }}
            >
              Photos
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="profils" 
              className="rounded-full px-8 py-2 flex-1"
              style={{
                backgroundColor: contentType === "profils" ? "white" : "transparent",
                color: contentType === "profils" ? "black" : undefined
              }}
            >
              Profils
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="tout" 
              className="rounded-full px-8 py-2 flex-1"
              style={{
                backgroundColor: contentType === "tout" ? "white" : "transparent",
                color: contentType === "tout" ? "black" : undefined
              }}
            >
              Tout
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
          {/* Élément à analyser */}
          <div className="lg:w-1/2">
            <Card className="rounded-2xl shadow-card h-full">
              <CardHeader className="sr-only">
                <CardTitle>{currentProfile?.type === "profile" ? "Profil à analyser" : "Photo à analyser"}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-full flex flex-col">
                {currentProfile?.type === "profile" ? (
                  <div className="h-full flex flex-col">
                    {/* Carrousel de photos - 70% de la hauteur */}
                    <div className="h-[70%]">
                      <CarouselProfile 
                        images={currentProfile.images}
                        profileId={currentProfile.id}
                        profileName={currentProfile.name}
                        onImageChange={setCurrentPhotoIndex}
                      />
                    </div>
                    
                    {/* Informations utilisateur - 30% de la hauteur */}
                    <div className="h-[30%] mt-4 px-2 space-y-3">
                      {/* Tags */}
                      {currentProfile.tags && (
                        <div className="flex flex-wrap gap-1">
                          {currentProfile.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Biographie */}
                      {currentProfile.bio && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {currentProfile.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                    <img 
                      src={currentProfile?.images?.[0]} 
                      alt={`Photo de ${currentProfile?.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Panneau de notation */}
          <div className="lg:w-1/2">
            <Card className="rounded-2xl shadow-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Votre évaluation</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <HugeiconsIcon icon={InformationCircleIcon} size={24} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 pointer-events-auto">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Guide de l'évaluation</h4>
                      <p className="text-xs text-muted-foreground">
                        Donnez un avis constructif et gagnez <span className="text-accent font-medium">0.1 Aura ✨</span> pour chaque évaluation validée.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Seuls les retours utiles et respectueux sont récompensés. Les insultes, trolls ou avis "à la chaîne" ne seront pas pris en compte.
                      </p>
                        <div className="space-y-2">
                          <h5 className="font-medium text-xs">Les Critères :</h5>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p><span className="font-medium">Attirance :</span> Votre première impression. La personne est-elle attirante, bien mise en valeur ?</p>
                            <p><span className="font-medium">Style :</span> Le style et l'esthétique qui se dégagent. Les photos sont-elles bien prises, le look est-il soigné ?</p>
                            <p><span className="font-medium">Feeling :</span> L'émotion et la personnalité qui se dégagent. Le profil semble-t-il authentique, fun, sincère ?</p>
                          </div>
                        </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Jauges de notation */}
              <div className="space-y-4">
                <RatingGauge
                  value={feelingScore}
                  onChange={setFeelingScore}
                  icon={<HugeiconsIcon icon={FavouriteIcon} size={32} className="text-red-500" />}
                  label="Attirance"
                  color="hsl(var(--destructive))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Attirance : Votre première impression. La personne est-elle attirante, bien mise en valeur ?"
                />

                <RatingGauge
                  value={vibeScore}
                  onChange={setVibeScore}
                  icon={<HugeiconsIcon icon={SparklesIcon} size={32} className="text-primary" />}
                  label="Style"
                  color="hsl(var(--primary))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Style : Le style et l'esthétique qui se dégagent. Les photos sont-elles bien prises, le look est-il soigné ?"
                />

                <RatingGauge
                  value={intrigueScore}
                  onChange={setIntrigueScore}
                  icon={<HugeiconsIcon icon={ZapIcon} size={32} className="text-accent" />}
                  label="Feeling"
                  color="hsl(var(--accent))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Feeling : L'émotion et la personnalité qui se dégagent. Le profil semble-t-il authentique, fun, sincère ?"
                />
              </div>

              {/* Commentaires */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ce que j'aime le plus... <span className="text-muted-foreground font-normal">facultatif</span>
                  </label>
                  <Textarea
                    value={positiveComment}
                    onChange={(e) => setPositiveComment(e.target.value)}
                    placeholder={
                      currentProfile?.type === "profile" 
                        ? "Ce qui me plaît le plus sur ce profil..." 
                        : "Partagez ce qui vous plaît dans cette photo/bio..."
                    }
                    className="resize-none rounded-xl"
                    rows={2}
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {positiveChips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => setPositiveComment(chip.text)}
                        className="px-2 py-1 text-xs rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Un conseil pour améliorer... <span className="text-muted-foreground font-normal">facultatif</span>
                  </label>
                  <Textarea
                    value={improvementComment}
                    onChange={(e) => setImprovementComment(e.target.value)}
                    placeholder={
                      currentProfile?.type === "profile" 
                        ? "Un conseil pour améliorer ce profil..." 
                        : "Donnez un conseil constructif et bienveillant..."
                    }
                    className="resize-none rounded-xl"
                    rows={2}
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {improvementChips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => setImprovementComment(chip.text)}
                        className="px-2 py-1 text-xs rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={feelingScore === 0 || vibeScore === 0 || intrigueScore === 0}
                  className="flex-1 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HugeiconsIcon icon={SparklesIcon} size={16} className="mr-2" />
                  Soumettre & Gagner de l'Aura
                </Button>
                <Button 
                  onClick={handleSkip}
                  variant="outline"
                  className="rounded-xl"
                >
                  <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="mr-2" />
                  Passer
                </Button>
              </div>

            </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;