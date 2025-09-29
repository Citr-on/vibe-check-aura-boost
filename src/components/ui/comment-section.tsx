import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { HugeiconsIcon } from '@hugeicons/react';
import { FavouriteIcon, Monocle01Icon } from '@hugeicons/core-free-icons';

interface CommentSectionProps {
  positiveComment: string;
  setPositiveComment: (value: string) => void;
  improvementComment: string;
  setImprovementComment: (value: string) => void;
  positiveChips: { label: string; text: string }[];
  improvementChips: { label: string; text: string }[];
}

export const CommentSection = ({
  positiveComment,
  setPositiveComment,
  improvementComment,
  setImprovementComment,
  positiveChips,
  improvementChips
}: CommentSectionProps) => {
  const [activeSection, setActiveSection] = useState<"positive" | "improvement" | null>(null);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Commentaire <span className="font-normal text-muted-foreground">(facultatif)</span></h4>
      
      {/* Section J'aime */}
      <div className="border border-border rounded-xl-smooth overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === "positive" ? null : "positive")}
          className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 transition-colors"
        >
          <HugeiconsIcon icon={FavouriteIcon} size={20} className="text-green-500 shrink-0" />
          <span className="text-sm font-medium">J'aime</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {activeSection === "positive" ? "−" : "+"}
          </span>
        </button>
        
        {activeSection === "positive" && (
          <div className="p-3 border-t border-border bg-muted/20">
            <Textarea
              value={positiveComment}
              onChange={(e) => setPositiveComment(e.target.value)}
              placeholder="Ce que j'aime le plus..."
              className="resize-none rounded-lg-smooth mb-2"
              rows={2}
            />
            <div className="flex flex-wrap gap-1">
              {positiveChips.slice(0, 3).map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setPositiveComment(chip.text)}
                  className="px-2 py-1 text-xs rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section Conseil */}
      <div className="border border-border rounded-xl-smooth overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === "improvement" ? null : "improvement")}
          className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 transition-colors"
        >
          <HugeiconsIcon icon={Monocle01Icon} size={20} className="text-blue-500 shrink-0" />
          <span className="text-sm font-medium">Conseil</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {activeSection === "improvement" ? "−" : "+"}
          </span>
        </button>
        
        {activeSection === "improvement" && (
          <div className="p-3 border-t border-border bg-muted/20">
            <Textarea
              value={improvementComment}
              onChange={(e) => setImprovementComment(e.target.value)}
              placeholder="Un conseil pour améliorer..."
              className="resize-none rounded-lg-smooth mb-2"
              rows={2}
            />
            <div className="flex flex-wrap gap-1">
              {improvementChips.slice(0, 3).map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setImprovementComment(chip.text)}
                  className="px-2 py-1 text-xs rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};