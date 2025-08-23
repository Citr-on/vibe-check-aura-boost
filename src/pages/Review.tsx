import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RatingGauge } from "@/components/ui/rating-gauge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { CarouselProfile } from "@/components/ui/carousel-profile";
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon, FavouriteIcon, ZapIcon, MessageMultiple02Icon, ArrowRight02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

const Review = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  
  // État pour le type de contenu sélectionné
  const [contentType, setContentType] = useState<"photos" | "profils" | "tout">("tout");
  
  const isMobile = useIsMobile();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [feelingScore, setFeelingScore] = useState(1);
  const [vibeScore, setVibeScore] = useState(1);
  const [intrigueScore, setIntrigueScore] = useState(1);
  const [positiveComment, setPositiveComment] = useState("");
  const [improvementComment, setImprovementComment] = useState("");
  
  // États pour l'interface mobile
  const [currentStep, setCurrentStep] = useState<"ratings" | "comments">("ratings");
  const [overlayHeight, setOverlayHeight] = useState(25); // pourcentage de hauteur de l'overlay

  // Profils à reviewer
  const profiles = [
    {
      id: 1,
      name: "Emma",
      age: 25,
      gender: "Femme",
      searchType: "Relation sérieuse",
      type: "profile" as const,
      images: [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400&h=500&fit=crop&crop=face"
      ],
      tags: ["Voyage", "Cuisine", "Yoga", "Lecture"],
      bio: "Passionnée de voyages et de découvertes culinaires. J'aime les moments simples et authentiques. Toujours prête pour une nouvelle aventure !"
    },
    {
      id: 2,
      name: "Lucas",
      age: 28,
      gender: "Homme",
      searchType: "Relation décontractée",
      type: "photo" as const,
      images: ["https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=500&fit=crop&crop=face"]
    },
    {
      id: 3,
      name: "Sophie",
      age: 32,
      gender: "Femme",
      searchType: "Amitié",
      type: "profile" as const,
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face"
      ],
      tags: ["Sport", "Musique", "Café", "Cinéma"],
      bio: "Sportive dans l'âme, mélomane et grande amatrice de cafés cosy. Cherche des personnes avec qui partager de bons moments."
    },
    {
      id: 4,
      name: "Thomas",
      age: 26,
      gender: "Homme",
      searchType: "Relation sérieuse",
      type: "photo" as const,
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"]
    },
    {
      id: 5,
      name: "Clara",
      age: 24,
      gender: "Femme",
      searchType: "Rencontres",
      type: "profile" as const,
      images: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=500&fit=crop&crop=face"
      ],
      tags: ["Art", "Photographie", "Nature", "Méditation"],
      bio: "Artiste photographe qui trouve l'inspiration dans la nature. J'aime capturer les petits détails de la vie quotidienne."
    }
  ];

  // Filtrage des profils selon le type sélectionné
  const filteredProfiles = profiles.filter(profile => {
    if (contentType === "photos") return profile.type === "photo";
    if (contentType === "profils") return profile.type === "profile";
    return true; // "tout"
  });

  const currentProfile = filteredProfiles[currentProfileIndex] || profiles[0];

  const handleSubmit = () => {
    console.log({
      profile: currentProfile.name,
      feelingScore,
      vibeScore,
      intrigueScore,
      positiveComment,
      improvementComment
    });
    // Passer au profil suivant
    nextProfile();
  };

  const handleSkip = () => {
    console.log("Skipped review for", currentProfile.name);
    nextProfile();
  };

  const nextProfile = () => {
    if (currentProfileIndex < filteredProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
      // Reset les champs pour le nouveau profil
      setFeelingScore(1);
      setVibeScore(1);
      setIntrigueScore(1);
      setPositiveComment("");
      setImprovementComment("");
      setCurrentStep("ratings");
    } else {
      // Fin des profils, retourner au premier ou afficher un message
      setCurrentProfileIndex(0);
      setFeelingScore(1);
      setVibeScore(1);
      setIntrigueScore(1);
      setPositiveComment("");
      setImprovementComment("");
      setCurrentStep("ratings");
      console.log("Tous les profils ont été reviewés !");
    }
  };
  
  const handleNext = () => {
    setCurrentStep("comments");
  };
  
  const handleDragStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const startY = touch.clientY;
    const startHeight = overlayHeight;
    let isDragging = false;
    
    const handleDragMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const deltaY = startY - currentY;
      const viewportHeight = window.innerHeight;
      
      // Marquer qu'on est en train de drag après un petit mouvement
      if (Math.abs(deltaY) > 5) {
        isDragging = true;
      }
      
      if (isDragging) {
        const sensitivity = 120; // Augmente la sensibilité du drag
        const newHeight = Math.min(75, Math.max(20, startHeight + (deltaY / viewportHeight) * sensitivity));
        setOverlayHeight(newHeight);
      }
    };
    
    const handleDragEnd = () => {
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
      
      // Snap vers des positions définies
      if (overlayHeight < 30) {
        setOverlayHeight(25);
      } else if (overlayHeight > 60) {
        setOverlayHeight(70);
      } else {
        setOverlayHeight(45);
      }
    };
    
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
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
              className="rounded-full px-4 py-2 flex-1 text-xs"
              style={{
                backgroundColor: contentType === "photos" ? "white" : "transparent",
                color: contentType === "photos" ? "black" : undefined
              }}
            >
              Photos
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="profils" 
              className="rounded-full px-4 py-2 flex-1 text-xs"
              style={{
                backgroundColor: contentType === "profils" ? "white" : "transparent",
                color: contentType === "profils" ? "black" : undefined
              }}
            >
              Profils
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="tout" 
              className="rounded-full px-4 py-2 flex-1 text-xs"
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
                    <CarouselProfile images={currentProfile.images} />
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
                <div className="h-full bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                  <img 
                    src={currentProfile?.images?.[0]} 
                    alt={`Photo de ${currentProfile?.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Overlay draggable pour l'évaluation */}
          <div 
            className="absolute bottom-0 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-t-2xl shadow-2xl border border-border transition-all duration-150 ease-out z-40"
            style={{ height: `${overlayHeight}%` }}
          >
            {/* Handle de drag */}
            <div 
              className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mt-3 cursor-grab active:cursor-grabbing"
              onTouchStart={handleDragStart}
            />
            
            <div className="p-4 h-full flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
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
                      icon={<HugeiconsIcon icon={SparklesIcon} size={24} className="text-accent" />}
                      label="Style"
                      color="hsl(var(--accent))"
                      labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                      tooltipText="Style : L'esthétique et les photos"
                    />

                    <RatingGauge
                      value={intrigueScore}
                      onChange={setIntrigueScore}
                      icon={<HugeiconsIcon icon={ZapIcon} size={24} className="text-primary" />}
                      label="Feeling"
                      color="hsl(var(--primary))"
                      labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                      tooltipText="Feeling : L'authenticité et la personnalité"
                    />
                  </div>

                  {/* Boutons étape 1 */}
                  <div className="flex flex-col gap-3 pt-4 pb-6 shrink-0">
                    <Button 
                      onClick={handleNext}
                      className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                    >
                      <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="mr-2" />
                      Suivant
                    </Button>
                    <Button 
                      onClick={handleSkip}
                      variant="outline"
                      className="w-full rounded-xl"
                    >
                      Passer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {/* Commentaires */}
                  <div className="space-y-4 flex-1 overflow-y-auto">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ce que j'aime le plus... <span className="text-muted-foreground font-normal">facultatif</span>
                      </label>
                      <Textarea
                        value={positiveComment}
                        onChange={(e) => setPositiveComment(e.target.value)}
                        placeholder={
                          currentProfile?.type === "profile" 
                            ? "Ce qui me plaît le plus..." 
                            : "Ce qui vous plaît dans cette photo..."
                        }
                        className="resize-none rounded-xl"
                        rows={2}
                      />
                      <div className="flex flex-wrap gap-1 mt-2">
                        {positiveChips.slice(0, 3).map((chip) => (
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
                            ? "Un conseil pour améliorer..." 
                            : "Un conseil constructif..."
                        }
                        className="resize-none rounded-xl"
                        rows={2}
                      />
                      <div className="flex flex-wrap gap-1 mt-2">
                        {improvementChips.slice(0, 3).map((chip) => (
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
                      <CarouselProfile images={currentProfile.images} />
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
                      <HugeiconsIcon icon={InformationCircleIcon} size={32} />
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
                  icon={<HugeiconsIcon icon={SparklesIcon} size={32} className="text-accent" />}
                  label="Style"
                  color="hsl(var(--accent))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Style : Le style et l'esthétique qui se dégagent. Les photos sont-elles bien prises, le look est-il soigné ?"
                />

                <RatingGauge
                  value={intrigueScore}
                  onChange={setIntrigueScore}
                  icon={<HugeiconsIcon icon={ZapIcon} size={32} className="text-primary" />}
                  label="Feeling"
                  color="hsl(var(--primary))"
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
                  className="flex-1 bg-primary hover:bg-primary/90 rounded-xl"
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