import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ZapIcon, Tick01Icon, RocketIcon, Image01Icon } from '@hugeicons/core-free-icons';
import { Link } from "react-router-dom";
import { StudioAnalysisModal } from "@/components/dashboard/StudioAnalysisModal";
import bioSample1 from "@/assets/bio-sample-1.jpg";
import bioSample2 from "@/assets/bio-sample-2.jpg";
import portraitSample1 from "@/assets/portrait-sample-1.jpg";
import portraitSample2 from "@/assets/portrait-sample-2.jpg";
const PhotoRetouchStudio = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("authentique");
  const [briefing, setBriefing] = useState("Photo avec un sourire naturel, mais l'éclairage pourrait être amélioré pour un rendu plus professionnel. Le cadrage est bon mais manque de contraste.");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [aiGenerationCost] = useState(3); // Coût de la génération IA

  const photos = [{
    id: 0,
    src: bioSample1,
    alt: "Photo 1"
  }, {
    id: 1,
    src: bioSample2,
    alt: "Photo 2"
  }, {
    id: 2,
    src: portraitSample1,
    alt: "Photo 3"
  }, {
    id: 3,
    src: portraitSample2,
    alt: "Photo 4"
  }];
  const styles = [{
    id: "authentique",
    label: "Authentique",
    description: "Préserve votre look naturel tout en optimisant la qualité technique"
  }, {
    id: "studio-pro",
    label: "Studio Pro",
    description: "Éclairage professionnel et retouches subtiles pour un rendu premium"
  }];
  const handleTransform = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setHasResult(true);
  };
  const handleEvaluatePhoto = () => {
    setIsReviewModalOpen(true);
  };
  const handleAnalysisSelect = (optionId: string) => {
    console.log(`Analyse sélectionnée : ${optionId}`);
    setIsReviewModalOpen(false);
  };
  const getStyleDescription = () => {
    return styles.find(style => style.id === selectedStyle)?.description || "";
  };
  return <div className="min-h-screen bg-background">
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
              Retouche Photo IA
            </h1>
            <p className="text-muted-foreground">
              Transformez vos photos en portraits professionnels
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Photo Gallery */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HugeiconsIcon icon={Image01Icon} size={32} className="mr-2" />
                  Sélectionnez votre photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-3 gap-4 mb-4 min-w-max">
                    {/* Upload button - First slot */}
                    <label className="relative rounded-2xl overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition-all cursor-pointer bg-muted/50 hover:bg-muted">
                      <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => {
                      // Handle file upload
                      console.log('File uploaded:', e.target.files?.[0]);
                    }} />
                      <div className="w-full h-32 flex flex-col items-center justify-center text-muted-foreground">
                        <HugeiconsIcon icon={Image01Icon} size={32} className="mb-2" />
                        <span className="text-sm text-center px-2">Ajouter une photo</span>
                      </div>
                    </label>
                    
                    {/* Existing photos */}
                    {photos.map(photo => <button key={photo.id} onClick={() => setSelectedPhoto(photo.id)} className={`relative rounded-2xl overflow-hidden border-2 transition-all ${selectedPhoto === photo.id ? "border-primary shadow-lg" : "border-border hover:border-primary/50"}`}>
                        <img src={photo.src} alt={photo.alt} className="w-full h-32 object-cover" />
                        {selectedPhoto === photo.id && <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <HugeiconsIcon icon={Tick01Icon} size={16} />
                          </div>}
                      </button>)}
                  </div>
                </div>
                
                {/* Selected Photo Preview */}
                <div className="rounded-2xl overflow-hidden border">
                  
                </div>
              </CardContent>
            </Card>

            {/* AI Briefing */}
            <Card>
              <CardHeader>
                <CardTitle>Briefing IA</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Instructions basées sur les feedbacks de la communauté
                </p>
              </CardHeader>
              <CardContent>
                <Textarea value={briefing} onChange={e => setBriefing(e.target.value)} placeholder="Décrivez les améliorations souhaitées..." className="min-h-24" />
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Style de retouche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {styles.map(style => <Button key={style.id} variant={selectedStyle === style.id ? "default" : "outline"} onClick={() => setSelectedStyle(style.id)} className="rounded-full">
                      {style.label}
                    </Button>)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {getStyleDescription()}
                </p>
              </CardContent>
            </Card>

            {/* Transform Button */}
            <Button onClick={handleTransform} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Transformation en cours...
                </> : <>
                  <HugeiconsIcon icon={ZapIcon} size={32} className="mr-2" />
                  Transformer ma photo (Coût : 3 Crédits 💎)
                </>}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Résultat</CardTitle>
              </CardHeader>
              <CardContent>
                {!hasResult ? <div className="flex items-center justify-center h-96 text-center">
                    <div>
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-muted-foreground">
                        Le résultat de votre transformation apparaîtra ici.
                      </p>
                    </div>
                   </div> : <div className="space-y-6">
                    {/* Before/After Comparison */}
                    <div className="relative overflow-hidden rounded-2xl border">
                      <div className="flex">
                        <div className="transition-all duration-300 overflow-hidden" style={{
                      width: `${sliderValue}%`
                    }}>
                          <img src={photos[selectedPhoto].src} alt="Avant" className="w-full h-64 object-cover" />
                        </div>
                        <div className="transition-all duration-300 overflow-hidden" style={{
                      width: `${100 - sliderValue}%`
                    }}>
                          <img src={portraitSample1} alt="Après" className="w-full h-64 object-cover" />
                        </div>
                      </div>
                      
                      {/* Slider */}
                      <div className="absolute inset-0 flex items-center">
                        <input type="range" min="0" max="100" value={sliderValue} onChange={e => setSliderValue(Number(e.target.value))} className="w-full h-full opacity-0 cursor-ew-resize" />
                        <div className="absolute w-1 h-full bg-white shadow-lg pointer-events-none" style={{
                      left: `${sliderValue}%`,
                      transform: 'translateX(-50%)'
                    }} />
                      </div>
                      
                      {/* Labels */}
                      <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
                        Avant
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-background/80 text-foreground">
                        Après
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <HugeiconsIcon icon={Tick01Icon} size={16} className="mr-2" />
                        Enregistrer dans ma galerie
                      </Button>
                      <Button className="flex-1" onClick={handleEvaluatePhoto}>
                        <HugeiconsIcon icon={RocketIcon} size={16} className="mr-2" />
                        Faire évaluer cette photo
                      </Button>
                    </div>
                  </div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Analysis Modal with Studio IA Pricing */}
      <StudioAnalysisModal open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen} credits={credits} aura={aura} aiGenerationCost={aiGenerationCost} onAnalysisSelect={handleAnalysisSelect} />
    </div>;
};
export default PhotoRetouchStudio;