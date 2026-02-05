'use client';

import { useState, useCallback } from 'react';
import { Animation, Keyframe } from '@/lib/types';
import { createDefaultKeyframe } from '@/lib/animation';

export function useAnimation(initialAnimation?: Animation) {
  const [animation, setAnimation] = useState<Animation>(
    initialAnimation || {
      name: 'myAnimation',
      duration: 2,
      iterationCount: 1,
      direction: 'normal',
      keyframes: [
        createDefaultKeyframe(0),
        createDefaultKeyframe(100),
      ],
    }
  );

  const updateName = useCallback((name: string) => {
    setAnimation((prev) => ({ ...prev, name }));
  }, []);

  const updateDuration = useCallback((duration: number) => {
    setAnimation((prev) => ({ ...prev, duration }));
  }, []);

  const updateIterationCount = useCallback((iterationCount: number | 'infinite') => {
    setAnimation((prev) => ({ ...prev, iterationCount }));
  }, []);

  const updateDirection = useCallback((direction: Animation['direction']) => {
    setAnimation((prev) => ({ ...prev, direction }));
  }, []);

  const addKeyframe = useCallback((position: number) => {
    setAnimation((prev) => {
      const newKeyframe = createDefaultKeyframe(position);
      return {
        ...prev,
        keyframes: [...prev.keyframes, newKeyframe].sort((a, b) => a.position - b.position),
      };
    });
  }, []);

  const removeKeyframe = useCallback((id: string) => {
    setAnimation((prev) => ({
      ...prev,
      keyframes: prev.keyframes.filter((kf) => kf.id !== id),
    }));
  }, []);

  const updateKeyframe = useCallback((id: string, updates: Partial<Keyframe>) => {
    setAnimation((prev) => ({
      ...prev,
      keyframes: prev.keyframes.map((kf) =>
        kf.id === id ? { ...kf, ...updates } : kf
      ),
    }));
  }, []);

  const updateKeyframePosition = useCallback((id: string, position: number) => {
    setAnimation((prev) => ({
      ...prev,
      keyframes: prev.keyframes
        .map((kf) => (kf.id === id ? { ...kf, position } : kf))
        .sort((a, b) => a.position - b.position),
    }));
  }, []);

  const loadAnimation = useCallback((newAnimation: Animation) => {
    setAnimation(newAnimation);
  }, []);

  const resetAnimation = useCallback(() => {
    setAnimation({
      name: 'myAnimation',
      duration: 2,
      iterationCount: 1,
      direction: 'normal',
      keyframes: [
        createDefaultKeyframe(0),
        createDefaultKeyframe(100),
      ],
    });
  }, []);

  return {
    animation,
    updateName,
    updateDuration,
    updateIterationCount,
    updateDirection,
    addKeyframe,
    removeKeyframe,
    updateKeyframe,
    updateKeyframePosition,
    loadAnimation,
    resetAnimation,
  };
}
