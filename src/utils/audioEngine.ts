/**
 * Original procedural Web Audio API medieval-fantasy score & UI SFX for The Realm of Anwesha.
 * Composes an original D-Dorian cello ostinato, warm string pad, distant war-drum pulse,
 * and hall wind — 100% original, zero copyrighted show music, strictly opt-in.
 */

interface ChordBar {
  bass: number[] // 4-beat cello ostinato frequencies (Hz)
  pad: number[] // sustained string chord frequencies (Hz)
}

// Original 8-bar D-Dorian progression (Dm -> C -> Bb -> Am/C -> Dm -> F -> Gm -> A7sus4)
const SCORE_BARS: ChordBar[] = [
  { bass: [73.42, 110.0, 87.31, 110.0], pad: [146.83, 220.0, 261.63] },
  { bass: [65.41, 98.0, 82.41, 98.0], pad: [130.81, 196.0, 246.94] },
  { bass: [58.27, 87.31, 73.42, 87.31], pad: [116.54, 174.61, 220.0] },
  { bass: [55.0, 82.41, 65.41, 82.41], pad: [110.0, 164.81, 220.0] },
  { bass: [73.42, 110.0, 98.0, 87.31], pad: [146.83, 220.0, 261.63] },
  { bass: [87.31, 130.81, 110.0, 98.0], pad: [174.61, 220.0, 293.66] },
  { bass: [98.0, 146.83, 116.54, 110.0], pad: [196.0, 233.08, 293.66] },
  { bass: [55.0, 82.41, 110.0, 82.41], pad: [110.0, 164.81, 246.94] },
]

const STEP_DURATION_SEC = 0.62 // ~97 BPM quarter-note pulse

class RealmAudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private ambientGain: GainNode | null = null
  private musicBus: GainNode | null = null
  private windFilter: BiquadFilterNode | null = null
  private isAmbientRunning = false
  private schedulerId: number | null = null
  private nextStepTime = 0
  private stepIndex = 0
  private lastHoverAt = 0

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return null

    if (!this.ctx) {
      this.ctx = new AudioCtx()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 0.0001
      this.masterGain.connect(this.ctx.destination)
    }
    return this.ctx
  }

  private startAmbientBed() {
    if (!this.ctx || !this.masterGain || this.isAmbientRunning) return
    const ctx = this.ctx

    this.ambientGain = ctx.createGain()
    this.ambientGain.gain.value = 0.5
    this.ambientGain.connect(this.masterGain)

    this.musicBus = ctx.createGain()
    this.musicBus.gain.value = 0.72
    this.musicBus.connect(this.masterGain)

    // Subtle brown-noise hall / coastal wind bed
    const bufferSize = ctx.sampleRate * 3
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + 0.02 * white) / 1.02
      data[i] = lastOut * 1.5
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'
    windFilter.frequency.value = 250
    windFilter.Q.value = 0.6
    this.windFilter = windFilter

    const windGain = ctx.createGain()
    windGain.gain.value = 0.1

    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 85
    lfo.connect(lfoGain)
    lfoGain.connect(windFilter.frequency)

    noiseSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(this.ambientGain)

    noiseSource.start()
    lfo.start()

    this.isAmbientRunning = true
  }

  private scheduleBowedNote(freq: number, startTime: number, duration: number, gainPeak: number) {
    if (!this.ctx || !this.musicBus) return
    const ctx = this.ctx

    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const env = ctx.createGain()

    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(freq, startTime)
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 1.003, startTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(420, startTime)
    filter.frequency.linearRampToValueAtTime(640, startTime + duration * 0.35)
    filter.frequency.linearRampToValueAtTime(310, startTime + duration)
    filter.Q.value = 1.2

    env.gain.setValueAtTime(0.0001, startTime)
    env.gain.linearRampToValueAtTime(gainPeak, startTime + 0.09)
    env.gain.setTargetAtTime(gainPeak * 0.55, startTime + 0.14, 0.18)
    env.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(env)
    env.connect(this.musicBus)

    osc1.start(startTime)
    osc2.start(startTime)
    osc1.stop(startTime + duration + 0.04)
    osc2.stop(startTime + duration + 0.04)
  }

  private schedulePadChord(freqs: number[], startTime: number, duration: number) {
    if (!this.ctx || !this.musicBus) return
    const ctx = this.ctx

    for (const freq of freqs) {
      const osc = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const env = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, startTime)

      filter.type = 'lowpass'
      filter.frequency.value = 480

      env.gain.setValueAtTime(0.0001, startTime)
      env.gain.linearRampToValueAtTime(0.018, startTime + 0.45)
      env.gain.setValueAtTime(0.018, startTime + duration - 0.5)
      env.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

      osc.connect(filter)
      filter.connect(env)
      env.connect(this.musicBus)

      osc.start(startTime)
      osc.stop(startTime + duration + 0.05)
    }
  }

  private scheduleWarDrum(startTime: number, accent: boolean) {
    if (!this.ctx || !this.musicBus) return
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    const env = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(accent ? 84 : 72, startTime)
    osc.frequency.exponentialRampToValueAtTime(38, startTime + 0.24)

    env.gain.setValueAtTime(0.0001, startTime)
    env.gain.linearRampToValueAtTime(accent ? 0.055 : 0.032, startTime + 0.012)
    env.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.34)

    osc.connect(env)
    env.connect(this.musicBus)
    osc.start(startTime)
    osc.stop(startTime + 0.36)
  }

  private startScoreScheduler() {
    if (!this.ctx || this.schedulerId !== null) return
    this.nextStepTime = this.ctx.currentTime + 0.06

    this.schedulerId = window.setInterval(() => {
      if (!this.ctx || this.ctx.state !== 'running') return
      const lookahead = this.ctx.currentTime + 0.25

      while (this.nextStepTime < lookahead) {
        const barIdx = Math.floor(this.stepIndex / 4) % SCORE_BARS.length
        const beatInBar = this.stepIndex % 4
        const bar = SCORE_BARS[barIdx]

        // Cello ostinato on every beat
        this.scheduleBowedNote(
          bar.bass[beatInBar],
          this.nextStepTime,
          STEP_DURATION_SEC * 0.92,
          beatInBar === 0 ? 0.065 : 0.045,
        )

        // Warm string pad on downbeat of each bar
        if (beatInBar === 0) {
          this.schedulePadChord(bar.pad, this.nextStepTime, STEP_DURATION_SEC * 3.95)
          this.scheduleWarDrum(this.nextStepTime, true)
        } else if (beatInBar === 2) {
          this.scheduleWarDrum(this.nextStepTime, false)
        }

        this.nextStepTime += STEP_DURATION_SEC
        this.stepIndex = (this.stepIndex + 1) % (SCORE_BARS.length * 4)
      }
    }, 100)
  }

  private stopScoreScheduler() {
    if (this.schedulerId !== null) {
      window.clearInterval(this.schedulerId)
      this.schedulerId = null
    }
  }

  public async setEnabled(enabled: boolean, duckForContent = false) {
    if (!enabled) {
      this.stopScoreScheduler()
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime
        this.masterGain.gain.cancelScheduledValues(now)
        this.masterGain.gain.setTargetAtTime(0.0001, now, 0.1)
      }
      return
    }

    const ctx = this.ensureContext()
    if (!ctx || !this.masterGain) return

    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    this.startAmbientBed()
    this.startScoreScheduler()

    const now = ctx.currentTime
    const targetLevel = duckForContent ? 0.3 : 0.72
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setTargetAtTime(targetLevel, now, 0.35)
  }

  public setSceneAtmosphere(scene: 'intro' | 'map' | 'chronicle') {
    if (!this.ctx || !this.windFilter || !this.isAmbientRunning) return
    const now = this.ctx.currentTime
    const targetCutoff = scene === 'intro' ? 210 : scene === 'map' ? 320 : 175
    this.windFilter.frequency.setTargetAtTime(targetCutoff, now, 0.5)
  }

  public playInteractionChime(kind: 'enter' | 'select' | 'close' | 'hover' | 'easterEgg') {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return
    const ctx = this.ctx
    const now = ctx.currentTime

    if (kind === 'hover') {
      if (now - this.lastHoverAt < 0.14) return
      this.lastHoverAt = now
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      env.gain.setValueAtTime(0.0001, now)
      env.gain.linearRampToValueAtTime(0.014, now + 0.01)
      env.gain.exponentialRampToValueAtTime(0.0001, now + 0.07)
      osc.connect(env)
      env.connect(this.masterGain)
      osc.start(now)
      osc.stop(now + 0.08)
      return
    }

    if (kind === 'easterEgg') {
      const notes = [293.66, 369.99, 440, 587.33]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const env = ctx.createGain()
        const t = now + i * 0.075
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, t)
        env.gain.setValueAtTime(0.0001, t)
        env.gain.linearRampToValueAtTime(0.042, t + 0.015)
        env.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
        osc.connect(env)
        env.connect(this.masterGain!)
        osc.start(t)
        osc.stop(t + 0.38)
      })
      return
    }

    const osc = ctx.createOscillator()
    const env = ctx.createGain()

    osc.type = 'triangle'
    const baseFreq = kind === 'enter' ? 196 : kind === 'select' ? 293.66 : 220
    const endFreq = kind === 'enter' ? 293.66 : kind === 'select' ? 329.63 : 164.81

    osc.frequency.setValueAtTime(baseFreq, now)
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.16)

    env.gain.setValueAtTime(0.0001, now)
    env.gain.linearRampToValueAtTime(0.048, now + 0.02)
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    osc.connect(env)
    env.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.3)
  }
}

export const realmAudioEngine = new RealmAudioEngine()
