import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ocean-environment',
  imports: [],
  templateUrl: './ocean-environment.html',
  styleUrl: './ocean-environment.scss'
})
export class OceanEnvironment {

  // ============================================================
  // JOURNEY PROGRESS
  // ============================================================

  /**
   * Overall journey progress.
   *
   * 0.00 = Shore
   * 0.25 = First Wave
   * 0.50 = Current
   * 0.75 = Storm
   * 1.00 = Horizon
   */
  @Input() progress = 0;


  // ============================================================
  // SUN
  // ============================================================

  /**
   * Controls the visibility of the sun.
   *
   * The sun is strongest at both emotional endpoints:
   *
   * Shore   → full glow
   * Current → soft
   * Storm   → almost gone
   * Horizon → full glow again
   */
  getSunOpacity(): number {
    return this.getTimelineValue([
      [0.00, 1.00],
      [0.15, 0.80],
      [0.25, 0.65],
      [0.50, 0.25],
      [0.70, 0.05],
      [0.75, 0.02],
      [0.85, 0.15],
      [1.00, 1.00]
    ]);
  }


  /**
   * Controls how warm the sunlight becomes.
   *
   * The light is warmest at the Shore and Horizon.
   */
  getSunWarmth(): number {
    return this.getTimelineValue([
      [0.00, 1.00],
      [0.25, 0.75],
      [0.50, 0.20],
      [0.75, 0.05],
      [0.85, 0.10],
      [1.00, 1.00]
    ]);
  }


  // ============================================================
  // CLOUDS
  // ============================================================

  /**
   * Soft atmospheric clouds.
   */
  getSoftCloudOpacity(): number {
    return this.getTimelineValue([
      [0.00, 0.25],
      [0.25, 0.35],
      [0.50, 0.50],
      [0.75, 0.30],
      [1.00, 0.18]
    ]);
  }


  /**
   * Dark storm clouds.
   */
  getStormCloudOpacity(): number {
    return this.getTimelineValue([
      [0.00, 0],
      [0.50, 0],
      [0.65, 0.10],
      [0.75, 0.55],
      [0.85, 0.90],
      [0.95, 0.65],
      [1.00, 0.10]
    ]);
  }


  /**
   * Controls the darkness of the storm atmosphere.
   */
  getStormIntensity(): number {
    return this.getTimelineValue([
      [0.00, 0.00],
      [0.50, 0.00],
      [0.65, 0.10],
      [0.75, 0.55],
      [0.85, 1.00],
      [0.95, 0.60],
      [1.00, 0.00]
    ]);
  }


  // ============================================================
  // ATMOSPHERE
  // ============================================================

  /**
   * Controls atmospheric haze.
   */
  getHazeOpacity(): number {
    return this.getTimelineValue([
      [0.00, 0.12],
      [0.25, 0.10],
      [0.50, 0.18],
      [0.75, 0.28],
      [1.00, 0.10]
    ]);
  }


  /**
   * Controls the warm glow around the horizon.
   *
   * The glow becomes strongest toward the final Horizon section.
   */
  getHorizonGlowOpacity(): number {
    return this.getTimelineValue([
      [0.00, 0.08],
      [0.25, 0.12],
      [0.50, 0.05],
      [0.75, 0.02],
      [1.00, 0.45]
    ]);
  }


  // ============================================================
  // WAVES
  // ============================================================

  /**
   * Moves an individual wave from the horizon toward the shore.
   */
  getWaveTransform(start: number, end: number): string {
    const localProgress = this.getLocalProgress(start, end);

    const translateY = (1 - localProgress) * -100;

    return `translateY(${translateY}%)`;
  }


  /**
   * Controls when a wave becomes visible.
   */
  getWaveOpacity(start: number, end: number): number {
    return this.getLocalProgress(start, end);
  }


  /**
   * Controls foam appearing where a wave reaches the shore.
   */
  getShoreFoamOpacity(start: number, end: number): number {
    return this.getLocalProgress(start, end);
  }


  // ============================================================
  // TIMELINE HELPERS
  // ============================================================

  /**
   * Smoothly interpolates between timeline values.
   */
  private getTimelineValue(
    points: [number, number][]
  ): number {

    if (this.progress <= points[0][0]) {
      return points[0][1];
    }

    for (let i = 1; i < points.length; i++) {

      const [endProgress, endValue] = points[i];

      const [startProgress, startValue] = points[i - 1];

      if (this.progress <= endProgress) {

        const localProgress =
          (this.progress - startProgress) /
          (endProgress - startProgress);

        return (
          startValue +
          (endValue - startValue) * localProgress
        );
      }
    }

    return points[points.length - 1][1];
  }


  /**
   * Converts global journey progress into local animation progress.
   */
  private getLocalProgress(
    start: number,
    end: number
  ): number {

    if (this.progress <= start) {
      return 0;
    }

    if (this.progress >= end) {
      return 1;
    }

    return (
      (this.progress - start) /
      (end - start)
    );
  }
}