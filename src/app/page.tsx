import { Metadata } from 'next';

import { FAQ } from './components/landing-page/FAQ';
import { Hero } from './components/landing-page/Hero';
import { Header } from './components/landing-page/Header';
import { Pricing } from './components/landing-page/Pricing';
import { VideoExplanation } from './components/landing-page/VideoExplanation';
import { getSEOTags } from './lib/seo';

export const metadata: Metadata = getSEOTags({
  appName: 'ProjectInBio',
  appDescription:
    'ProjectInBio - Seus projetos e redes sociais em um único link',
  keywords: ['ProjectInBio', 'projetos', 'redes sociais', 'link'],
  appDomain: 'https://micro-saas-course-projectinbio-bice.vercel.app/',
  canonicalUrlRelative: '/',
});

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
