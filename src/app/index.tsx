"use client";

import { usePathname } from 'next/navigation';
import Page from './page';

export default function Index() {
  const pathname = usePathname();

  return <Page />;
}