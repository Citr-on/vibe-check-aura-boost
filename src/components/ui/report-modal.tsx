import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const reportMotifs = [
  {
    category: "Contenu Inapproprié ou Dangereux",
    description: "Contenu à caractère sexuel, violent ou préjudiciable",
    items: [
      { value: "explicit", label: "Contenu sexuellement explicite ou nudité" },
      { value: "hate", label: "Discours haineux ou harcèlement" },
      { value: "violence", label: "Violence ou contenu choquant" },
      { value: "minor", label: "Photo/Profil d'une personne mineure" },
    ]
  },
  {
    category: "Spam et Authenticité",
    description: "Profils frauduleux ou tentatives de manipulation",
    items: [
      { value: "spam", label: "Spam, publicité ou arnaque" },
      { value: "fake", label: "Usurpation d'identité ou faux profil" },
    ]
  },
  {
    category: "Qualité et Pertinence",
    description: "Photos inappropriées pour un profil de rencontre",
    items: [
      { value: "irrelevant", label: "Contenu non pertinent" },
    ]
  },
  {
    category: "Autre",
    description: "Problème non listé ci-dessus",
    items: [
      { value: "other", label: "Autre chose" },
    ]
  }
];

const createReportSchema = (selectedReason: string) => z.object({
  reason: z.string().min(1, "Veuillez sélectionner un motif"),
  description: selectedReason === 'other' 
    ? z.string().min(1, "Veuillez décrire le problème")
    : z.string().optional(),
});

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId?: string | number;
  profileName?: string;
  imageIndex?: number;
  imageUrl?: string;
}

export function ReportModal({ 
  open, 
  onOpenChange, 
  profileId, 
  profileName, 
  imageIndex, 
  imageUrl 
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const { toast } = useToast();

  const reportSchema = createReportSchema(selectedReason);
  
  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof reportSchema>) => {
    const reportData = {
      profileId,
      profileName,
      imageIndex,
      imageUrl,
      reason: values.reason,
      description: values.description,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Signalement envoyé:', reportData);
    
    toast({
      title: "Signalement envoyé",
      description: `Le contenu de ${profileName || 'ce profil'} a été signalé avec succès.`,
    });
    
    // Reset form and close modal
    form.reset();
    setSelectedReason('');
    onOpenChange(false);
    
    // TODO: Envoyer les données vers le backend
    // fetch('/api/reports', { method: 'POST', body: JSON.stringify(reportData) })
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Signaler ce contenu</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Aidez-nous à maintenir une communauté sûre et respectueuse. Votre signalement est confidentiel.
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quelle est la raison principale de votre signalement ?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedReason(value);
                      }}
                      value={field.value}
                      className="space-y-2"
                    >
                      <Accordion type="multiple" className="w-full">
                        {reportMotifs.filter(category => category.category !== "Autre").map((category, categoryIndex) => (
                          <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`}>
                            <AccordionTrigger className="text-sm font-medium text-left">
                              <div className="flex flex-col items-start">
                                <span>{category.category}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                  {category.description}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 pl-2">
                                {category.items.map((item) => (
                                  <div key={item.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={item.value} id={item.value} />
                                    <FormLabel
                                      htmlFor={item.value}
                                      className="text-sm font-normal cursor-pointer"
                                    >
                                      {item.label}
                                    </FormLabel>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      
                      {/* Option "Autre" en dehors de l'accordéon */}
                      <div className="pt-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <FormLabel
                            htmlFor="other"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Autre chose
                          </FormLabel>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6 mt-1">
                          Problème non listé ci-dessus
                        </p>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={
                        selectedReason === 'other'
                          ? "Expliquez-nous quel est le problème"
                          : "Voulez-vous nous en dire plus ? (facultatif)"
                      }
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" className="w-full" disabled={!form.watch('reason')}>
                Envoyer le signalement
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}