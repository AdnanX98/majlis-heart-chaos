import React, { useMemo, useState } from "react";
import heroImage from "@/assets/hero/majlis-hero-couple.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ProfileForm, FakeProfile } from "@/components/ProfileForm";
import MatchDeck from "@/components/MatchDeck";
import LoveMeter from "@/components/LoveMeter";
import MiniGames from "@/components/MiniGames";
import MemeGenerator from "@/components/MemeGenerator";
import Gallery from "@/components/Gallery";
import RandomSoulmate from "@/components/RandomSoulmate";

const seedProfiles: FakeProfile[] = [
  {
    id: "p1",
    name: "Aisha",
    age: 21,
    major: "English",
    favoriteSnack: "Biryani",
    weirdHabit: "Names every plant in the hostel",
    interests: ["Poetry", "Cats", "Chai"],
    romanticPref: "Loves cats more than humans",
    likesBiryani: true,
    hatesAccounting: true,
  },
  {
    id: "p2",
    name: "Faiz",
    age: 22,
    major: "CS",
    favoriteSnack: "Samosa",
    weirdHabit: "Talks to his laptop before exams",
    interests: ["Gaming", "Cricket", "Memes"],
    romanticPref: "Needs Wi-Fi and warm chai",
    likesBiryani: false,
    hatesAccounting: true,
  },
];

const Index = () => {
  const [profiles, setProfiles] = useState<FakeProfile[]>(seedProfiles);
  const [likesBiryaniOnly, setLikesBiryaniOnly] = useState(false);
  const [hatesAccountingOnly, setHatesAccountingOnly] = useState(false);
  const [love, setLove] = useState(12);
  const [gallery, setGallery] = useState<string[]>([]);

  function addProfile(p: FakeProfile) {
    setProfiles((prev) => [p, ...prev]);
    setLove((v) => Math.min(100, v + 8 + Math.floor(Math.random() * 10)));
  }

  function onMatch(p: FakeProfile) {
    setLove((v) => Math.min(100, v + 15 + Math.floor(Math.random() * 10)));
  }

  const filters = useMemo(() => ({ likesBiryaniOnly, hatesAccountingOnly }), [likesBiryaniOnly, hatesAccountingOnly]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden">
        <img src={heroImage} alt="Romantic couple silhouette with floating hearts" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="relative z-10">
          <nav className="container flex items-center justify-between py-4">
            <a href="#home" className="font-display text-2xl story-link">Majlis Matrimony</a>
            <div className="hidden sm:flex items-center gap-3">
              <a href="#profiles" className="story-link">Profiles</a>
              <a href="#matches" className="story-link">Matches</a>
              <a href="#games" className="story-link">Games</a>
              <a href="#memes" className="story-link">Memes</a>
            </div>
            <RandomSoulmate />
          </nav>

          <section className="container grid gap-6 py-16 sm:py-24">
            <h1 className="font-display text-4xl sm:text-6xl leading-tight max-w-3xl">
              Majlis Matrimony — a lovingly useless matchmaking playground
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Make fake profiles, swipe silly matches, play romantic mini games, and create memes for the ages. No data stored. Just heart-shaped chaos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="heart">Start Matching</Button>
              <a href="#memes"><Button variant="secondary">Open Meme Lab</Button></a>
            </div>
          </section>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" aria-hidden="true" />
      </header>

      <main className="container grid gap-10 py-10" id="home">
        {/* Love Meter */}
        <section aria-labelledby="meter">
          <h2 id="meter" className="sr-only">Love Meter</h2>
          <LoveMeter value={love} />
        </section>

        {/* Profile Creator */}
        <section id="profiles" aria-labelledby="create-profile" className="scroll-mt-20">
          <h2 id="create-profile" className="font-display text-3xl mb-4">💌 Fake Profile Generator</h2>
          <ProfileForm onCreate={addProfile} />
        </section>

        {/* Filters + Matches */}
        <section id="matches" aria-labelledby="match-cards" className="scroll-mt-20">
          <h2 id="match-cards" className="font-display text-3xl mb-3">💞 Match Suggestion Cards</h2>
          <Card className="p-4 flex flex-wrap items-center gap-6 border-accent/40">
            <div className="flex items-center gap-3">
              <Switch id="f1" checked={likesBiryaniOnly} onCheckedChange={(v) => setLikesBiryaniOnly(Boolean(v))} />
              <Label htmlFor="f1">Only people who like biryani</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="f2" checked={hatesAccountingOnly} onCheckedChange={(v) => setHatesAccountingOnly(Boolean(v))} />
              <Label htmlFor="f2">Majors who hate accounting</Label>
            </div>
          </Card>
          <div className="mt-4">
            <MatchDeck profiles={profiles} filters={filters} onMatch={onMatch} />
          </div>
        </section>

        {/* Mini Games */}
        <section id="games" aria-labelledby="mini-games" className="scroll-mt-20">
          <h2 id="mini-games" className="font-display text-3xl mb-4">🎭 Mini Games for Compatibility</h2>
          <MiniGames onBump={(d) => setLove((v) => Math.min(100, v + d))} />
        </section>

        {/* Meme Generator */}
        <section id="memes" aria-labelledby="meme-gen" className="scroll-mt-20">
          <h2 id="meme-gen" className="font-display text-3xl mb-4">😂 Meme Generator</h2>
          <MemeGenerator onAddToGallery={(img) => setGallery((g) => [img, ...g])} />
        </section>

        {/* Gallery */}
        <Gallery images={gallery} />
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Majlis Matrimony",
            description:
              "A hilariously romantic, totally useless matchmaking playground for Majlis College students.",
            url: "",
          }),
        }}
      />

      <footer className="border-t mt-12">
        <div className="container py-8 text-sm text-muted-foreground">
          Made with entirely unserious intentions. Please don’t take love advice from this app.
        </div>
      </footer>
    </div>
  );
};

export default Index;
