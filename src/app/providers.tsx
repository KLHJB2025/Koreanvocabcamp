'use client';

import { TranslationProvider } from '@/hooks/use-translation';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <TranslationProvider>
            {children}
        </TranslationProvider>
    );
}
