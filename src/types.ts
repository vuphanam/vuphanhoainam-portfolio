/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Particle {
  id: string;
  x: number; // horizontal starting percentage (0-100)
  size: number; // pixel size
  speed: number; // velocity multiplier
  drift: number; // drift multiplier
  color?: string; // pastel color for balloons
  angle?: number; // rotation or sway offset
  stringSway?: number; // sway variation for balloon string
}

export interface AnimationSession {
  id: string;
  type: 'snowflakes' | 'balloons';
  startTime: number;
  durationMs: number;
}
