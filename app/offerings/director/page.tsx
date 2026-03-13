'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DirectorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#methodology');
  }, [router]);

  return null;
}
