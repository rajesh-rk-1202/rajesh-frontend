'use client';

import { useEffect } from 'react';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// localStorage (not sessionStorage) so every tab of this origin shares one
// session — opening the site in a second tab must not count as a new visit.
const LAST_SEEN_KEY = 'visit-last-seen';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const HEARTBEAT_MS = 60 * 1000;

export default function VisitTracker() {
  useEffect(() => {
    // countIfExpired=false just keeps the session alive without ever counting.
    const touchSession = (countIfExpired: boolean) => {
      let lastSeen: number;
      try {
        lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY)) || 0;
        // Claim the session before the async write, so a second tab opening at
        // the same moment reads a fresh timestamp and does not double-count.
        localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
      } catch {
        return; // Storage blocked (private mode, strict privacy settings).
      }

      if (!countIfExpired || Date.now() - lastSeen <= SESSION_TIMEOUT_MS)
        return;

      const visitsRef = doc(db, 'analytics', 'visits');
      setDoc(visitsRef, { count: increment(1) }, { merge: true }).catch(() => {
        // Fail silently — visit tracking should never break the site.
      });
    };

    touchSession(true);

    // Keep the session fresh while the tab is actually being looked at, so a
    // long read does not expire mid-visit and re-count on the next interaction.
    const heartbeat = setInterval(() => {
      if (document.visibilityState === 'visible') touchSession(false);
    }, HEARTBEAT_MS);

    // Returning to a backgrounded tab after the timeout is a new session.
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') touchSession(true);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return null;
}
