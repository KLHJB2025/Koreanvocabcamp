'use client';

import { TranslationProvider } from '@/hooks/use-translation';
import { DictionaryLookup } from '@/components/learning/DictionaryLookup';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <TranslationProvider>
            {children}
            <DictionaryLookup />
        </TranslationProvider>
    );
}
