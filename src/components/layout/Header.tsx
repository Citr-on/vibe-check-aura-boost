import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Sparkles, Gem } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import insigneAura from "@/assets/insigne-aura.png";
import insigneLogotypeAura from "@/assets/insigne-logotype-aura.png";

interface HeaderProps {
  credits: number;
  aura: number;
}

export const Header = ({ credits, aura }: HeaderProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {isMobile ? (
              <img 
                src={insigneAura} 
                alt="Aura" 
                className="h-8 w-8 object-contain"
              />
            ) : (
              <img 
                src={insigneLogotypeAura} 
                alt="Aura" 
                className="h-8 object-contain"
              />
            )}
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
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{aura} Aura</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1 text-foreground">
                <Gem className="w-4 h-4 text-primary" />
                <span>{credits} Crédits</span>
              </div>
            </div>
            
            <Link to="/credits">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </Link>

            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};