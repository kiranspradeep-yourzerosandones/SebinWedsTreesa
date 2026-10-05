// lib/audioManager.ts
class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  public isPlaying = false;
  public userManuallyPaused = false;

  init() {
    if (typeof window === "undefined" || this.audio) return;
    this.audio = new Audio("/music/wedding-song.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.35;
    this.audio.preload = "auto";

    this.audio.onplay = () => {
      this.isPlaying = true;
      this.notify();
    };

    this.audio.onpause = () => {
      this.isPlaying = false;
      this.notify();
    };
  }

  async play(): Promise<boolean> {
    this.init();
    if (!this.audio) return false;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.userManuallyPaused = false;
      this.notify();
      return true;
    } catch {
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.userManuallyPaused = true;
      this.notify();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const audioManager = new AudioManager();