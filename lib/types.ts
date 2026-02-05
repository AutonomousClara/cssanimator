export type Easing = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

export type Keyframe = {
  id: string;
  position: number; // 0-100
  transform: {
    translateX: number;
    translateY: number;
    scale: number;
    rotate: number;
  };
  opacity: number;
  easing: Easing;
};

export type Animation = {
  name: string;
  duration: number; // seconds
  iterationCount: number | 'infinite';
  direction: 'normal' | 'reverse' | 'alternate';
  keyframes: Keyframe[];
};

export type Preset = {
  name: string;
  description: string;
  animation: Omit<Animation, 'name'>;
};
