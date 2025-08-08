import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";

interface LoveMeterProps {
  value: number; // 0 - 100
}

export const LoveMeter: React.FC<LoveMeterProps> = ({ value }) => {
  return (
    <Card className="bg-card/70 backdrop-blur-sm border-accent/40">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-xl">Love Meter</CardTitle>
        <Heart className="text-primary" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Progress value={value} className="flex-1" />
          <span className="text-sm font-semibold text-foreground/80 w-12 text-right">
            {Math.max(0, Math.min(100, Math.round(value)))}%
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          The more you play, match, and meme, the fuller it gets.
        </p>
      </CardContent>
    </Card>
  );
};

export default LoveMeter;
