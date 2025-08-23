import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, SparklesIcon, GemIcon, UserIcon, Menu01Icon, DashboardSquare01Icon, AiInnovation01Icon, ThumbsUpIcon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface HeaderProps {
  credits: number;
  aura: number;
}

export const Header = ({ credits, aura }: HeaderProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={SparklesIcon} size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">Aura</span>
          </Link>

          {/* Navigation - Desktop */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/dashboard" 
                className={`font-body transition-colors hover:text-primary ${
                  isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Mes Analyses
              </Link>
              <Link 
                to="/studio-ia" 
                className={`font-body transition-colors hover:text-primary ${
                  isActive('/studio-ia') ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Studio IA
              </Link>
              <Link 
                to="/review" 
                className={`font-body transition-colors hover:text-primary ${
                  isActive('/review') ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Donner un avis
              </Link>
            </nav>
          )}

          {/* Mobile Menu Burger */}
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <HugeiconsIcon icon={Menu01Icon} size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${
                      isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HugeiconsIcon icon={DashboardSquare01Icon} size={20} />
                    <span>Mes Analyses</span>
                  </Link>
                  <Link 
                    to="/studio-ia" 
                    className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${
                      isActive('/studio-ia') ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HugeiconsIcon icon={AiInnovation01Icon} size={20} />
                    <span>Studio IA</span>
                  </Link>
                  <Link 
                    to="/review" 
                    className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${
                      isActive('/review') ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HugeiconsIcon icon={ThumbsUpIcon} size={20} />
                    <span>Donner un avis</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${
                      isActive('/profile') ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HugeiconsIcon icon={UserIcon} size={20} />
                    <span>Profil</span>
                  </Link>
                  <hr className="border-border" />
                  <Link 
                    to="/faq" 
                    className="flex items-center space-x-3 font-body transition-colors hover:text-primary text-muted-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HugeiconsIcon icon={InformationCircleIcon} size={20} />
                    <span>Feedback & FAQ</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Balance & Profile */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm font-medium">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <HugeiconsIcon icon={SparklesIcon} size={16} className="text-accent" />
                <span>{aura} Aura</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1 text-foreground">
                <HugeiconsIcon icon={GemIcon} size={16} className="text-primary" />
                <span>{credits} Crédits</span>
              </div>
            </div>
            
            <Link to="/credits">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                <HugeiconsIcon icon={PlusSignIcon} size={16} />
              </Button>
            </Link>

            {!isMobile && (
              <Link to="/profile">
                <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                  <AvatarFallback>
                    <HugeiconsIcon icon={UserIcon} size={16} />
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};