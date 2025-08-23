import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RatingGaugeProps {
  value: number;
  onChange: (value: number) => void;
  icon: React.ReactNode;
  label: string;
  color: string;
  labels: string[];
  tooltipText: string;
  className?: string;
}

export const RatingGauge: React.FC<RatingGaugeProps> = ({
  value,
  onChange,
  icon,
  label,
  color,
  labels,
  tooltipText,
  className
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const gaugeRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (segmentValue: number, event: React.MouseEvent) => {
    setHoveredValue(segmentValue);
    const rect = gaugeRef.current?.getBoundingClientRect();
    if (rect) {
      setHoverPosition({
        x: event.clientX - rect.left,
        y: -30
      });
    }
    
    // Start timeout for tooltip
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 1200);
  };

  const handleMouseLeave = () => {
    setHoveredValue(null);
    setShowTooltip(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleClick = (segmentValue: number) => {
    onChange(segmentValue);
    setShowTooltip(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = gaugeRef.current?.getBoundingClientRect();
    if (rect) {
      setHoverPosition({
        x: event.clientX - rect.left,
        y: -30
      });
    }
    
    // Reset tooltip timer on movement
    if (showTooltip) {
      setShowTooltip(false);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const displayValue = hoveredValue !== null ? hoveredValue : value;
  const currentLabel = labels[displayValue - 1] || "";

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center space-x-2 font-medium w-24">
        {icon}
        <span>{label}</span>
      </div>
      
      <div className="flex items-center space-x-3 flex-1">
        <TooltipProvider>
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <div 
                ref={gaugeRef}
                className="relative flex-1 flex rounded-full border border-border overflow-hidden bg-muted h-8"
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                {[0, 1, 2, 3, 4].map((segmentIndex) => {
                  const segmentValue = segmentIndex + 1;
                  const isSelected = value >= segmentValue;
                  const isHovered = hoveredValue !== null && hoveredValue >= segmentValue;
                  
                  return (
                    <div
                      key={segmentIndex}
                      className={cn(
                        "flex-1 cursor-pointer transition-colors duration-200 flex items-center justify-center",
                        segmentIndex > 0 && "border-l border-border",
                        (isSelected || isHovered) ? "text-white" : "text-muted-foreground"
                      )}
                      style={{
                        backgroundColor: isSelected ? color : (isHovered ? color : undefined),
                        opacity: isSelected ? 1 : (isHovered ? 0.5 : 1)
                      }}
                      onMouseEnter={(e) => handleMouseEnter(segmentValue, e)}
                      onClick={() => handleClick(segmentValue)}
                    />
                  );
                })}
                
                {/* Hover label */}
                {hoveredValue !== null && (
                  <div 
                    className="absolute bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none z-10"
                    style={{
                      left: hoverPosition.x,
                      top: hoverPosition.y,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {labels[hoveredValue - 1]}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-80">
              <p className="text-sm">{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <span className="text-sm text-muted-foreground w-fit ml-auto">
          {currentLabel}
        </span>
      </div>
    </div>
  );
};