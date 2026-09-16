'use client';

import React from 'react';
import { LuminaInteractiveList } from '@repo/design-system';
import { HeaderAuth } from './components/header-auth';

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

const Home = ({ params }: HomeProps) => {
  return (
    <div className="min-h-screen">
      <LuminaInteractiveList authSlot={<HeaderAuth />} />
    </div>
  );
};

export default Home;
