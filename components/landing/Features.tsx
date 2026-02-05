'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '📊',
    title: 'Visual Timeline',
    description: 'Drag and drop keyframes like a video editor. Control every aspect of your animation visually.',
  },
  {
    icon: '⚡',
    title: 'Real-time Preview',
    description: 'See your animation come to life instantly. Play, pause, and loop to perfect every detail.',
  },
  {
    icon: '💻',
    title: 'Export Clean Code',
    description: 'Get production-ready CSS @keyframes or Tailwind config. Copy and use immediately.',
  },
  {
    icon: '🎨',
    title: 'Multi-property Support',
    description: 'Animate transforms, opacity, and more. Combine multiple properties for complex effects.',
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-text/70">
            Professional animation tools, simplified
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background p-6 rounded-xl hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-text/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
