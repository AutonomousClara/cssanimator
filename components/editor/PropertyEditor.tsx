'use client';

import React from 'react';
import { Keyframe, Easing } from '@/lib/types';
import { Slider } from '@/components/ui/Slider';

interface PropertyEditorProps {
  keyframe: Keyframe;
  onUpdate: (updates: Partial<Keyframe>) => void;
}

export function PropertyEditor({ keyframe, onUpdate }: PropertyEditorProps) {
  const easingOptions: Easing[] = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-text mb-4">Properties</h3>

      {/* Transform Controls */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-text/80 uppercase">Transform</h4>

        <Slider
          label="Translate X"
          value={keyframe.transform.translateX}
          onChange={(value) =>
            onUpdate({ transform: { ...keyframe.transform, translateX: value } })
          }
          min={-200}
          max={200}
          step={1}
          unit="px"
        />

        <Slider
          label="Translate Y"
          value={keyframe.transform.translateY}
          onChange={(value) =>
            onUpdate({ transform: { ...keyframe.transform, translateY: value } })
          }
          min={-200}
          max={200}
          step={1}
          unit="px"
        />

        <Slider
          label="Scale"
          value={keyframe.transform.scale}
          onChange={(value) =>
            onUpdate({ transform: { ...keyframe.transform, scale: value } })
          }
          min={0}
          max={2}
          step={0.1}
        />

        <Slider
          label="Rotate"
          value={keyframe.transform.rotate}
          onChange={(value) =>
            onUpdate({ transform: { ...keyframe.transform, rotate: value } })
          }
          min={-360}
          max={360}
          step={1}
          unit="°"
        />
      </div>

      {/* Opacity */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-text/80 uppercase">Opacity</h4>
        <Slider
          label="Opacity"
          value={keyframe.opacity}
          onChange={(value) => onUpdate({ opacity: value })}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      {/* Easing */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-text/80 uppercase">Easing</label>
        <select
          value={keyframe.easing}
          onChange={(e) => onUpdate({ easing: e.target.value as Easing })}
          className="w-full p-2 bg-background text-text rounded-lg border border-surface focus:border-primary focus:outline-none"
        >
          {easingOptions.map((easing) => (
            <option key={easing} value={easing}>
              {easing}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
