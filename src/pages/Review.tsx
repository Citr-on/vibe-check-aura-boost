import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Heart, Zap, MessageSquare, ArrowRight } from "lucide-react";

const Review = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [feelingScore, setFeelingScore] = useState([5]);
  const [vibeScore, setVibeScore] = useState([5]);
  const [intrigueScore, setIntrigueScore] = useState([5]);
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
      feelingScore: feelingScore[0],
      vibeScore: vibeScore[0],
      intrigueScore: intrigueScore[0],
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
      setFeelingScore([5]);
      setVibeScore([5]);
      setIntrigueScore([5]);
      setPositiveComment("");
      setImprovementComment("");
    } else {
      // Fin des profils, retourner au premier ou afficher un message
      setCurrentProfileIndex(0);
      setFeelingScore([5]);
      setVibeScore([5]);
      setIntrigueScore([5]);
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
        {/* En-tête */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Donner un avis
          </h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Votre avis est précieux. Aidez un membre et gagnez</span>
            <span className="font-semibold text-accent">0.1 Aura ✨</span>
            <span>pour chaque review de qualité.</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Élément à analyser */}
          <Card className="rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="text-center">Photo à analyser</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden mb-4">
                <img 
                  src={currentProfile.image} 
                  alt={`Photo de ${currentProfile.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>{currentProfile.gender}, {currentProfile.age} ans</p>
                <p>Recherche: {currentProfile.searchType}</p>
                <p className="text-xs mt-1">Profil {currentProfileIndex + 1} sur {profiles.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Panneau de notation */}
          <Card className="rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle>Votre évaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Jauges de notation */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-2 font-medium">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Feeling</span>
                    </label>
                    <span className="text-sm text-muted-foreground">{feelingScore[0]}/10</span>
                  </div>
                  <Slider
                    value={feelingScore}
                    onValueChange={setFeelingScore}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-2 font-medium">
                      <Zap className="w-4 h-4 text-accent" />
                      <span>Vibe</span>
                    </label>
                    <span className="text-sm text-muted-foreground">{vibeScore[0]}/10</span>
                  </div>
                  <Slider
                    value={vibeScore}
                    onValueChange={setVibeScore}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-2 font-medium">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>Intrigue</span>
                    </label>
                    <span className="text-sm text-muted-foreground">{intrigueScore[0]}/10</span>
                  </div>
                  <Slider
                    value={intrigueScore}
                    onValueChange={setIntrigueScore}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Commentaires */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ce que j'aime le plus...
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
                    Un conseil pour améliorer...
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

              <div className="text-xs text-muted-foreground text-center">
                Vos avis doivent être constructifs et respectueux pour être récompensés
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Review;