'use client';

import React, { useRef, useState } from 'react';
import { Keyframe } from '@/lib/types';

interface TimelineProps {
  keyframes: Keyframe[];
  selectedKeyframe: Keyframe | null;
  onSelectKeyframe: (keyframe: Keyframe) => void;
  onUpdateKeyframePosition: (id: string, position: number) => void;
}

export function Timeline({
  keyframes,
  selectedKeyframe,
  onSelectKeyframe,
  onUpdateKeyframePosition,
}: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [draggedKeyframe, setDraggedKeyframe] = useState<string | null>(null);

  const handleMarkerMouseDown = (e: React.MouseEvent, keyframe: Keyframe) => {
    e.preventDefault();
    if (keyframe.position === 0 || keyframe.position === 100) return; // Don't allow dragging 0% and 100%

    setDraggedKeyframe(keyframe.id);
    onSelectKeyframe(keyframe);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedKeyframe || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    onUpdateKeyframePosition(draggedKeyframe, Math.round(percentage));
  };

  const handleMouseUp = () => {
    setDraggedKeyframe(null);
  };

  React.useEffect(() => {
    if (draggedKeyframe) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggedKeyframe]);

  return (
    <div className="relative w-full">
      <div
        ref={timelineRef}
        className="relative h-16 bg-surface rounded-lg"
      >
        {/* Timeline track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-background -translate-y-1/2" />

        {/* Percentage markers */}
        <div className="absolute inset-0 flex justify-between px-2 items-end pb-1">
          {[0, 25, 50, 75, 100].map((percent) => (
            <div key={percent} className="flex flex-col items-center">
              <span className="text-xs text-text/50">{percent}%</span>
            </div>
          ))}
        </div>

        {/* Keyframe markers */}
        {keyframes.map((kf) => (
          <div
            key={kf.id}
            style={{ left: `${kf.position}%` }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <button
              onMouseDown={(e) => handleMarkerMouseDown(e, kf)}
              onClick={() => onSelectKeyframe(kf)}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                selectedKeyframe?.id === kf.id
                  ? 'bg-primary border-white scale-125'
                  : 'bg-accent border-white hover:scale-110'
              } ${
                kf.position === 0 || kf.position === 100
                  ? 'cursor-default'
                  : 'cursor-move'
              }`}
              title={`${kf.position}%`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
