import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Upload, Search, Zap, Star, Users, TrendingUp } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Arrête de te mentir : <br />
              <span className="text-primary">ton profil est invisible.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Tu swipes, tu matches peu, tu reçois zéro vraie réponse, tu te demandes ce que tu rates alors que tu "essaies tout"… <strong>Stop.</strong> 
              Aura t'enlève tes œillères : diagnostic brutal, feedback par de vraies personnes de ta cible — et plan d'attaque clé-en-main.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-xl shadow-soft transition-smooth">
              Découvre enfin pourquoi tu stagnes — Obtiens ton rapport honnête
            </Button>
          </div>
        </div>
      </section>

      {/* Section Problème */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tu veux comprendre pourquoi tu n'intéresses personne… 
              <span className="text-destructive">mais personne ne te dit la vérité.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Ça te parle ? Tu vis l'un de ces scénarios ?
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              "Tu swipes dans le vide, un match par semaine (avec un bot).",
              "Tu doutes à chaque fois que tu postes une photo.",
              "Tu trouves ta bio nulle ou clichée, sans savoir comment l'améliorer.",
              "Tu te compares sans cesse, en accusant l'algorithme.",
              "Tu en as marre d'espérer, tu veux savoir."
            ].map((symptom, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-background rounded-xl border border-border shadow-card">
                <X className="text-destructive h-6 w-6 flex-shrink-0" />
                <p className="text-lg text-foreground">{symptom}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-10 py-4 text-lg font-semibold">
              Montre-moi ce qui cloche VRAIMENT avec mon profil
            </Button>
          </div>
        </div>
      </section>

      {/* Section Solution */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                <span className="text-primary">Aura</span> — le seul audit HONNÊTE de profil, 
                fait par des <span className="text-accent">VRAIES PERSONNES</span> qui osent te dire la vérité.
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Les IA, les amis complaisants, les likes aléatoires… <strong>STOP.</strong> Aura, c'est :
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 text-center bg-background border-border shadow-card">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Un diagnostic sans filtre</h3>
                <p className="text-muted-foreground">par des reviewers réels de ta cible.</p>
              </Card>
              <Card className="p-8 text-center bg-background border-border shadow-card">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Un rapport qui te montre</h3>
                <p className="text-muted-foreground">comment tu es réellement perçu.</p>
              </Card>
              <Card className="p-8 text-center bg-background border-border shadow-card">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Un plan d'action</h3>
                <p className="text-muted-foreground">pour éclater la compétition.</p>
              </Card>
            </div>

            {/* Mock-up visuel */}
            <div className="bg-background rounded-2xl p-8 shadow-card border border-border">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-destructive mb-2">4.2</div>
                  <div className="text-sm text-muted-foreground">AVANT</div>
                </div>
                <div className="text-6xl text-primary">→</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">8.5</div>
                  <div className="text-sm text-muted-foreground">APRÈS</div>
                </div>
              </div>
              <p className="text-center text-foreground mt-6 italic">
                "On m'a enfin expliqué pourquoi ma bio faisait fuir…"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
              Arrête les suppositions. Voici tes <span className="text-primary">3 armes</span> pour vraiment matcher.
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Audit sans complaisance</h3>
                <p className="text-muted-foreground mb-6">
                  Feedback radical par des vraies personnes. Découvre tes points forts ET ce qui fait fuir.
                </p>
                <p className="text-sm text-primary font-semibold italic">
                  "Tu veux plaire ? Commence par apprendre ce qui rebute."
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Zap className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Relifting de Bio</h3>
                <p className="text-muted-foreground mb-6">
                  Ta bio réécrite et validée par des experts. Repars avec une vraie arme, pas une phrase générique.
                </p>
                <p className="text-sm text-accent font-semibold italic">
                  "Tes photos font 80% du match. Ta bio fait 100% du close."
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Plan d'action</h3>
                <p className="text-muted-foreground mb-6">
                  Mini-plan concret, collé à TA cible, à appliquer en 10 minutes. Pas de blabla.
                </p>
                <p className="text-sm text-primary font-semibold italic">
                  "Un profil, c'est des likes ou rien. On ne te vendra pas de faux espoirs."
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-xl">
                Je veux un vrai diagnostic — maintenant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              <span className="text-primary">3 étapes.</span> 72h pour voir la différence.
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Upload</h3>
                <p className="text-muted-foreground">
                  Soumets tes photos et ta bio.<br />
                  <span className="text-sm">(1 minute, 100% confidentiel)</span>
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <Search className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Diagnostic</h3>
                <p className="text-muted-foreground">
                  De vraies personnes de ta cible analysent ton profil sans filtre.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Transformation</h3>
                <p className="text-muted-foreground">
                  Applique les conseils concrets et observe l'explosion de tes matchs.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg font-semibold text-primary mb-8">
                "Nos utilisateurs voient 2 à 4x plus de réponses en 7 jours."
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-lg font-semibold rounded-xl">
                Lancer mon diagnostic, rapport en 48h
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Réassurance & CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Témoignages */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">Ce qu'ils disent</h3>
                <div className="space-y-6">
                  <Card className="p-6 bg-background border-border shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Star className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-foreground mb-2">
                          "Zéro date en 2 mois. On m'a expliqué pourquoi. Le feedback était dur, mais ça a tout changé."
                        </p>
                        <p className="text-sm text-muted-foreground">- Marc A.</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-background border-border shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Star className="h-6 w-6 text-accent" />
                        </div>
                      </div>
                      <div>
                        <p className="text-foreground mb-2">
                          "Je croyais ma bio géniale, en fait elle faisait fuir. On m'a réécrit un vrai pitch, je n'ai jamais eu autant de matchs."
                        </p>
                        <p className="text-sm text-muted-foreground">- Sophie L.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Stats & Badges */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">Preuves & Garanties</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-xl font-bold text-foreground">+1200 profils audités</p>
                      <p className="text-sm text-muted-foreground">ce mois-ci</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-accent" />
                    <div>
                      <p className="text-xl font-bold text-foreground">+44% minimum</p>
                      <p className="text-sm text-muted-foreground">d'amélioration du taux de match</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  <Badge variant="secondary" className="px-4 py-2">
                    <Check className="h-4 w-4 mr-2" />
                    Reviewers Certifiés
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <Check className="h-4 w-4 mr-2" />
                    Feedback 100% Vérifié
                  </Badge>
                </div>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h4 className="font-bold text-foreground mb-2">Bonus :</h4>
                  <p className="text-muted-foreground">
                    Accède à nos guides exclusifs (photos, openers...) après ton rapport complet.
                  </p>
                </Card>
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center bg-background rounded-2xl p-12 shadow-card border border-border">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Passe de <span className="text-destructive">0</span> à <span className="text-primary">Héros</span>
              </h2>
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-primary-foreground px-16 py-8 text-xl font-bold rounded-xl shadow-soft transition-smooth mb-4">
                Je veux mon retour HONNÊTE
              </Button>
              <p className="text-muted-foreground">
                Sans bullshit. <strong>Maintenant.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;