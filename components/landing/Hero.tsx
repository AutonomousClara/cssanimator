'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background via-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Create CSS Animations Visually
        </h1>
        <p className="text-xl md:text-2xl text-text/80 mb-8 max-w-2xl mx-auto">
          Build beautiful animations with a drag-and-drop timeline. Preview in real-time and export clean, production-ready code.
        </p>
        <Link href="/editor">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Animating →
          </Button>
        </Link>
      </motion.div>

      {/* Animated Demo */}
      <motion.div
        className="mt-16 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div
            className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent"
            animate={{
              y: [0, -30, 0, -15, 0],
              scale: [1, 1, 1, 1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <p className="text-center text-text/60 text-sm mt-4">Live Animation Preview</p>
      </motion.div>
    </section>
  );
}
