import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from '@hugeicons/react';
import { GemIcon, SparklesIcon, Tick01Icon, StarIcon, UserIcon, MessageMultiple02Icon, TimeQuarterPassIcon, Target02Icon, AlbumNotFound02Icon, Profile02Icon, AiEditingIcon } from '@hugeicons/core-free-icons';
const Credits = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  const creditPacks = [{
    id: 'starter',
    credits: 500,
    price: 9.99,
    popular: false,
    savings: null
  }, {
    id: 'popular',
    credits: 1200,
    price: 19.99,
    popular: true,
    savings: '17%'
  }, {
    id: 'premium',
    credits: 2500,
    price: 39.99,
    popular: false,
    savings: '33%'
  }];
  const expertServices = [{
    id: 'photo-coaching',
    title: 'Coaching Photo Personnel',
    description: 'Session 1h avec un expert pour optimiser vos photos',
    price: 49,
    features: ['Analyse détaillée de votre profil complet', 'Conseils personnalisés sur vos photos', 'Recommandations de nouvelles photos à prendre', 'Session de 60 minutes en visioconférence']
  }, {
    id: 'profile-makeover',
    title: 'Refonte Complète de Profil',
    description: 'Transformation complète de votre profil par nos experts',
    price: 99,
    features: ['Réécriture professionnelle de votre bio', 'Sélection et optimisation de 5-8 photos', 'Stratégie de conversation personnalisée', 'Suivi pendant 2 semaines']
  }, {
    id: 'vip-coaching',
    title: 'Coaching VIP Mensuel',
    description: 'Accompagnement premium sur un mois complet',
    price: 199,
    features: ['Tout inclus des autres services', 'Coaching illimité pendant 30 jours', 'Analyse de vos conversations', 'Optimisation continue du profil']
  }];
  return <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Obtenez des Crédits
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Débloquez la voie rapide vers un profil irrésistible.
          </p>
          
          {/* Grille des avantages */}
          <div className="bg-primary/10 rounded-2xl-smooth p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Colonne 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HugeiconsIcon icon={TimeQuarterPassIcon} size={48} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Coupez la file.</h3>
                <p className="text-sm text-muted-foreground">Votre contenu est analysé en priorité.</p>
              </div>
              
              {/* Colonne 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HugeiconsIcon icon={Target02Icon} size={48} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Éliminez le doute.</h3>
                <p className="text-sm text-muted-foreground">Recevez plus d'avis pour un verdict incontestable.</p>
              </div>
              
              {/* Colonne 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HugeiconsIcon icon={AlbumNotFound02Icon} size={48} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">L'Accès Direct.</h3>
                <p className="text-sm text-muted-foreground">Obtenez vos analyses sans évaluer les autres.</p>
              </div>
              
              {/* Colonne 4 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HugeiconsIcon icon={Profile02Icon} size={48} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">La Vue d'Ensemble.</h3>
                <p className="text-sm text-muted-foreground">Faites analyser vos photos ET votre bio.</p>
              </div>
              
              {/* Colonne 5 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HugeiconsIcon icon={AiEditingIcon} size={48} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Le Boost IA.</h3>
                <p className="text-sm text-muted-foreground">Améliorez votre profil en un seul clic.</p>
              </div>
            </div>
          </div>
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
            {creditPacks.map(pack => <Card key={pack.id} className={`rounded-2xl-smooth shadow-card relative ${pack.popular ? 'border-primary shadow-soft' : ''}`}>
                {pack.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground rounded-full px-4 py-1">
                      Le plus populaire
                    </Badge>
                  </div>}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <HugeiconsIcon icon={GemIcon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-heading">
                    {pack.credits.toLocaleString()} Crédits
                  </CardTitle>
                  <div className="text-3xl font-bold text-foreground">
                    {pack.price}€
                  </div>
                  {pack.savings && <Badge variant="outline" className="rounded-full">
                      Économisez {pack.savings}
                    </Badge>}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button className={`w-full rounded-xl-smooth ${pack.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={pack.popular ? 'default' : 'outline'}>
                    Acheter maintenant
                  </Button>
                  
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    ≈ {Math.floor(pack.credits / 25)} analyses premium
                  </div>
                </CardContent>
              </Card>)}
          </div>

          <div className="bg-muted/50 rounded-xl-smooth p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <HugeiconsIcon icon={SparklesIcon} size={16} className="text-accent" />
              <span>
                <strong>Note importante :</strong> L'Aura ✨ ne peut être que gagnée en participant à la communauté, 
                elle ne peut pas être achetée.
              </span>
            </div>
          </div>
        </section>

        {/* Services Experts */}
        
      </main>
    </div>;
};
export default Credits;