import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import templateA from "@/assets/memes/template-forever-alone.jpg";
import templateB from "@/assets/memes/template-distracted-student.jpg";
import templateC from "@/assets/memes/template-love-fail.jpg";

const templates = [
  { id: "forever", src: templateA, label: "Forever Alone-ish" },
  { id: "distracted", src: templateB, label: "Distracted Student" },
  { id: "fail", src: templateC, label: "Majlis Love Fail" },
];

interface MemeGeneratorProps {
  onAddToGallery: (dataUrl: string) => void;
}

export const MemeGenerator: React.FC<MemeGeneratorProps> = ({ onAddToGallery }) => {
  const [template, setTemplate] = useState(templates[0]);
  const [topText, setTopText] = useState("Majlis Love");
  const [bottomText, setBottomText] = useState("Certified Failure 💔");
  const [glitter, setGlitter] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    void renderCanvas();
  }, [template, topText, bottomText, glitter]);

  async function renderCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = template.src;
    await new Promise((res) => {
      img.onload = () => res(true);
    });

    const W = (c.width = 960);
    const H = (c.height = 720);

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, 0, 0, W, H);

    // text styles
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;

    ctx.font = "bold 42px Poppins, sans-serif";
    ctx.strokeText(topText.toUpperCase(), W / 2, 60);
    ctx.fillText(topText.toUpperCase(), W / 2, 60);

    ctx.font = "bold 46px Poppins, sans-serif";
    ctx.strokeText(bottomText.toUpperCase(), W / 2, H - 30);
    ctx.fillText(bottomText.toUpperCase(), W / 2, H - 30);

    if (glitter) {
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = 1 + Math.random() * 2.2;
        ctx.fillStyle = `hsl(340 ${60 + Math.random() * 30}% ${60 + Math.random() * 20}%)`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function saveToGallery() {
    const c = canvasRef.current;
    if (!c) return;
    const url = c.toDataURL("image/png");
    onAddToGallery(url);
  }

  return (
    <Card className="border-accent/40">
      <CardHeader>
        <CardTitle className="font-display">Meme Generator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[320px,1fr]">
        <div className="space-y-3">
          <label className="block text-sm font-medium">Template</label>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t)}
                className={`rounded-md border overflow-hidden hover:opacity-90 focus:outline-none ${template.id === t.id ? 'ring-2 ring-primary' : ''}`}
                aria-label={`Choose template ${t.label}`}
              >
                <img src={t.src} alt={`${t.label} meme template`} className="h-20 w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium mt-3">Top text</label>
          <input value={topText} onChange={(e) => setTopText(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2" />

          <label className="block text-sm font-medium mt-3">Bottom text</label>
          <input value={bottomText} onChange={(e) => setBottomText(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2" />

          <div className="flex items-center gap-2 mt-2">
            <input id="glitter" type="checkbox" checked={glitter} onChange={(e) => setGlitter(e.target.checked)} />
            <label htmlFor="glitter" className="text-sm">Add hearts & glitter</label>
          </div>

          <div className="pt-2 flex gap-2">
            <Button variant="heart" onClick={saveToGallery}>💾 Save to Gallery</Button>
          </div>
        </div>
        <div>
          <canvas ref={canvasRef} className="w-full rounded-lg border shadow-sm" aria-label="Meme preview canvas" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeGenerator;
