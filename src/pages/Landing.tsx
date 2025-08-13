import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Upload, Search, Zap, Star, Users, TrendingUp, Eye, Brain, Shield, ChevronRight } from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [beforeAfterSlider, setBeforeAfterSlider] = useState([50]);
  
  const testimonials = [
    {
      name: "Lucas",
      text: "Mon score est passé de 3 à 8/10. J'ai triplé mes matchs en 2 semaines !",
      avatar: "L"
    },
    {
      name: "Emma", 
      text: "L'IA a transformé ma bio. Maintenant mes conversations sont vraiment engageantes.",
      avatar: "E"
    },
    {
      name: "Thomas",
      text: "Incroyable ! Les conseils de la communauté + l'IA = combo parfait.",
      avatar: "T"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold text-primary">Aura</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Connexion</Button>
            <Button>S'inscrire</Button>
          </div>
        </div>
      </header>

      {/* Section 1: HERO */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Ton profil peut te rapporter <span className="text-primary">2x plus de matchs.</span> On te le prouve.
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Aura combine l'avis honnête de milliers de personnes et la puissance de l'IA pour révéler le vrai potentiel de ton profil.
          </p>
          
          <Card className="max-w-lg mx-auto p-8 bg-accent/50 border-2 border-primary/20">
            <CardContent className="space-y-6 p-0">
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/60 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Uploade ta meilleure (ou pire) photo ici</p>
                <Input type="file" className="hidden" />
              </div>
              <Button size="lg" className="w-full">
                Lancer mon Analyse Gratuite
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 2: LA PREUVE */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            D'une photo ignorée à une conversation engagée.
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-xl">
              <div className="flex">
                <div 
                  className="relative transition-all duration-300"
                  style={{ width: `${beforeAfterSlider[0]}%` }}
                >
                  <div className="aspect-square bg-gray-300 relative">
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive">Score Aura : 4/10</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Badge variant="outline">Gêné</Badge>
                      <Badge variant="outline">Mauvais éclairage</Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                      Photo Avant
                    </div>
                  </div>
                </div>
                <div 
                  className="relative flex-1 transition-all duration-300"
                  style={{ width: `${100 - beforeAfterSlider[0]}%` }}
                >
                  <div className="aspect-square bg-green-200 relative">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600">Score Aura : 9/10</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">Corrigée par l'IA</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Badge variant="outline">Charismatique</Badge>
                      <Badge variant="outline">Photo pro</Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                      Photo Après
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-x-0 bottom-4 px-4">
                <Slider
                  value={beforeAfterSlider}
                  onValueChange={setBeforeAfterSlider}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: LA MÉTHODE */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Notre méthode : Humain + IA + Preuve.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analyse</h3>
              <p className="text-muted-foreground">
                Obtiens des dizaines d'avis anonymes et honnêtes sur tes points forts et faibles grâce à notre communauté.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Optimisation</h3>
              <p className="text-muted-foreground">
                Notre Studio IA génère de nouvelles photos et bios basées sur les retours pour maximiser ton potentiel.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Validation</h3>
              <p className="text-muted-foreground">
                Fais ré-évaluer ton nouveau profil pour voir ton score augmenter et prouver concrètement l'efficacité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: LA RÉASSURANCE */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Des milliers de profils déjà transformés.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <span className="font-semibold">{testimonial.name}</span>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+500 000</div>
              <p className="text-muted-foreground">reviews délivrées</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+10 000</div>
              <p className="text-muted-foreground">utilisateurs actifs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+35%</div>
              <p className="text-muted-foreground">de matchs en moyenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: L'OFFRE INTELLIGENTE */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Un modèle juste, qui récompense l'action.
          </h2>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
              Aura fonctionne avec deux monnaies : les <strong>Crédits</strong> pour la puissance de l'IA, et l'<strong>Aura</strong> que vous gagnez en participant. 
              Nous sommes tellement sûrs de nos résultats que nous investissons avec vous : 
              <strong> utilisez notre IA pour générer une photo, et obtenez une réduction massive pour la faire évaluer par la communauté.</strong>
            </p>
            
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <Star className="h-5 w-5 mr-2" />
              -50% sur votre review
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ & CTA Final */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Vos questions, nos réponses.
          </h2>
          
          <div className="max-w-3xl mx-auto mb-16">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Mon anonymat est-il garanti ?</AccordionTrigger>
                <AccordionContent>
                  Absolument ! Toutes les évaluations sont anonymes et vos données personnelles ne sont jamais partagées avec la communauté.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Mes données et photos sont-elles en sécurité ?</AccordionTrigger>
                <AccordionContent>
                  Vos données sont chiffrées et stockées de manière sécurisée. Vous gardez le contrôle total sur vos photos et pouvez les supprimer à tout moment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Comment fonctionnent les Crédits et l'Aura ?</AccordionTrigger>
                <AccordionContent>
                  Les Crédits permettent d'utiliser l'IA. L'Aura se gagne en participant aux évaluations communautaires et peut être convertie en Crédits.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="bg-primary text-primary-foreground rounded-xl p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à voir ton vrai potentiel ?</h3>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.querySelector('h1')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lancer mon Analyse Gratuite
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-background border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary"></div>
                <span className="text-xl font-bold text-primary">Aura</span>
              </div>
              <p className="text-muted-foreground">Révèle ton vrai potentiel</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-foreground">Tarifs</a></li>
                <li><a href="#" className="hover:text-foreground">Comment ça marche ?</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">CGU</a></li>
                <li><a href="#" className="hover:text-foreground">Politique de Confidentialité</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">X</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;