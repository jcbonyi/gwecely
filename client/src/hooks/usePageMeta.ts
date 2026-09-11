import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
}

function setMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const DEFAULT_TITLE = 'Vehicle Repair & Panel Beating Mombasa | Gwecely Limited';
const DEFAULT_DESCRIPTION =
  'Professional vehicle repair, panel beating, spray painting and accident repairs in Mombasa. Workshop behind CMC Motors. Get a quote from Gwecely Limited.';

export function usePageMeta({ title, description, keywords }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('description', DEFAULT_DESCRIPTION);
    };
  }, [title, description, keywords]);
}
