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
  return snap.exists() ? { id: snap.id, ...snap.data() } as Prompt : null;
}

export async function listPromptsByUser(uid: string) {
  const q = query(collection(db, 'prompts'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Prompt));
}

export async function listPrompts() {
  const snap = await getDocs(collection(db, 'prompts'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Prompt));
}
