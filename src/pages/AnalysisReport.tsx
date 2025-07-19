import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Heart, Zap, MessageSquare, Lock, Gem, TrendingUp, TrendingDown } from "lucide-react";

const AnalysisReport = () => {
  const { id } = useParams();
  const [credits] = useState(150);
  const [aura] = useState(3.5);

  // Simulation des données selon le type d'analyse
  const isStandardAnalysis = id === '2'; // L'analyse en cours dans notre mock

  const scoreData = [
    { name: 'Feeling', score: 8.2, color: '#ef4444' },
    { name: 'Vibe', score: 7.8, color: '#F7B538' },
    { name: 'Intrigue', score: 6.9, color: '#48D1CC' }
  ];

  const demographicData = [
    { name: '18-25', value: 35, color: '#48D1CC' },
    { name: '26-35', value: 45, color: '#F7B538' },
    { name: '36-45', value: 20, color: '#94a3b8' }
  ];

  const keywordData = [
    'Sourire', 'Naturel', 'Confiant', 'Amical', 'Authentique',
    'Chaleureux', 'Beau regard', 'Style', 'Accessible', 'Séduisant'
  ];

  const topStrengths = [
    "Sourire naturel et chaleureux",
    "Expression confiante et accessible", 
    "Bon éclairage et qualité photo"
  ];

  const topWeaknesses = [
    "Angle légèrement en contre-plongée",
    "Arrière-plan pourrait être plus neutre",
    "Photo un peu trop recadrée"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du rapport */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant={isStandardAnalysis ? "secondary" : "default"} className="rounded-full">
              {isStandardAnalysis ? "Standard" : "Premium"}
            </Badge>
            <Badge variant="outline" className="rounded-full">Photo</Badge>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Rapport d'analyse - Photo de profil
          </h1>
          <p className="text-muted-foreground">
            Analyse terminée le {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Photo analysée */}
          <div className="lg:col-span-1">
            <Card className="rounded-2xl shadow-card sticky top-8">
              <CardHeader>
                <CardTitle>Photo analysée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-muted rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <Heart className="w-12 h-12 mx-auto mb-2" />
                    <p>Photo de profil</p>
                  </div>
                </div>
                
                {/* Score global */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {isStandardAnalysis ? '7.6' : '8.2'}/10
                  </div>
                  <div className="text-sm text-muted-foreground">Score Aura global</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Avis reçus</span>
                    <span>{isStandardAnalysis ? '13/20' : '50/50'}</span>
                  </div>
                  <Progress value={isStandardAnalysis ? 65 : 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scores détaillés */}
            <Card className="rounded-2xl shadow-card">
              <CardHeader>
                <CardTitle>Scores détaillés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Bar dataKey="score" fill="#48D1CC" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {scoreData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        {item.name === 'Feeling' && <Heart className="w-5 h-5 text-red-500" />}
                        {item.name === 'Vibe' && <Zap className="w-5 h-5 text-accent" />}
                        {item.name === 'Intrigue' && <MessageSquare className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="font-semibold text-lg">{item.score}/10</div>
                      <div className="text-xs text-muted-foreground">{item.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Répartition démographique */}
            <Card className="rounded-2xl shadow-card">
              <CardHeader>
                <CardTitle>Répartition des avis par âge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-6 mt-4">
                  {demographicData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mots-clés */}
            <Card className="rounded-2xl shadow-card">
              <CardHeader>
                <CardTitle>Mots-clés récurrents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {keywordData.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="rounded-full">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Synthèse IA */}
            <Card className="rounded-2xl shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Synthèse par IA</span>
                  {isStandardAnalysis && <Lock className="w-5 h-5 text-muted-foreground" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isStandardAnalysis ? (
                  <div className="relative">
                    <div className="blur-sm text-muted-foreground">
                      <p className="mb-4">
                        Votre photo de profil dégage une impression globalement positive avec un score de 7.6/10. 
                        Les utilisateurs apprécient particulièrement votre sourire naturel et votre expression confiante...
                      </p>
                      <p>
                        Pour optimiser votre profil, nous recommandons d'ajuster l'angle de prise de vue et de choisir un arrière-plan plus neutre...
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-card border rounded-xl p-6 text-center max-w-sm">
                        <Lock className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Synthèse verrouillée</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Révélez la synthèse de notre IA et nos conseils personnalisés.
                        </p>
                        <Button className="w-full">
                          <Gem className="w-4 h-4 mr-2" />
                          Débloquer avec 25 Crédits
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      Votre photo de profil dégage une impression globalement très positive avec un score de 8.2/10. 
                      Les utilisateurs apprécient particulièrement votre sourire naturel et votre expression confiante, 
                      qui transmettent une image accessible et authentique.
                    </p>
                    <p>
                      L'éclairage et la qualité de la photo sont excellents, ce qui contribue à créer une première 
                      impression favorable. Votre style vestimentaire est apprécié et correspond aux attentes de votre tranche d'âge.
                    </p>
                    <p>
                      Pour optimiser encore votre profil, nous recommandons d'ajuster légèrement l'angle de prise de vue 
                      pour éviter la contre-plongée et de choisir un arrière-plan plus neutre qui mettra davantage en valeur votre visage.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Points forts et faibles */}
            {!isStandardAnalysis && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="rounded-2xl shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                      <TrendingUp className="w-5 h-5" />
                      <span>Top 3 Points Forts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {topStrengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-600">
                      <TrendingDown className="w-5 h-5" />
                      <span>Points d'Amélioration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {topWeaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* CTA Services Experts */}
            {!isStandardAnalysis && (
              <Card className="rounded-2xl shadow-card bg-gradient-hero text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    Passez au niveau supérieur
                  </h3>
                  <p className="mb-6 opacity-90">
                    Obtenez un coaching personnalisé avec nos experts en séduction digitale
                  </p>
                  <Button variant="secondary" size="lg" className="rounded-xl">
                    Découvrir nos Services Experts
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisReport;