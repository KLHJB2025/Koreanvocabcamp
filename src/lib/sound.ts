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

// Global click/touch/keydown listener to auto-resume AudioContext on user gesture
if (isBrowser) {
    const resumeAudio = () => {
        const ctx = getAudioContext();
        if (ctx) {
            if (ctx.state === 'suspended') {
                ctx.resume()
                    .then(() => {
                        console.log("AudioContext successfully resumed on user gesture");
                        cleanup();
                    })
                    .catch(e => console.error("Failed to resume AudioContext:", e));
            } else {
                cleanup();
            }
        }
    };
    
    const cleanup = () => {
        window.removeEventListener('click', resumeAudio);
        window.removeEventListener('touchstart', resumeAudio);
        window.removeEventListener('keydown', resumeAudio);
    };
    
    window.addEventListener('click', resumeAudio);
    window.addEventListener('touchstart', resumeAudio);
    window.addEventListener('keydown', resumeAudio);
}

/**
 * Plays an encouraging, multi-layered success chime.
 * Synthesizes a sparkling C Major chord using both bright triangle waves and warm sine waves.
 */
export const playSuccessSound = () => {
    if (!isBrowser) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Trigger resume synchronously without awaiting to preserve user-gesture status in microtasks
        if (ctx.state === 'suspended') {
            ctx.resume().catch(e => console.error("Failed to resume context:", e));
        }

        const now = ctx.currentTime;
        
        const playNote = (freq: number, startOffset: number, duration: number, volume: number, type: OscillatorType) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = type;
            osc.frequency.value = freq;
            
            const noteStart = now + startOffset;
            const attackTime = 0.01; // 10ms attack to prevent clicks/pops
            const noteEnd = noteStart + duration;
            
            // Set envelope nodes
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.setValueAtTime(0.0001, noteStart);
            gain.gain.linearRampToValueAtTime(volume, noteStart + attackTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(noteStart);
            osc.stop(noteEnd);
        };
        
        // Sparkling C Major chord progression (C5 -> E5 -> G5 -> C6)
        // Layer 1: Bright retro chime (triangle wave)
        playNote(523.25, 0.00, 0.15, 0.20, 'triangle'); // C5
        playNote(659.25, 0.05, 0.18, 0.20, 'triangle'); // E5
        playNote(783.99, 0.10, 0.22, 0.20, 'triangle'); // G5
        playNote(1046.50, 0.15, 0.35, 0.25, 'triangle'); // C6
        
        // Layer 2: Warm body (sine wave harmony) to make it sound richer and more professional
        playNote(261.63, 0.00, 0.30, 0.15, 'sine');     // C4 (warm base)
        playNote(329.63, 0.05, 0.30, 0.12, 'sine');     // E4
        playNote(523.25, 0.15, 0.40, 0.15, 'sine');     // C5 (warm top)
    } catch (e) {
        console.error("Failed to play success sound:", e);
    }
};

/**
 * Plays a soft, non-intrusive error tone.
 */
export const playErrorSound = () => {
    if (!isBrowser) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Trigger resume synchronously
        if (ctx.state === 'suspended') {
            ctx.resume().catch(e => console.error("Failed to resume context:", e));
        }

        const now = ctx.currentTime;
        
        const playNote = (freq: number, startOffset: number, duration: number, volume: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const noteStart = now + startOffset;
            const attackTime = 0.01; // 10ms attack
            const noteEnd = noteStart + duration;
            
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.setValueAtTime(0.0001, noteStart);
            gain.gain.linearRampToValueAtTime(volume, noteStart + attackTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(noteStart);
            osc.stop(noteEnd);
        };
        
        // Descending low notes (G3 -> D3) for a gentle incorrect feedback
        playNote(196.00, 0.00, 0.15, 0.15); // G3
        playNote(146.83, 0.08, 0.22, 0.15); // D3
    } catch (e) {
        console.error("Failed to play error sound:", e);
    }
};
