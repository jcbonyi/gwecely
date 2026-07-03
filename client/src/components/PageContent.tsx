/**
 * PageContent — top padding for inner pages (clears fixed navbar)
 */

import type { ReactNode } from 'react';

interface PageContentProps {
  children: ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return <div className="pt-28 md:pt-36">{children}</div>;
}
