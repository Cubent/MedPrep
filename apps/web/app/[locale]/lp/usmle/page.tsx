'use client';

import { LuminaInteractiveList } from '@repo/design-system';
import { HeaderAuth } from '../../(home)/components/header-auth';

const AdLandingPage = () => (
  <div className="min-h-screen">
    <LuminaInteractiveList
      authSlot={<HeaderAuth />}
      heroTitle="Ace the USMLE without even taking notes"
    />
  </div>
);

export default AdLandingPage;
