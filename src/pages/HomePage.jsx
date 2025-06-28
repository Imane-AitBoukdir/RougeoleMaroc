import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SymptomsSection from '@/components/sections/SymptomsSection';
import PreventionSection from '@/components/sections/PreventionSection';
import DiagnosisSection from '@/components/sections/DiagnosisSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import ShortVideosSection from '@/components/sections/ShortVideosSection';
import NewsSection from '@/components/sections/NewsSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Rougeole Maroc - Information et Prévention</title>
        <meta name="description" content="Site informatif sur la rougeole au Maroc : symptômes, prévention, vaccination et actualités sanitaires." />
      </Helmet>
      <main>
        <HeroSection />
        <AboutSection />
        <SymptomsSection />
        <PreventionSection />
        <DiagnosisSection />
        <PublicationsSection />
        <ShortVideosSection />
        <NewsSection />
      </main>
    </>
  );
};

export default HomePage;