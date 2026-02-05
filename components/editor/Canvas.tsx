'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [animationKey, setAnimationKey] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject CSS @keyframes into DOM
  useEffect(() => {
    // Generate CSS @keyframes from animation data
    const generateKeyframesCSS = () => {
    const sortedKeyframes = [...animation.keyframes].sort((a, b) => a.position - b.position);
    
    const keyframeRules = sortedKeyframes.map(kf => {
      const transforms: string[] = [];
      
      if (kf.transform.translateX !== 0) transforms.push(`translateX(${kf.transform.translateX}px)`);
      if (kf.transform.translateY !== 0) transforms.push(`translateY(${kf.transform.translateY}px)`);
      if (kf.transform.scale !== 1) transforms.push(`scale(${kf.transform.scale})`);
      if (kf.transform.rotate !== 0) transforms.push(`rotate(${kf.transform.rotate}deg)`);
      
      const transformRule = transforms.length > 0 ? `transform: ${transforms.join(' ')};` : '';
      const opacityRule = `opacity: ${kf.opacity};`;
      
      return `${kf.position}% { ${transformRule} ${opacityRule} }`;
    }).join('\n  ');

    return `
@keyframes previewAnimation {
  ${keyframeRules}
}`;
    };

    // Remove old style if exists
    if (styleRef.current) {
      styleRef.current.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.textContent = generateKeyframesCSS();
    document.head.appendChild(style);
    styleRef.current = style;

    // Cleanup on unmount
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
      }
    };
  }, [animation.keyframes, animation.duration]);

  // Generate animation CSS property
  const getAnimationStyle = (): React.CSSProperties => {
    if (!isPlaying) {
      return {
        animationPlayState: 'paused',
      };
    }

    return {
      animation: `previewAnimation ${animation.duration}s ease ${loop ? 'infinite' : '1'} normal`,
      animationPlayState: 'running',
    };
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      // Starting animation - force re-render with new key
      setAnimationKey(prev => prev + 1);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Force re-render by updating key
    setAnimationKey(prev => prev + 1);
    
    // Restart animation after reset
    setTimeout(() => {
      setIsPlaying(true);
    }, 50);
  };

  return (
    <div className="flex-1 bg-background p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-text mb-6">Preview</h2>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center bg-surface rounded-lg mb-6 min-h-[300px] relative overflow-hidden">
        <div
          key={animationKey}
          ref={elementRef}
          className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent"
          style={getAnimationStyle()}
        />
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
