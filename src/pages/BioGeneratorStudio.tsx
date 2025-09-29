import { useState, KeyboardEvent } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, FeatherIcon, Cancel01Icon, Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { Link } from "react-router-dom";

const BioGeneratorStudio = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  const [currentBio, setCurrentBio] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState("authentique");
  const [selectedLength, setSelectedLength] = useState("courte");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [selectedBio, setSelectedBio] = useState(0);
  const [copied, setCopied] = useState(false);

  const tones = [
    { id: "amusant", label: "Amusant" },
    { id: "authentique", label: "Authentique" },
    { id: "intriguant", label: "Intriguant" },
    { id: "direct", label: "Direct" },
  ];

  const lengths = [
    { id: "courte", label: "Courte & Percutante" },
    { id: "moyenne", label: "Moyenne & Détaillée" },
  ];

  const mockBios = [
    "Explorateur urbain passionné de café et de rires spontanés. J'ai une théorie selon laquelle les meilleures conversations naissent autour d'un bon cappuccino ☕",
    "Architecte le jour, chef amateur le soir. Je crois que la vie est trop courte pour ne pas essayer ce nouveau restaurant dont tout le monde parle 🍜",
    "Développeur créatif avec une passion pour l'escalade et les documentaires qui changent votre vision du monde. Premier date idéal : musée + débat passionné 🧗‍♂️"
  ];

  const handleKeywordAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      if (keywords.length < 8 && !keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
        setKeywordInput("");
      }
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGeneratedBios(mockBios);
    setSelectedBio(0);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    if (generatedBios[selectedBio]) {
      await navigator.clipboard.writeText(generatedBios[selectedBio]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Link to="/studio-ia" className="mr-4">
            <Button variant="ghost" size="sm">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="mr-2" />
              Retour au Studio
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Générateur de Bio IA
            </h1>
            <p className="text-muted-foreground">
              Créez une bio percutante qui intrigue et donne envie
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Current Bio */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Bio actuelle (optionnel)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Votre bio existante pour inspiration
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={currentBio}
                  onChange={(e) => setCurrentBio(e.target.value)}
                  placeholder="Copiez votre bio actuelle ici..."
                  className="min-h-24"
                />
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Vos passions et votre personnalité</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ajoutez jusqu'à 8 mots-clés. Appuyez sur 'Entrée' pour valider chaque mot.
                </p>
              </CardHeader>
              <CardContent>
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordAdd}
                  placeholder="Ex: voyages, cuisine, photographie..."
                  disabled={keywords.length >= 8}
                />
                
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {keyword}
                        <button
                          onClick={() => removeKeyword(index)}
                          className="ml-2 hover:text-destructive"
                        >
                          <HugeiconsIcon icon={Cancel01Icon} size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-2">
                  {keywords.length}/8 mots-clés
                </p>
              </CardContent>
            </Card>

            {/* Tone Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Ton de votre bio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <Button
                      key={tone.id}
                      variant={selectedTone === tone.id ? "default" : "outline"}
                      onClick={() => setSelectedTone(tone.id)}
                      className="rounded-full"
                    >
                      {tone.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Length Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Longueur de la bio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lengths.map((length) => (
                    <Button
                      key={length.id}
                      variant={selectedLength === length.id ? "default" : "outline"}
                      onClick={() => setSelectedLength(length.id)}
                      className="rounded-full"
                    >
                      {length.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || keywords.length === 0}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={FeatherIcon} size={32} className="mr-2" />
                  Générer mes bios (Coût : 2 Crédits 💎)
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Vos nouvelles bios</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedBios.length === 0 ? (
                  <div className="flex items-center justify-center h-96 text-center">
                    <div>
                      <div className="text-6xl mb-4">✍️</div>
                      <p className="text-muted-foreground">
                        Vos propositions de bio apparaîtront ici après génération.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Bio Selection Tabs */}
                    <div className="flex gap-2">
                      {generatedBios.map((_, index) => (
                        <Button
                          key={index}
                          variant={selectedBio === index ? "default" : "outline"}
                          onClick={() => setSelectedBio(index)}
                          className="rounded-full"
                        >
                          Proposition {index + 1}
                        </Button>
                      ))}
                    </div>

                    {/* Selected Bio Display */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border bg-muted/50">
                        <p className="text-foreground leading-relaxed">
                          {generatedBios[selectedBio]}
                        </p>
                      </div>

                      {/* Copy Button */}
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="w-full"
                      >
                        {copied ? (
                          <>
                            <HugeiconsIcon icon={Tick01Icon} size={16} className="mr-2 text-green-600" />
                            Copié !
                          </>
                        ) : (
                          <>
                            <HugeiconsIcon icon={Copy01Icon} size={16} className="mr-2" />
                            Copier le texte
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BioGeneratorStudio;