"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function FavoriteButton({ promptId }: { promptId: string }) {
  const [fav, setFav] = useState(false);
  const uid = auth.currentUser?.uid;
  useEffect(() => {
    if (!uid) return;
    getDoc(doc(db, "users", uid, "favorites", promptId)).then((snap) => {
      setFav(snap.exists());
    });
  }, [uid, promptId]);

  const toggle = async () => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "favorites", promptId);
    if (fav) await deleteDoc(ref);
    else await setDoc(ref, { createdAt: Date.now() });
    setFav(!fav);
  };

  return (
    <button onClick={toggle} className={fav ? "text-red-500" : "text-gray-500"}>
      ♥
    </button>
  );
}
