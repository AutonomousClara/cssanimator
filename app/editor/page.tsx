'use client';

import React, { useState } from 'react';
import { useAnimation } from '@/hooks/useAnimation';
import { Sidebar } from '@/components/editor/Sidebar';
import { Canvas } from '@/components/editor/Canvas';
import { ExportPanel } from '@/components/editor/ExportPanel';
import { Button } from '@/components/ui/Button';
import { presets } from '@/lib/presets';
import { Keyframe } from '@/lib/types';
import Link from 'next/link';

export default function EditorPage() {
  const {
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
  } = useAnimation();

  const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe | null>(
    animation.keyframes[0] || null
  );
  const [showPresets, setShowPresets] = useState(false);

  const handleAddKeyframe = () => {
    // Find a position that doesn't exist yet
    const existingPositions = animation.keyframes.map(kf => kf.position);
    let newPosition = 50;

    for (let i = 1; i < 100; i++) {
      if (!existingPositions.includes(i)) {
        newPosition = i;
        break;
      }
    }

    addKeyframe(newPosition);
  };

  const handleLoadPreset = (presetName: string) => {
    const preset = presets.find(p => p.name === presetName);
    if (preset) {
      loadAnimation({
        name: presetName,
        ...preset.animation,
      });
      setSelectedKeyframe(preset.animation.keyframes[0] || null);
      setShowPresets(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              CSSAnimator
            </Link>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPresets(!showPresets)}
              >
                📦 Presets
              </Button>
              {showPresets && (
                <div className="absolute top-full mt-2 left-0 bg-surface border border-background rounded-lg shadow-lg p-2 min-w-[200px] z-10">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleLoadPreset(preset.name)}
                      className="w-full text-left px-4 py-2 rounded hover:bg-background text-text transition-colors"
                    >
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-xs text-text/60">{preset.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Editor Layout */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 border-r border-background overflow-y-auto">
          <Sidebar
            animation={animation}
            selectedKeyframe={selectedKeyframe}
            onSelectKeyframe={setSelectedKeyframe}
            onAddKeyframe={handleAddKeyframe}
            onRemoveKeyframe={removeKeyframe}
            onUpdateKeyframe={updateKeyframe}
          />
        </div>

        {/* Canvas - Center */}
        <div className="flex-1 min-w-0">
          <Canvas
            animation={animation}
            selectedKeyframe={selectedKeyframe}
            onSelectKeyframe={setSelectedKeyframe}
            onUpdateKeyframePosition={updateKeyframePosition}
            onUpdateDuration={updateDuration}
          />
        </div>

        {/* Export Panel - Desktop */}
        <div className="hidden lg:block w-96 border-l border-background overflow-y-auto">
          <ExportPanel
            animation={animation}
            onUpdateName={updateName}
            onUpdateIterationCount={updateIterationCount}
            onUpdateDirection={updateDirection}
          />
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-background p-2 flex gap-2">
        <Button size="sm" className="flex-1">
          Properties
        </Button>
        <Button size="sm" className="flex-1">
          Export
        </Button>
      </div>
    </div>
  );
}
