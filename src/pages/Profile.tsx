import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User } from "lucide-react";

const profileSchema = z.object({
  gender: z.enum(['homme', 'femme', 'non-binaire', 'préfère-ne-pas-dire']).optional(),
  age: z.number().min(16, "L'âge minimum est de 16 ans").max(100, "L'âge maximum est de 100 ans").optional(),
  height: z.number().min(100, "La taille minimum est de 100 cm").max(250, "La taille maximum est de 250 cm").optional(),
  ethnic_origin: z.enum(['européenne', 'africaine', 'asiatique', 'hispanique', 'moyen-orientale', 'métisse', 'autre', 'préfère-ne-pas-dire']).optional(),
  religious_confession: z.enum(['christianisme', 'islam', 'judaisme', 'bouddhisme', 'hinduisme', 'athéisme', 'agnosticisme', 'autre', 'préfère-ne-pas-dire']).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Mock data for now - in a real app this would come from authentication
  const [credits] = useState(150);
  const [aura] = useState(3.5);
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: undefined,
      age: undefined,
      height: undefined,
      ethnic_origin: undefined,
      religious_confession: undefined,
    },
  });

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        // For now, using a temporary user ID since there's no auth system
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', 'temp-user-id')
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          form.reset({
            gender: data.gender || undefined,
            age: data.age || undefined,
            height: data.height || undefined,
            ethnic_origin: data.ethnic_origin || undefined,
            religious_confession: data.religious_confession || undefined,
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger votre profil",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [form, toast]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      // Convert string values to numbers for age and height
      const profileData = {
        user_id: 'temp-user-id',
        gender: data.gender,
        age: data.age,
        height: data.height,
        ethnic_origin: data.ethnic_origin,
        religious_confession: data.religious_confession,
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre profil",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} aura={aura} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            Mon Profil
          </h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles pour des analyses plus précises
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Ces informations nous aident à personnaliser vos analyses et à vous fournir des résultats plus pertinents
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Chargement...</span>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sexe</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez votre sexe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="homme">Homme</SelectItem>
                              <SelectItem value="femme">Femme</SelectItem>
                              <SelectItem value="non-binaire">Non-binaire</SelectItem>
                              <SelectItem value="préfère-ne-pas-dire">Préfère ne pas dire</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Âge</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="16"
                              max="100"
                              placeholder="Votre âge"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taille (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="100"
                              max="250"
                              placeholder="Votre taille en cm"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ethnic_origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Origine ethnique</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez votre origine" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="européenne">Européenne</SelectItem>
                              <SelectItem value="africaine">Africaine</SelectItem>
                              <SelectItem value="asiatique">Asiatique</SelectItem>
                              <SelectItem value="hispanique">Hispanique</SelectItem>
                              <SelectItem value="moyen-orientale">Moyen-orientale</SelectItem>
                              <SelectItem value="métisse">Métisse</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                              <SelectItem value="préfère-ne-pas-dire">Préfère ne pas dire</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="religious_confession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confession religieuse</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez votre confession" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="christianisme">Christianisme</SelectItem>
                              <SelectItem value="islam">Islam</SelectItem>
                              <SelectItem value="judaisme">Judaïsme</SelectItem>
                              <SelectItem value="bouddhisme">Bouddhisme</SelectItem>
                              <SelectItem value="hinduisme">Hindouisme</SelectItem>
                              <SelectItem value="athéisme">Athéisme</SelectItem>
                              <SelectItem value="agnosticisme">Agnosticisme</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                              <SelectItem value="préfère-ne-pas-dire">Préfère ne pas dire</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sauvegarde...
                        </>
                      ) : (
                        'Sauvegarder'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;