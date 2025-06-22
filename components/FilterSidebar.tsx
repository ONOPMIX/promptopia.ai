"use client";
import { useState } from "react";

const MODELS = ["Midjourney", "DALL·E", "Sora", "Runway", "Pika", "Veo"];
const TAGS = ["Animation", "Cinematic", "Product", "Character", "Environment", "Fantasy"];

export interface Filters {
  models: string[];
  tags: string[];
}

export default function FilterSidebar({ onChange }: { onChange: (f: Filters) => void }) {
  const [models, setModels] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const apply = () => onChange({ models, tags });

  return (
    <aside className="p-4 border-r space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Models</h3>
        {MODELS.map((m) => (
          <label key={m} className="block">
            <input type="checkbox" checked={models.includes(m)} onChange={() => toggle(models, m, setModels)} /> {m}
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Tags</h3>
        {TAGS.map((t) => (
          <label key={t} className="block">
            <input type="checkbox" checked={tags.includes(t)} onChange={() => toggle(tags, t, setTags)} /> {t}
          </label>
        ))}
      </div>
      <button onClick={apply} className="bg-blue-600 text-white px-3 py-1">Apply</button>
    </aside>
  );
}
