'use client';

import React, { useState, useMemo } from 'react';
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

  // Generate complete HTML for preview
  const generatePreviewHTML = useMemo(() => {
    // Safeguard: ensure duration is valid (prevent race condition on first render)
    const safeDuration = Math.max(animation.duration || 2, 0.1);
    
    const sortedKeyframes = [...animation.keyframes].sort((a, b) => a.position - b.position);
    
    const keyframeRules = sortedKeyframes.map(kf => {
      const transforms: string[] = [];
      
      if (kf.transform.translateX !== 0) transforms.push(`translateX(${kf.transform.translateX}px)`);
      if (kf.transform.translateY !== 0) transforms.push(`translateY(${kf.transform.translateY}px)`);
      if (kf.transform.scale !== 1) transforms.push(`scale(${kf.transform.scale})`);
      if (kf.transform.rotate !== 0) transforms.push(`rotate(${kf.transform.rotate}deg)`);
      
      const transformRule = transforms.length > 0 ? `transform: ${transforms.join(' ')};` : '';
      const opacityRule = `opacity: ${kf.opacity};`;
      
      return `  ${kf.position}% { ${transformRule} ${opacityRule} }`;
    }).join('\n');

    const animationCSS = isPlaying
      ? `animation: previewAnimation ${safeDuration}s ease ${loop ? 'infinite' : '1'} normal;`
      : 'animation: none;';

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSSAnimator Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a2e;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    @keyframes previewAnimation {
${keyframeRules}
    }
    #element {
      width: 120px;
      height: 120px;
      border-radius: 0.75rem;
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
      ${animationCSS}
    }
    .controls {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }
    .play-btn {
      background: #8b5cf6;
      color: white;
    }
    .play-btn:hover {
      background: #7c3aed;
      transform: scale(1.05);
    }
    .info {
      position: fixed;
      top: 30px;
      right: 30px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div id="element"></div>
  <div class="info">
    Duration: ${safeDuration}s | Keyframes: ${animation.keyframes.length} | Loop: ${loop ? 'On' : 'Off'}
  </div>
  <div class="controls">
    <button class="play-btn" onclick="toggleAnimation()">
      <span id="play-text">${isPlaying ? '⏸ Pause' : '▶ Play'}</span>
    </button>
    <button class="play-btn" onclick="resetAnimation()">⟲ Reset</button>
  </div>
  
  <script>
    let playing = ${isPlaying};
    const element = document.getElementById('element');
    const playText = document.getElementById('play-text');
    
    function toggleAnimation() {
      playing = !playing;
      if (playing) {
        element.style.animation = 'previewAnimation ${safeDuration}s ease ${loop ? 'infinite' : '1'} normal';
        playText.textContent = '⏸ Pause';
      } else {
        element.style.animationPlayState = 'paused';
        playText.textContent = '▶ Play';
      }
    }
    
    function resetAnimation() {
      element.style.animation = 'none';
      setTimeout(() => {
        element.style.animation = 'previewAnimation ${safeDuration}s ease ${loop ? 'infinite' : '1'} normal';
        playing = true;
        playText.textContent = '⏸ Pause';
      }, 10);
    }
    
    // Auto-play on load
    ${isPlaying ? 'setTimeout(() => toggleAnimation(), 100);' : ''}
  </script>
</body>
</html>`;
  }, [animation.keyframes, animation.duration, isPlaying, loop]);

  const openPreview = () => {
    const previewWindow = window.open('', 'CSSAnimator Preview', 'width=800,height=600');
    if (previewWindow) {
      previewWindow.document.write(generatePreviewHTML);
      previewWindow.document.close();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 50);
  };

  return (
    <div className="flex-1 bg-background p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-text mb-6">Preview</h2>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-surface rounded-lg mb-6 min-h-[300px] relative overflow-hidden">
        {/* Static preview element */}
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent" />
        
        {/* Info text */}
        <div className="mt-6 text-center text-text/60 text-sm space-y-2">
          <p>Static preview • Click below to see animation in action</p>
          <Button onClick={openPreview} variant="primary">
            🚀 Open Preview in New Tab
          </Button>
        </div>
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
