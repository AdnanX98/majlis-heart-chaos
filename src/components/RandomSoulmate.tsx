import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const MESSAGES = [
  "You’ve been matched with a final-year law student who speaks only in poetry.",
  "Your soulmate is in the library… crying over midterms.",
  "A mysterious chai vendor just stole your heart.",
  "Destiny says: swipe right on biryani first, then people.",
  "Your lab partner keeps borrowing pens—and your heart.",
];

export const RandomSoulmate: React.FC = () => {
  function handleClick() {
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    toast({ title: "Majlis Soulmate Located", description: msg });
  }
  return (
    <Button variant="heart" onClick={handleClick}>✨ Find My Majlis Soulmate</Button>
  );
};

export default RandomSoulmate;
