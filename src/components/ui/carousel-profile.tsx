import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CarouselProfileProps {
  images: string[];
  className?: string;
  profileId?: number;
  profileName?: string;
}

export function CarouselProfile({ images, className, profileId, profileName }: CarouselProfileProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const { toast } = useToast();
  
  console.log("CarouselProfile rendered with images:", images?.length || 0);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum distance for swipe
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setTouchStart(null);
  };

  const handleReport = () => {
    // Logique de signalement
    const reportData = {
      profileId: profileId,
      profileName: profileName,
      imageIndex: currentImageIndex,
      imageUrl: images[currentImageIndex],
      timestamp: new Date().toISOString(),
      reason: 'Contenu inapproprié'
    };
    
    console.log('Signalement envoyé:', reportData);
    
    // Simuler l'envoi du signalement
    toast({
      title: "Signalement envoyé",
      description: `Le contenu de ${profileName || 'ce profil'} a été signalé avec succès.`,
    });
    
    // TODO: Ici vous pourriez envoyer les données vers votre backend
    // fetch('/api/reports', { method: 'POST', body: JSON.stringify(reportData) })
  };

  if (!images.length) return null;

  return (
    <div className={cn("relative group h-full", className)}>
      {/* Image principale */}
      <div 
        className="h-full bg-muted rounded-xl overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={images[currentImageIndex]} 
          alt={`Photo ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation - visible au survol */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        
        {/* Bouton de signalement */}
        <Button
          onClick={handleReport}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/70 text-white/70 hover:text-white rounded-full transition-all"
        >
          <Flag className="w-4 h-4" />
        </Button>
        
        {/* Barres de pagination */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-30" style={{ width: '90%' }}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-colors shadow-sm",
                  index === currentImageIndex 
                    ? "bg-white shadow-lg" 
                    : "bg-white/50 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}