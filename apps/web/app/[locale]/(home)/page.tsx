'use client';

import React from 'react';
import { LuminaInteractiveList } from '@repo/design-system';

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

const Home = ({ params }: HomeProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Only */}
      <LuminaInteractiveList />
    </div>
  );
};

export default Home;
