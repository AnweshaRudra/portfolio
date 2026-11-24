/**
 * Original procedural Web Audio API soundscape & UI SFX for The Realm of Anwesha.
 * Strictly opt-in: AudioContext is created only after explicit user interaction.
 */
class RealmAudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private ambientGain: GainNode | null = null
  private windFilter: BiquadFilterNode | null = null
  private isRunning = false
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

  private startAmbientGraph() {
    if (!this.ctx || !this.masterGain || this.isRunning) return
    const ctx = this.ctx

    this.ambientGain = ctx.createGain()
    this.ambientGain.gain.value = 0.45
    this.ambientGain.connect(this.masterGain)

    // 1. Filtered wind/hall ambience from a seamless brown-noise buffer
    const bufferSize = ctx.sampleRate * 3
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + 0.02 * white) / 1.02
      data[i] = lastOut * 1.6
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'
    windFilter.frequency.value = 260
    windFilter.Q.value = 0.7
    this.windFilter = windFilter

    const windGain = ctx.createGain()
    windGain.gain.value = 0.14

    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 95
    lfo.connect(lfoGain)
    lfoGain.connect(windFilter.frequency)

    noiseSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(this.ambientGain)

    noiseSource.start()
    lfo.start()

    // 2. Very quiet deep medieval fifth drone (D2 + A2)
    const droneFreqs = [73.42, 110.0]
    droneFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq

      const gain = ctx.createGain()
      gain.gain.value = idx === 0 ? 0.03 : 0.016

      osc.connect(gain)
      gain.connect(this.ambientGain!)
      osc.start()
    })

    this.isRunning = true
  }

  public async setEnabled(enabled: boolean, duckForContent = false) {
    if (!enabled) {
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

    this.startAmbientGraph()

    const now = ctx.currentTime
    const targetLevel = duckForContent ? 0.32 : 0.75
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setTargetAtTime(targetLevel, now, 0.35)
  }

  public setSceneAtmosphere(scene: 'intro' | 'map' | 'chronicle') {
    if (!this.ctx || !this.windFilter || !this.isRunning) return
    const now = this.ctx.currentTime
    const targetCutoff = scene === 'intro' ? 210 : scene === 'map' ? 340 : 180
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
      env.gain.linearRampToValueAtTime(0.015, now + 0.01)
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
        env.gain.linearRampToValueAtTime(0.045, t + 0.015)
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
    env.gain.linearRampToValueAtTime(0.05, now + 0.02)
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    osc.connect(env)
    env.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.3)
  }
}

export const realmAudioEngine = new RealmAudioEngine()
