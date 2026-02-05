'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';

interface CodeBlockProps {
  code: string;
  language: 'css' | 'javascript';
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 text-xs bg-surface hover:bg-surface/80 text-text rounded transition-colors z-10"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="!bg-[#2d2d2d] !p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
