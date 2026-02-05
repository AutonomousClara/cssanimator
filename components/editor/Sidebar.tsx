'use client';

import React from 'react';
import { Animation, Keyframe } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { PropertyEditor } from './PropertyEditor';

interface SidebarProps {
  animation: Animation;
  selectedKeyframe: Keyframe | null;
  onSelectKeyframe: (keyframe: Keyframe) => void;
  onAddKeyframe: () => void;
  onRemoveKeyframe: (id: string) => void;
  onUpdateKeyframe: (id: string, updates: Partial<Keyframe>) => void;
}

export function Sidebar({
  animation,
  selectedKeyframe,
  onSelectKeyframe,
  onAddKeyframe,
  onRemoveKeyframe,
  onUpdateKeyframe,
}: SidebarProps) {
  return (
    <div className="bg-surface p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-text mb-6">Keyframes</h2>

      {/* Keyframe List */}
      <div className="space-y-2 mb-6">
        {animation.keyframes.map((kf) => (
          <button
            key={kf.id}
            onClick={() => onSelectKeyframe(kf)}
            className={`w-full p-3 rounded-lg text-left transition-all ${
              selectedKeyframe?.id === kf.id
                ? 'bg-primary text-white'
                : 'bg-background hover:bg-background/80 text-text'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{kf.position}%</span>
              {kf.position !== 0 && kf.position !== 100 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveKeyframe(kf.id);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          </button>
        ))}
      </div>

      <Button onClick={onAddKeyframe} className="w-full mb-6">
        + Add Keyframe
      </Button>

      {/* Property Editor */}
      {selectedKeyframe && (
        <PropertyEditor
          keyframe={selectedKeyframe}
          onUpdate={(updates) => onUpdateKeyframe(selectedKeyframe.id, updates)}
        />
      )}
    </div>
  );
}
