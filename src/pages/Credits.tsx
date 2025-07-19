import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gem, Sparkles, Check, Star, Users, MessageSquare } from "lucide-react";

const Credits = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);

  const creditPacks = [
    {
      id: 'starter',
      credits: 500,
      price: 9.99,
      popular: false,
      savings: null
    },
    {
      id: 'popular',
      credits: 1200,
      price: 19.99,
      popular: true,
      savings: '17%'
    },
    {
      id: 'premium',
      credits: 2500,
      price: 39.99,
      popular: false,
      savings: '33%'
    }
  ];

  const expertServices = [
    {
      id: 'photo-coaching',
      title: 'Coaching Photo Personnel',
      description: 'Session 1h avec un expert pour optimiser vos photos',
      price: 49,
      features: [
        'Analyse détaillée de votre profil complet',
        'Conseils personnalisés sur vos photos',
        'Recommandations de nouvelles photos à prendre',
        'Session de 60 minutes en visioconférence'
      ]
    },
    {
      id: 'profile-makeover',
      title: 'Refonte Complète de Profil',
      description: 'Transformation complète de votre profil par nos experts',
      price: 99,
      features: [
        'Réécriture professionnelle de votre bio',
        'Sélection et optimisation de 5-8 photos',
        'Stratégie de conversation personnalisée',
        'Suivi pendant 2 semaines'
      ]
    },
    {
      id: 'vip-coaching',
      title: 'Coaching VIP Mensuel',
      description: 'Accompagnement premium sur un mois complet',
      price: 199,
      features: [
        'Tout inclus des autres services',
        'Coaching illimité pendant 30 jours',
        'Analyse de vos conversations',
        'Optimisation continue du profil'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Obtenir des Crédits ou des Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accédez aux analyses premium et aux services d'experts pour maximiser vos chances de succès
          </p>
        </div>

        {/* Packs de Crédits */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Packs de Crédits
            </h2>
            <p className="text-muted-foreground">
              Achetez des crédits pour débloquer les analyses premium et l'IA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {creditPacks.map((pack) => (
              <Card 
                key={pack.id} 
                className={`rounded-2xl shadow-card relative ${
                  pack.popular ? 'border-primary shadow-soft' : ''
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground rounded-full px-4 py-1">
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <Gem className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-heading">
                    {pack.credits.toLocaleString()} Crédits
                  </CardTitle>
                  <div className="text-3xl font-bold text-foreground">
                    {pack.price}€
                  </div>
                  {pack.savings && (
                    <Badge variant="outline" className="rounded-full">
                      Économisez {pack.savings}
                    </Badge>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button 
                    className={`w-full rounded-xl ${
                      pack.popular ? 'bg-primary hover:bg-primary/90' : ''
                    }`}
                    variant={pack.popular ? 'default' : 'outline'}
                  >
                    Acheter maintenant
                  </Button>
                  
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    ≈ {Math.floor(pack.credits / 25)} analyses premium
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>
                <strong>Note importante :</strong> L'Aura ✨ ne peut être que gagnée en participant à la communauté, 
                elle ne peut pas être achetée.
              </span>
            </div>
          </div>
        </section>

        {/* Services Experts */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Services Experts
            </h2>
            <p className="text-muted-foreground">
              Bénéficiez de l'expertise de nos coachs en séduction digitale
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {expertServices.map((service) => (
              <Card key={service.id} className="rounded-2xl shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-accent" />
                    <Badge variant="outline" className="rounded-full">Expert</Badge>
                  </div>
                  <CardTitle className="text-xl font-heading">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="text-2xl font-bold text-foreground">
                    {service.price}€
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full rounded-xl" variant="outline">
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="rounded-2xl shadow-card bg-gradient-hero text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Users className="w-6 h-6" />
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Rejoignez la communauté Aura
                </h3>
                <p className="mb-6 opacity-90">
                  Accédez à notre groupe Discord privé avec plus de 2,000 membres actifs
                </p>
                <Button variant="secondary" size="lg" className="rounded-xl">
                  Rejoindre gratuitement
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Credits;