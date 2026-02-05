'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Animation, Keyframe } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Timeline } from './Timeline';

interface CanvasProps {
  animation: Animation;
  selectedKeyframe: Keyframe | null;
  onSelectKeyframe: (keyframe: Keyframe) => void;
  onUpdateKeyframePosition: (id: string, position: number) => void;
  onUpdateDuration: (duration: number) => void;
}

export function Canvas({
  animation,
  selectedKeyframe,
  onSelectKeyframe,
  onUpdateKeyframePosition,
  onUpdateDuration,
}: CanvasProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(true);

  // Convert keyframes to Framer Motion keyframes
  const generateMotionKeyframes = () => {
    const sortedKeyframes = [...animation.keyframes].sort((a, b) => a.position - b.position);

    return {
      x: sortedKeyframes.map(kf => kf.transform.translateX),
      y: sortedKeyframes.map(kf => kf.transform.translateY),
      scale: sortedKeyframes.map(kf => kf.transform.scale),
      rotate: sortedKeyframes.map(kf => kf.transform.rotate),
      opacity: sortedKeyframes.map(kf => kf.opacity),
    };
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Force re-render by toggling key
    setTimeout(() => setIsPlaying(true), 10);
  };

  return (
    <div className="flex-1 bg-background p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-text mb-6">Preview</h2>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center bg-surface rounded-lg mb-6 min-h-[300px] relative overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={isPlaying ? 'playing' : 'paused'}
            className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent"
            initial={false}
            animate={isPlaying ? generateMotionKeyframes() : {}}
            transition={{
              duration: animation.duration,
              times: animation.keyframes.map(kf => kf.position / 100),
              repeat: loop && isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Playback Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <Button onClick={handlePlayPause} variant="primary">
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </Button>
          <Button onClick={handleReset} variant="outline">
            ⟲ Reset
          </Button>
          <label className="flex items-center gap-2 ml-auto">
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-text text-sm">Loop</span>
          </label>
        </div>

        <Slider
          label="Duration"
          value={animation.duration}
          onChange={onUpdateDuration}
          min={0.5}
          max={5}
          step={0.1}
          unit="s"
        />
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-text/80 uppercase">Timeline</h3>
        <Timeline
          keyframes={animation.keyframes}
          selectedKeyframe={selectedKeyframe}
          onSelectKeyframe={onSelectKeyframe}
          onUpdateKeyframePosition={onUpdateKeyframePosition}
        />
      </div>
    </div>
  );
}
