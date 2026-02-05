import { Preset } from './types';
import { createDefaultKeyframe } from './animation';

export const presets: Preset[] = [
  {
    name: 'Bounce',
    description: 'Bouncing animation with scale effect',
    animation: {
      duration: 1,
      iterationCount: 'infinite',
      direction: 'normal',
      keyframes: [
        {
          ...createDefaultKeyframe(0),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
        {
          ...createDefaultKeyframe(25),
          transform: { translateX: 0, translateY: -30, scale: 1, rotate: 0 },
          opacity: 1,
        },
        {
          ...createDefaultKeyframe(50),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
        {
          ...createDefaultKeyframe(75),
          transform: { translateX: 0, translateY: -15, scale: 1, rotate: 0 },
          opacity: 1,
        },
        {
          ...createDefaultKeyframe(100),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
      ],
    },
  },
  {
    name: 'FadeIn',
    description: 'Simple fade in effect',
    animation: {
      duration: 1,
      iterationCount: 1,
      direction: 'normal',
      keyframes: [
        {
          ...createDefaultKeyframe(0),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 0,
        },
        {
          ...createDefaultKeyframe(100),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
      ],
    },
  },
  {
    name: 'SlideUp',
    description: 'Slide up from bottom with fade',
    animation: {
      duration: 0.8,
      iterationCount: 1,
      direction: 'normal',
      keyframes: [
        {
          ...createDefaultKeyframe(0),
          transform: { translateX: 0, translateY: 50, scale: 1, rotate: 0 },
          opacity: 0,
        },
        {
          ...createDefaultKeyframe(100),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
      ],
    },
  },
  {
    name: 'RotateIn',
    description: 'Rotate and scale in effect',
    animation: {
      duration: 1,
      iterationCount: 1,
      direction: 'normal',
      keyframes: [
        {
          ...createDefaultKeyframe(0),
          transform: { translateX: 0, translateY: 0, scale: 0, rotate: -180 },
          opacity: 0,
        },
        {
          ...createDefaultKeyframe(100),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
      ],
    },
  },
  {
    name: 'Pulse',
    description: 'Pulsing scale animation',
    animation: {
      duration: 2,
      iterationCount: 'infinite',
      direction: 'normal',
      keyframes: [
        {
          ...createDefaultKeyframe(0),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
        {
          ...createDefaultKeyframe(50),
          transform: { translateX: 0, translateY: 0, scale: 1.05, rotate: 0 },
          opacity: 0.9,
        },
        {
          ...createDefaultKeyframe(100),
          transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
          opacity: 1,
        },
      ],
    },
  },
];
