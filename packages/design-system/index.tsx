import { AnalyticsProvider } from '@repo/analytics';
import type { ThemeProviderProps } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
};

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AnalyticsProvider>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </AnalyticsProvider>
  </ThemeProvider>
);

// Export Lumina Interactive List component
export { LuminaInteractiveList } from './components/ui/lumina-interactive-list';

// Re-export useTheme so consumers share the exact same next-themes module
// instance that actually renders <ThemeProvider> above (avoids a duplicate
// pnpm-installed copy of next-themes creating a separate, unconnected
// React Context in apps that also declare next-themes as their own dependency).
export { useTheme } from 'next-themes';
