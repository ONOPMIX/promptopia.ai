import { collection, addDoc, getDocs, doc, getDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface Prompt {
  id?: string;
  uid?: string;
  title: string;
  description: string;
  model: string;
  prompt: string;
  previewUrl: string;
  tags: string[];
  price: number;
  license: string;
  toolUrlTemplate?: string;
  affiliateCode?: string;
  createdAt?: Timestamp;
}

export async function createPrompt(data: Prompt) {
  const ref = await addDoc(collection(db, 'prompts'), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function getPrompt(id: string) {
  const snap = await getDoc(doc(db, 'prompts', id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Prompt) : null;
}

export async function listPromptsByUser(uid: string) {
  const q = query(collection(db, 'prompts'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Prompt));
}

export async function listPrompts(filters?: { models?: string[]; tags?: string[] }) {
  let q = collection(db, 'prompts') as any;
  if (filters?.models?.length) {
    q = query(q, where('model', 'in', filters.models.slice(0, 10)));
  }
  if (filters?.tags?.length) {
    q = query(q, where('tags', 'array-contains-any', filters.tags.slice(0, 10)));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Prompt));
}
