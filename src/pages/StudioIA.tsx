import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from '@hugeicons/react';
import { FlashIcon, Camera01Icon, Edit02Icon, CpuIcon } from '@hugeicons/core-free-icons';
import { Link } from "react-router-dom";

const StudioIA = () => {
  const [credits] = useState(150);
  const [aura] = useState(3.5);

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Le Studio IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vos outils pour transformer radicalement votre profil. Choisissez votre atelier.
          </p>
        </div>

        {/* Workshop Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Photo Retouching Workshop */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 flex flex-col rounded-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                <div className="relative">
                  <HugeiconsIcon icon={Camera01Icon} size={32} className="text-primary" />
                  <HugeiconsIcon icon={FlashIcon} size={16} className="text-accent absolute -top-1 -right-1" />
                </div>
              </div>
              <CardTitle className="text-2xl font-heading">Retouche Photo IA</CardTitle>
              <CardDescription className="text-base">
                Transformez vos photos standards en portraits de qualité professionnelle. 
                Améliorez la lumière, le cadrage et l'impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 mt-auto">
              <Link to="/studio-ia/retouche-photo">
                <Button className="w-full rounded-2xl" size="lg">
                  Ouvrir l'atelier
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Bio Generator Workshop */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 flex flex-col rounded-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                <div className="relative">
                  <HugeiconsIcon icon={Edit02Icon} size={32} className="text-primary" />
                  <HugeiconsIcon icon={CpuIcon} size={16} className="text-accent absolute -top-1 -right-1" />
                </div>
              </div>
              <CardTitle className="text-2xl font-heading">Générateur de Bio IA</CardTitle>
              <CardDescription className="text-base">
                Créez une bio percutante qui intrigue et donne envie de vous parler. 
                Fini le syndrome de la page blanche.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 mt-auto">
              <Link to="/studio-ia/generateur-bio">
                <Button className="w-full rounded-2xl" size="lg">
                  Ouvrir l'atelier
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">+247%</div>
              <div className="text-muted-foreground">d'amélioration moyenne du taux de match</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.4x</div>
              <div className="text-muted-foreground">plus de conversations engagées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">89%</div>
              <div className="text-muted-foreground">des utilisateurs voient des résultats en 48h</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudioIA;