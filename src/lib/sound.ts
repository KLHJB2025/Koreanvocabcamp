/**
 * Sound synthesis utilities using the Web Audio API.
 * Provides clean, lightweight, and encouraging sound effects without requiring audio file downloads.
 */

// Helper to check if running in browser
const isBrowser = typeof window !== 'undefined';

// Cache the AudioContext globally to prevent reaching the browser limits
let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (!isBrowser) return null;
    if (!sharedCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            sharedCtx = new AudioContextClass();
        }
    }
    return sharedCtx;
}

/**
 * Plays an encouraging, multi-layered success chime.
 * Synthesizes a sparkling C Major chord using both bright triangle waves and warm sine waves.
 */
export const playSuccessSound = async () => {
    if (!isBrowser) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Resume context if suspended by browser autoplay policy
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const now = ctx.currentTime;
        
        const playNote = (freq: number, startOffset: number, duration: number, volume: number, type: OscillatorType) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = type;
            osc.frequency.value = freq;
            
            // Fast attack, slow exponential decay
            gain.gain.setValueAtTime(volume, now + startOffset);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now + startOffset);
            osc.stop(now + startOffset + duration);
        };
        
        // Sparkling C Major chord progression (C5 -> E5 -> G5 -> C6)
        // Layer 1: Bright retro chime (triangle wave)
        playNote(523.25, 0.00, 0.15, 0.14, 'triangle'); // C5
        playNote(659.25, 0.05, 0.18, 0.14, 'triangle'); // E5
        playNote(783.99, 0.10, 0.22, 0.14, 'triangle'); // G5
        playNote(1046.50, 0.15, 0.35, 0.18, 'triangle'); // C6
        
        // Layer 2: Warm body (sine wave harmony) to make it sound richer and more professional
        playNote(261.63, 0.00, 0.30, 0.12, 'sine');     // C4 (warm base)
        playNote(329.63, 0.05, 0.30, 0.10, 'sine');     // E4
        playNote(523.25, 0.15, 0.40, 0.12, 'sine');     // C5 (warm top)
    } catch (e) {
        console.error("Failed to play success sound:", e);
    }
};

/**
 * Plays a soft, non-intrusive error tone.
 */
export const playErrorSound = async () => {
    if (!isBrowser) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Resume context if suspended
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const now = ctx.currentTime;
        
        const playNote = (freq: number, startOffset: number, duration: number, volume: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(volume, now + startOffset);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now + startOffset);
            osc.stop(now + startOffset + duration);
        };
        
        // Descending low notes (G3 -> D3) for a gentle incorrect feedback
        playNote(196.00, 0.00, 0.15, 0.12); // G3
        playNote(146.83, 0.08, 0.22, 0.12); // D3
    } catch (e) {
        console.error("Failed to play error sound:", e);
    }
};
