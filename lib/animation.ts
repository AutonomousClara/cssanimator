import { Animation, Keyframe } from './types';

export function generateCSSCode(animation: Animation): string {
  const { name, duration, iterationCount, direction, keyframes } = animation;

  // Sort keyframes by position
  const sortedKeyframes = [...keyframes].sort((a, b) => a.position - b.position);

  // Generate @keyframes rule
  const keyframesRule = sortedKeyframes
    .map((kf) => {
      const transforms = [];
      if (kf.transform.translateX !== 0) transforms.push(`translateX(${kf.transform.translateX}px)`);
      if (kf.transform.translateY !== 0) transforms.push(`translateY(${kf.transform.translateY}px)`);
      if (kf.transform.scale !== 1) transforms.push(`scale(${kf.transform.scale})`);
      if (kf.transform.rotate !== 0) transforms.push(`rotate(${kf.transform.rotate}deg)`);

      const transformStr = transforms.length > 0 ? `transform: ${transforms.join(' ')};` : '';
      const opacityStr = `opacity: ${kf.opacity};`;

      return `  ${kf.position}% {\n    ${transformStr}${transformStr ? '\n    ' : ''}${opacityStr}\n  }`;
    })
    .join('\n');

  const iterationValue = iterationCount === 'infinite' ? 'infinite' : iterationCount;

  return `@keyframes ${name} {
${keyframesRule}
}

.animated-element {
  animation: ${name} ${duration}s ${sortedKeyframes[0]?.easing || 'ease'} ${iterationValue} ${direction};
}`;
}

export function generateTailwindCode(animation: Animation): string {
  const { name, duration, iterationCount, keyframes } = animation;

  const sortedKeyframes = [...keyframes].sort((a, b) => a.position - b.position);

  const keyframesRule = sortedKeyframes
    .map((kf) => {
      const transforms = [];
      if (kf.transform.translateX !== 0) transforms.push(`translateX(${kf.transform.translateX}px)`);
      if (kf.transform.translateY !== 0) transforms.push(`translateY(${kf.transform.translateY}px)`);
      if (kf.transform.scale !== 1) transforms.push(`scale(${kf.transform.scale})`);
      if (kf.transform.rotate !== 0) transforms.push(`rotate(${kf.transform.rotate}deg)`);

      const transformStr = transforms.length > 0 ? `transform: ${transforms.join(' ')};` : '';
      const opacityStr = `opacity: ${kf.opacity};`;

      return `    '${kf.position}%': { ${transformStr}${transformStr ? ' ' : ''}${opacityStr} }`;
    })
    .join(',\n');

  const iterationValue = iterationCount === 'infinite' ? 'infinite' : iterationCount;

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        ${name}: {
${keyframesRule}
        }
      },
      animation: {
        '${name}': '${name} ${duration}s ${sortedKeyframes[0]?.easing || 'ease'} ${iterationValue}'
      }
    }
  }
}

// Usage: className="animate-${name}"`;
}

export function createDefaultKeyframe(position: number): Keyframe {
  return {
    id: `kf-${Date.now()}-${Math.random()}`,
    position,
    transform: {
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotate: 0,
    },
    opacity: 1,
    easing: 'ease',
  };
}
