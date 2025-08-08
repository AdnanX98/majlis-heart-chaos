import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import HeartConfetti from "./HeartConfetti";

import { FakeProfile } from "./ProfileForm";

interface MatchDeckProps {
  profiles: FakeProfile[];
  filters: { likesBiryaniOnly: boolean; hatesAccountingOnly: boolean };
  onMatch: (p: FakeProfile) => void;
}

export const MatchDeck: React.FC<MatchDeckProps> = ({ profiles, filters, onMatch }) => {
  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      if (filters.likesBiryaniOnly && !p.likesBiryani) return false;
      if (filters.hatesAccountingOnly && !p.hatesAccounting) return false;
      return true;
    });
  }, [profiles, filters]);

  const [index, setIndex] = useState(0);
  const [burstId, setBurstId] = useState(0);

  const current = filtered[index];

  function next() {
    setIndex((i) => (i + 1) % Math.max(1, filtered.length));
  }

  function playLoveJingle() {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [392, 523, 659]; // G4, C5, E5
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      o.type = "sine";
      o.connect(g);
      g.connect(ctx.destination);
      const t = ctx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.start(t);
      o.stop(t + 0.26);
    });
  }

  function handleMatch() {
    if (!current) return;
    onMatch(current);
    setBurstId((b) => b + 1);
    playLoveJingle();
    toast({
      title: "It's a match!",
      description: `${current.name} felt a mysterious pull towards you. 💘`,
    });
    next();
  }

  function handleSkip() {
    next();
  }

  if (!filtered.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Match Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No profiles yet. Create one above and start the chaos!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      <HeartConfetti burstId={burstId} />
      <Card className="overflow-hidden border-accent/40">
        <CardHeader>
          <CardTitle className="font-display">Match Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          {current && (
            <article className="grid gap-4 sm:grid-cols-[240px,1fr] items-center">
              <div className="aspect-square w-full rounded-lg overflow-hidden border">
                <img
                  src={current.imageUrl || "/placeholder.svg"}
                  alt={`Profile of ${current.name} — Majlis Matrimony card`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display">{current.name}, {current.age}</h3>
                <p className="text-muted-foreground">Major: {current.major}</p>
                {current.favoriteSnack && (
                  <p className="text-muted-foreground">Snack soulmate: {current.favoriteSnack}</p>
                )}
                {current.weirdHabit && (
                  <p className="text-muted-foreground">Weird habit: {current.weirdHabit}</p>
                )}
                {!!current.interests?.length && (
                  <p className="text-muted-foreground">Interests: {current.interests.join(", ")}</p>
                )}
                {current.romanticPref && (
                  <p className="text-muted-foreground">Pref: {current.romanticPref}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleMatch} variant="heart">❤️ Match</Button>
                  <Button onClick={handleSkip} variant="outline">💔 Skip</Button>
                </div>
              </div>
            </article>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchDeck;
