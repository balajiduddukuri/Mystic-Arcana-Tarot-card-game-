// Web Audio API Synthesizer for Zen Ambient Soundscapes & Tarot Chimes

class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.35;
  private masterGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private activeGains: GainNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private currentTrack: 'solfeggio' | 'bowls' | 'cosmic' = 'solfeggio';
  private bowlTimer: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    if (!this.ctx) return;

    this.stop(); // Stop any previous nodes

    this.isPlaying = true;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    if (this.currentTrack === 'solfeggio') {
      this.playSolfeggioPad();
    } else if (this.currentTrack === 'bowls') {
      this.playTibetanBowls();
    } else if (this.currentTrack === 'cosmic') {
      this.playCosmicDrone();
    }

    // Schedule random soft singing bowl chimes every few seconds
    this.scheduleRandomChimes();
  }

  public stop() {
    this.isPlaying = false;
    if (this.bowlTimer) {
      clearInterval(this.bowlTimer);
      this.bowlTimer = null;
    }

    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];

    this.activeGains.forEach((g) => {
      try {
        g.disconnect();
      } catch (e) {}
    });
    this.activeGains = [];

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch (e) {}
      this.noiseNode = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public setTrack(track: 'solfeggio' | 'bowls' | 'cosmic') {
    this.currentTrack = track;
    if (this.isPlaying) {
      this.start();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrack(): 'solfeggio' | 'bowls' | 'cosmic' {
    return this.currentTrack;
  }

  // Track 1: 432 Hz Solfeggio Healing Frequency Drone & Soft Warm Pads
  private playSolfeggioPad() {
    if (!this.ctx || !this.masterGain) return;

    // Frequencies tuning around A=432Hz: 108Hz (A2), 216Hz (A3), 432Hz (A4), 528Hz (Love/Transformation)
    const baseFreqs = [108, 162, 216, 324, 432, 528];

    baseFreqs.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      // Slight detune for rich cosmic chorusing
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
      osc.detune.setValueAtTime((index - 2) * 4, this.ctx!.currentTime);

      // Low pass filter for soft atmospheric warmth
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx!.currentTime);

      const vol = index === 0 ? 0.25 : 0.08 / (index + 1);
      gain.gain.setValueAtTime(vol, this.ctx!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.activeOscillators.push(osc);
      this.activeGains.push(gain);
    });

    // Add ambient breeze pink noise floor
    this.addAmbientNoiseBuffer(0.03);
  }

  // Track 2: Tibetan Singing Bowls & Harmonic Bell Drones
  private playTibetanBowls() {
    if (!this.ctx || !this.masterGain) return;

    // Frequencies: C# (136.1 Hz Ohm frequency), G# (204.1 Hz), F# (364 Hz)
    const freqs = [136.1, 204.1, 272.2, 408.2];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // LFO for singing bowl pulsating vibration
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.2 + idx * 0.1, this.ctx!.currentTime); // 0.2 Hz slow pulse
      lfoGain.gain.setValueAtTime(0.03, this.ctx!.currentTime);
      lfo.connect(gain.gain);
      lfo.start();
      this.activeOscillators.push(lfo);

      gain.gain.setValueAtTime(idx === 0 ? 0.3 : 0.06, this.ctx!.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.activeOscillators.push(osc);
      this.activeGains.push(gain);
    });

    this.addAmbientNoiseBuffer(0.02);
  }

  // Track 3: Cosmic Ether & Deep Space Shimmer
  private playCosmicDrone() {
    if (!this.ctx || !this.masterGain) return;

    const freqs = [72, 144, 288, 576, 864];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300 + idx * 150, this.ctx!.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx!.currentTime);

      gain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.activeOscillators.push(osc);
      this.activeGains.push(gain);
    });

    this.addAmbientNoiseBuffer(0.04);
  }

  // Pink noise background stream
  private addAmbientNoiseBuffer(volume: number) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 3; // 3 seconds loop buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.05; // soft volume
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(400, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    this.noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    this.noiseNode.start();
  }

  // Periodic Random Singing Bowl Bell Strikes
  private scheduleRandomChimes() {
    if (this.bowlTimer) clearInterval(this.bowlTimer);

    this.bowlTimer = setInterval(() => {
      if (!this.isPlaying) return;
      if (Math.random() < 0.6) {
        this.playSingingBowlChime();
      }
    }, 9000);
  }

  // Play a single resonant crystal bell / singing bowl chime sound effect
  public playSingingBowlChime(pitchFreq?: number) {
    this.initContext();
    if (!this.ctx) return;

    const freq = pitchFreq || [432, 528, 639, 741, 852][Math.floor(Math.random() * 5)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Exponential decay simulating striking a brass bowl or crystal glass
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 4.5);
  }

  // Play soft card draw sound FX
  public playCardDrawSFX() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const zenAudio = new ZenAudioEngine();
