/**
 * Sound synthesis utilities using the Web Audio API.
 * Provides clean, lightweight sound effects without requiring audio file downloads.
 */

// Helper to check if running in browser
const isBrowser = typeof window !== 'undefined';

export const playSuccessSound = () => {
    if (!isBrowser) return;
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;
        
        const playNote = (freq: number, startOffset: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            // triangle wave gives a cute, clean, retro chime sound
            osc.type = 'triangle';
            osc.frequency.value = freq;
            
            // Soft and cozy volume
            gain.gain.setValueAtTime(0.12, now + startOffset);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now + startOffset);
            osc.stop(now + startOffset + duration);
        };
        
        // Ascending major chord notes (C5 -> E5 -> G5) for a happy success feel
        playNote(523.25, 0, 0.12);     // C5
        playNote(659.25, 0.06, 0.16);  // E5
        playNote(783.99, 0.12, 0.22);  // G5
    } catch (e) {
        console.error("Failed to play success sound:", e);
    }
};

export const playErrorSound = () => {
    if (!isBrowser) return;
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;
        
        const playNote = (freq: number, startOffset: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            // sine wave is gentle, not annoying or harsh
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0.12, now + startOffset);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now + startOffset);
            osc.stop(now + startOffset + duration);
        };
        
        // Descending low notes (G3 -> D3) for a gentle incorrect feedback
        playNote(196.00, 0, 0.15);     // G3
        playNote(146.83, 0.08, 0.22);  // D3
    } catch (e) {
        console.error("Failed to play error sound:", e);
    }
};
