import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HugeiconsIcon } from '@hugeicons/react';
import { MessageMultiple02Icon, BugIcon, SparklesIcon, BubbleChatQuestionIcon } from '@hugeicons/core-free-icons';
import { useToast } from "@/hooks/use-toast";

const FAQ = () => {
  const [feedbackType, setFeedbackType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du feedback
    setTimeout(() => {
      toast({
        title: "Feedback envoyé !",
        description: "Merci pour votre retour. Nous vous répondrons rapidement.",
      });
      setFeedbackType("");
      setSubject("");
      setMessage("");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  const faqData = [
    {
      question: "Comment fonctionne l'analyse d'attractivité ?",
      answer: "Notre IA analyse vos photos selon plusieurs critères objectifs comme la symétrie, l'harmonie des traits, et la qualité de l'image pour vous donner un score d'attractivité personnalisé."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Absolument. Vos photos sont chiffrées et automatiquement supprimées après analyse. Nous ne conservons aucune donnée personnelle de manière permanente."
    },
    {
      question: "Comment obtenir plus de crédits ?",
      answer: "Vous pouvez acheter des crédits supplémentaires via la page Crédits, ou en gagnant de l'Aura en donnant des avis sur d'autres profils."
    },
    {
      question: "Qu'est-ce que l'Aura ?",
      answer: "L'Aura est notre système de points que vous gagnez en participant à la communauté en donnant des avis. Plus vous participez, plus vous gagnez d'Aura."
    },
    {
      question: "Le Studio IA est-il inclus ?",
      answer: "Le Studio IA propose des fonctionnalités premium comme la retouche photo et la génération de bio. Certaines fonctions consomment des crédits."
    },
    {
      question: "Comment améliorer mon score ?",
      answer: "Notre IA vous donne des conseils personnalisés après chaque analyse. Suivez ces recommandations et utilisez nos outils du Studio IA pour optimiser vos photos."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header credits={150} aura={2340} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            FAQ & Feedback
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement des réponses à vos questions ou envoyez-nous vos suggestions d'amélioration.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={BubbleChatQuestionIcon} size={24} className="text-primary" />
                  Questions Fréquentes
                </CardTitle>
                <CardDescription>
                  Les réponses aux questions les plus courantes sur notre plateforme.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
            <Card className="rounded-2xl h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={SparklesIcon} size={24} className="text-accent" />
                  Votre Feedback
                </CardTitle>
                <CardDescription>
                  Aidez-nous à améliorer la plateforme en partageant vos idées.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <HugeiconsIcon icon={MessageMultiple02Icon} size={16} className="mr-2" />
                      Envoyer un feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Envoyer un feedback</DialogTitle>
                      <DialogDescription>
                        Partagez vos suggestions, signalez un bug ou posez une question.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitFeedback} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.email@exemple.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="feedback-type">Type de feedback</Label>
                        <Select value={feedbackType} onValueChange={setFeedbackType} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="suggestion">
                              <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={SparklesIcon} size={16} />
                                Suggestion d'amélioration
                              </div>
                            </SelectItem>
                            <SelectItem value="bug">
                              <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={BugIcon} size={16} />
                                Signaler un bug
                              </div>
                            </SelectItem>
                            <SelectItem value="question">
                              <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={MessageMultiple02Icon} size={16} />
                                Question
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subject">Sujet</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Résumé en quelques mots"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Décrivez votre feedback en détail..."
                          rows={4}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Vous pouvez aussi :</p>
                  <ul className="space-y-1">
                    <li>• Signaler un bug technique</li>
                    <li>• Proposer une nouvelle fonctionnalité</li>
                    <li>• Poser une question</li>
                    <li>• Partager votre expérience</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
};

export default FAQ;