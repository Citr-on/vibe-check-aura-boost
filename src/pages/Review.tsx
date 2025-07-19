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
  
  const [feelingScore, setFeelingScore] = useState([5]);
  const [vibeScore, setVibeScore] = useState([5]);
  const [intrigueScore, setIntrigueScore] = useState([5]);
  const [positiveComment, setPositiveComment] = useState("");
  const [improvementComment, setImprovementComment] = useState("");

  const handleSubmit = () => {
    console.log({
      feelingScore: feelingScore[0],
      vibeScore: vibeScore[0],
      intrigueScore: intrigueScore[0],
      positiveComment,
      improvementComment
    });
    // Ici on ajouterait la logique pour soumettre l'avis
  };

  const handleSkip = () => {
    console.log("Skipped review");
    // Ici on chargerait le prochain profil à reviewer
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
              <div className="aspect-[3/4] bg-muted rounded-xl flex items-center justify-center mb-4">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-8 h-8" />
                  </div>
                  <p>Photo de profil</p>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>Homme, 28 ans</p>
                <p>Recherche: Relation sérieuse</p>
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
                  disabled={!positiveComment.trim() || !improvementComment.trim()}
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