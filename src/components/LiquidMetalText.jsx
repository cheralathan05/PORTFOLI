import React from 'react';

export default function LiquidMetalText({
  children,
  colors = ['#ffffff', '#8d9aa6', '#ffffff', '#26323b'],
  speed = 6,
  className = '',
  as: Component = 'span',
  ...props
}) {
  const gradient = `linear-gradient(110deg, ${colors.join(', ')})`;

  return (
    <Component
      className={`liquid-metal-shimmer ${className}`.trim()}
      style={{
        backgroundImage: gradient,
        backgroundSize: '240% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        display: 'inline-block',
        animation: `liquidMetalFlow ${speed * 1.5}s ease-in-out infinite alternate`,
        willChange: 'background-position',
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

