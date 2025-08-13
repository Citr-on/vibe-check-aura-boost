import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RatingGauge } from "@/components/ui/rating-gauge";
import { Sparkles, Heart, Zap, MessageSquare, ArrowRight, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Review = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [feelingScore, setFeelingScore] = useState(1);
  const [vibeScore, setVibeScore] = useState(1);
  const [intrigueScore, setIntrigueScore] = useState(1);
  const [positiveComment, setPositiveComment] = useState("");
  const [improvementComment, setImprovementComment] = useState("");

  // Profils à reviewer
  const profiles = [
    {
      id: 1,
      name: "Emma",
      age: 25,
      gender: "Femme",
      searchType: "Relation sérieuse",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Lucas",
      age: 28,
      gender: "Homme",
      searchType: "Relation décontractée",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Sophie",
      age: 32,
      gender: "Femme",
      searchType: "Amitié",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Thomas",
      age: 26,
      gender: "Homme",
      searchType: "Relation sérieuse",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Clara",
      age: 24,
      gender: "Femme",
      searchType: "Rencontres",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face"
    }
  ];

  const currentProfile = profiles[currentProfileIndex];

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
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
      // Reset les champs pour le nouveau profil
      setFeelingScore(1);
      setVibeScore(1);
      setIntrigueScore(1);
      setPositiveComment("");
      setImprovementComment("");
    } else {
      // Fin des profils, retourner au premier ou afficher un message
      setCurrentProfileIndex(0);
      setFeelingScore(1);
      setVibeScore(1);
      setIntrigueScore(1);
      setPositiveComment("");
      setImprovementComment("");
      console.log("Tous les profils ont été reviewés !");
    }
  };

  const positiveChips = [
    { label: "Style", text: "J'aime son style vestimentaire" },
    { label: "Sourire", text: "Beau sourire !" },
    { label: "Date", text: "J'accepterais carrément un date avec lui/elle !" },
    { label: "Super photo", text: "Super photo !" },
    { label: "Charme", text: "Beaucoup de charme" },
    { label: "Naturel", text: "Photo très naturelle" }
  ];

  const improvementChips = [
    { label: "Cadre", text: "Je changerais le cadrage de la photo" },
    { label: "Gêné", text: "La personne a l'air mal à l'aise sur cette photo" },
    { label: "Arrière-plan", text: "L'arrière-plan distrait l'attention" },
    { label: "Lunettes", text: "Je préférerais sans lunettes de soleil" },
    { label: "Éclairage", text: "L'éclairage pourrait être amélioré" },
    { label: "Angle", text: "Un angle différent serait plus flatteur" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Élément à analyser */}
          <Card className="rounded-2xl shadow-card">
            <CardHeader className="sr-only">
              <CardTitle>Photo à analyser</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                <img 
                  src={currentProfile.image} 
                  alt={`Photo de ${currentProfile.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Panneau de notation */}
          <Card className="rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Votre évaluation</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="w-4 h-4" />
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
                          <p><span className="font-medium">Feeling :</span> Votre première impression. La personne est-elle attirante, bien mise en valeur ?</p>
                          <p><span className="font-medium">Vibe :</span> La personnalité qui se dégage. Le profil semble-t-il authentique, fun, sincère ?</p>
                          <p><span className="font-medium">Intrigue :</span> L'envie d'aller plus loin. Le profil donne-t-il envie d'engager la conversation ?</p>
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
                  icon={<Heart className="w-4 h-4 text-red-500" />}
                  label="Feeling"
                  color="hsl(var(--destructive))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Feeling : Votre première impression. La personne est-elle attirante, bien mise en valeur ?"
                />

                <RatingGauge
                  value={vibeScore}
                  onChange={setVibeScore}
                  icon={<Zap className="w-4 h-4 text-accent" />}
                  label="Vibe"
                  color="hsl(var(--accent))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Vibe : La personnalité qui se dégage. Le profil semble-t-il authentique, fun, sincère ?"
                />

                <RatingGauge
                  value={intrigueScore}
                  onChange={setIntrigueScore}
                  icon={<MessageSquare className="w-4 h-4 text-primary" />}
                  label="Intrigue"
                  color="hsl(var(--primary))"
                  labels={["Non", "Un peu", "Assez", "Beaucoup", "Carrément !"]}
                  tooltipText="Intrigue : L'envie d'aller plus loin. Le profil donne-t-il envie d'engager la conversation ?"
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
                    placeholder="Partagez ce qui vous plaît dans cette photo/bio..."
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
                    placeholder="Donnez un conseil constructif et bienveillant..."
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
                  <Sparkles className="w-4 h-4 mr-2" />
                  Soumettre & Gagner de l'Aura
                </Button>
                <Button 
                  onClick={handleSkip}
                  variant="outline"
                  className="rounded-xl"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Passer
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Review;