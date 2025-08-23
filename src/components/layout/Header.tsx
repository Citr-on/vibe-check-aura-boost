import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, SparklesIcon, GemIcon, UserIcon } from '@hugeicons/core-free-icons';
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  credits: number;
  aura: number;
}

export const Header = ({ credits, aura }: HeaderProps) => {
  const location = useLocation();

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

          {/* Navigation */}
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

            <Link to="/profile">
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarFallback>
                  <HugeiconsIcon icon={UserIcon} size={16} />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};