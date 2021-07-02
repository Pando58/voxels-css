export default class LoopController {
  loop: (delta: number) => void;

  constructor(loop: (delta: number) => void) {
    this.loop = loop;
  }

  deltaTime(ts?: number, last_ts?: number): void {
    if (ts === undefined) ts = 0;
    if (last_ts === undefined) last_ts = ts;

    const delta = ts - last_ts;

    this.loop(delta);

    requestAnimationFrame((timestamp) => {
      this.deltaTime(timestamp, ts);
    });
  }
}