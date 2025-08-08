import React, { useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MiniGamesProps {
  onBump: (delta: number) => void;
}

const wouldYouRatherOptions = [
  ["marry a CS student", "marry a cat person"],
  ["share biryani", "share your Netflix password"],
  ["date someone who speaks in poetry", "date someone who only memes"],
];

const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

export const MiniGames: React.FC<MiniGamesProps> = ({ onBump }) => {
  const [wyrIndex, setWyrIndex] = useState(0);
  const [wyrChoice, setWyrChoice] = useState<string | null>(null);

  const [guessResult, setGuessResult] = useState<string | null>(null);

  const [horoscope, setHoroscope] = useState<string | null>(null);

  function nextWyr() {
    setWyrChoice(null);
    setWyrIndex((i) => (i + 1) % wouldYouRatherOptions.length);
  }

  function chooseWyr(opt: string) {
    setWyrChoice(opt);
    onBump(10 + Math.floor(Math.random() * 10));
  }

  function playGuess() {
    const correct = Math.random() < 0.5 ? "Poetry" : "Cricket";
    const pick = Math.random() < 0.33 ? correct : Math.random() < 0.5 ? "Cats" : "Gaming";
    const ok = pick === correct;
    setGuessResult(ok ? `Correct! They love ${correct}.` : `Oops, it was ${correct}.`);
    onBump(ok ? 12 : 6);
  }

  function readHoroscope() {
    const sign = signs[Math.floor(Math.random() * signs.length)];
    const lines = [
      `Today, ${sign} will find love in the snack aisle.`,
      `A mysterious chai invites destiny.`,
      `Your soulmate is allergic to accounting assignments.`,
    ];
    setHoroscope(`${sign}: ${lines[Math.floor(Math.random() * lines.length)]}`);
    onBump(8 + Math.floor(Math.random() * 12));
  }

  return (
    <Card className="border-accent/40">
      <CardHeader>
        <CardTitle className="font-display">Mini Games of Compatibility</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="wyr" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="wyr">Would You Rather</TabsTrigger>
            <TabsTrigger value="guess">Guess My Interest</TabsTrigger>
            <TabsTrigger value="horoscope">Love Horoscope</TabsTrigger>
          </TabsList>

          <TabsContent value="wyr" className="space-y-3">
            <p className="text-muted-foreground">Choose your destiny:</p>
            <div className="flex flex-wrap gap-3">
              {wouldYouRatherOptions[wyrIndex].map((opt) => (
                <Button key={opt} onClick={() => chooseWyr(opt)} variant="secondary" className="hover:animate-scale-in">
                  {opt}
                </Button>
              ))}
            </div>
            {wyrChoice && (
              <div className="text-sm text-foreground/80">Nice choice! Compatibility +{12}%. <Button variant="link" onClick={nextWyr}>Next</Button></div>
            )}
          </TabsContent>

          <TabsContent value="guess" className="space-y-3">
            <p className="text-muted-foreground">Pick what you think they love the most.</p>
            <div className="flex flex-wrap gap-3">
              {['Poetry','Cricket','Cats','Gaming'].map((opt) => (
                <Button key={opt} onClick={playGuess} variant="secondary">{opt}</Button>
              ))}
            </div>
            {guessResult && <p className="text-sm">{guessResult}</p>}
          </TabsContent>

          <TabsContent value="horoscope" className="space-y-3">
            <p className="text-muted-foreground">Let the stars (randomness) guide you.</p>
            <Button variant="heart" onClick={readHoroscope}>🔮 Read my fate</Button>
            {horoscope && <p className="text-sm">{horoscope}</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MiniGames;
