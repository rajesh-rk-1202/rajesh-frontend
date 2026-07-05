'use client';

import { useEffect } from 'react';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const SESSION_KEY = 'visit-counted';

export default function VisitTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, 'true');

    const visitsRef = doc(db, 'analytics', 'visits');
    setDoc(visitsRef, { count: increment(1) }, { merge: true }).catch(() => {
      // Fail silently — visit tracking should never break the site.
    });
  }, []);

  return null;
}
