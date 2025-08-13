import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProfileProps {
  images: string[];
  className?: string;
}

export function CarouselProfile({ images, className }: CarouselProfileProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  if (!images.length) return null;

  return (
    <div className={cn("relative group", className)}>
      {/* Image principale */}
      <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden relative">
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
      </div>
      
      {/* Barres de pagination */}
      {images.length > 1 && (
        <div className="flex gap-1 mt-3 justify-center" style={{ width: '90%', margin: '12px auto 0' }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "flex-1 h-1 rounded-full transition-colors",
                index === currentImageIndex 
                  ? "bg-primary" 
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}