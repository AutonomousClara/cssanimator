'use client';

import React, { useState } from 'react';
import { Animation } from '@/lib/types';
import { generateCSSCode, generateTailwindCode } from '@/lib/animation';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface ExportPanelProps {
  animation: Animation;
  onUpdateName: (name: string) => void;
  onUpdateIterationCount: (count: number | 'infinite') => void;
  onUpdateDirection: (direction: Animation['direction']) => void;
}

type Tab = 'css' | 'tailwind' | 'settings';

export function ExportPanel({
  animation,
  onUpdateName,
  onUpdateIterationCount,
  onUpdateDirection,
}: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('css');

  const cssCode = generateCSSCode(animation);
  const tailwindCode = generateTailwindCode(animation);

  return (
    <div className="bg-surface p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-text mb-6">Export</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-background">
        {(['css', 'tailwind', 'settings'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-text/60 hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'css' && (
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">CSS Code</h3>
            <CodeBlock code={cssCode} language="css" />
          </div>
        )}

        {activeTab === 'tailwind' && (
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Tailwind Config</h3>
            <CodeBlock code={tailwindCode} language="javascript" />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text mb-4">Animation Settings</h3>

            {/* Animation Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Animation Name</label>
              <input
                type="text"
                value={animation.name}
                onChange={(e) => onUpdateName(e.target.value)}
                className="w-full p-2 bg-background text-text rounded-lg border border-surface focus:border-primary focus:outline-none"
              />
            </div>

            {/* Iteration Count */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Iteration Count</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={animation.iterationCount === 'infinite' ? 1 : animation.iterationCount}
                  onChange={(e) => onUpdateIterationCount(parseInt(e.target.value))}
                  disabled={animation.iterationCount === 'infinite'}
                  className="flex-1 p-2 bg-background text-text rounded-lg border border-surface focus:border-primary focus:outline-none disabled:opacity-50"
                />
                <label className="flex items-center gap-2 px-3 bg-background rounded-lg border border-surface">
                  <input
                    type="checkbox"
                    checked={animation.iterationCount === 'infinite'}
                    onChange={(e) =>
                      onUpdateIterationCount(e.target.checked ? 'infinite' : 1)
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-text text-sm">Infinite</span>
                </label>
              </div>
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Direction</label>
              <select
                value={animation.direction}
                onChange={(e) =>
                  onUpdateDirection(e.target.value as Animation['direction'])
                }
                className="w-full p-2 bg-background text-text rounded-lg border border-surface focus:border-primary focus:outline-none"
              >
                <option value="normal">Normal</option>
                <option value="reverse">Reverse</option>
                <option value="alternate">Alternate</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
