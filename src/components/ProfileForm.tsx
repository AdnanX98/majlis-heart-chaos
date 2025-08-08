import React, { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export interface FakeProfile {
  id: string;
  name: string;
  age: number;
  major: string;
  favoriteSnack: string;
  weirdHabit: string;
  interests: string[];
  romanticPref: string;
  likesBiryani?: boolean;
  hatesAccounting?: boolean;
  imageUrl?: string; // preview URL
}

interface ProfileFormProps {
  onCreate: (profile: FakeProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>();
  const [major, setMajor] = useState("");
  const [favoriteSnack, setFavoriteSnack] = useState("");
  const [weirdHabit, setWeirdHabit] = useState("");
  const [romanticPref, setRomanticPref] = useState("");
  const [interests, setInterests] = useState("");
  const [likesBiryani, setLikesBiryani] = useState(false);
  const [hatesAccounting, setHatesAccounting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const canCreate = useMemo(
    () => name.trim() && age && major.trim() && romanticPref.trim(),
    [name, age, major, romanticPref]
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  function reset() {
    setName("");
    setAge(undefined);
    setMajor("");
    setFavoriteSnack("");
    setWeirdHabit("");
    setInterests("");
    setRomanticPref("");
    setLikesBiryani(false);
    setHatesAccounting(false);
    setImageUrl(undefined);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canCreate) return;
    const profile: FakeProfile = {
      id: `${Date.now()}`,
      name: name.trim(),
      age: Number(age),
      major: major.trim(),
      favoriteSnack: favoriteSnack.trim(),
      weirdHabit: weirdHabit.trim(),
      interests: interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      romanticPref: romanticPref.trim(),
      likesBiryani,
      hatesAccounting,
      imageUrl,
    };
    onCreate(profile);
    reset();
  }

  return (
    <Card className="border-accent/40">
      <CardHeader>
        <CardTitle className="font-display">Create Your Fake Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ayesha, Faiz, ..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={age ?? ""} onChange={(e) => setAge(Number(e.target.value))} placeholder="21" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="major">Major</Label>
            <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="English, CS, Law..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="snack">Favorite snack</Label>
            <Input id="snack" value={favoriteSnack} onChange={(e) => setFavoriteSnack(e.target.value)} placeholder="Biryani, samosa, chai..." />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="habit">Weirdest habit</Label>
            <Input id="habit" value={weirdHabit} onChange={(e) => setWeirdHabit(e.target.value)} placeholder="Talks to plants, names their laptop..." />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <Input id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Poetry, cats, cricket..." />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="pref">Romantic preference</Label>
            <Textarea id="pref" value={romanticPref} onChange={(e) => setRomanticPref(e.target.value)} placeholder="Loves cats more than humans, needs chai dates..." />
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="biryani" checked={likesBiryani} onCheckedChange={(v) => setLikesBiryani(Boolean(v))} />
            <Label htmlFor="biryani">Only matches who like biryani</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="accounting" checked={hatesAccounting} onCheckedChange={(v) => setHatesAccounting(Boolean(v))} />
            <Label htmlFor="accounting">Majors who hate accounting</Label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Profile image (in-memory)</Label>
            <Input ref={fileRef} id="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {imageUrl && (
            <div className="sm:justify-self-end">
              <img
                src={imageUrl}
                alt="Uploaded profile preview with romantic vibes"
                className="h-24 w-24 object-cover rounded-md border"
                loading="lazy"
              />
            </div>
          )}

          <div className="sm:col-span-2 flex gap-3">
            <Button type="submit" variant="heart" disabled={!canCreate}>💖 Create Profile</Button>
            <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
