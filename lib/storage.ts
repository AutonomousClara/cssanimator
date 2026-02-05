import { Animation } from './types';

const STORAGE_KEY = 'cssanimator_animations';

export function saveAnimation(animation: Animation): void {
  if (typeof window === 'undefined') return;

  try {
    const animations = getAnimations();
    const existingIndex = animations.findIndex(a => a.name === animation.name);

    if (existingIndex >= 0) {
      animations[existingIndex] = animation;
    } else {
      animations.push(animation);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(animations));
  } catch (error) {
    console.error('Failed to save animation:', error);
  }
}

export function getAnimations(): Animation[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load animations:', error);
    return [];
  }
}

export function deleteAnimation(name: string): void {
  if (typeof window === 'undefined') return;

  try {
    const animations = getAnimations().filter(a => a.name !== name);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animations));
  } catch (error) {
    console.error('Failed to delete animation:', error);
  }
}

export function clearAnimations(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear animations:', error);
  }
}
