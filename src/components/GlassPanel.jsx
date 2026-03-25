import React from 'react';
import { cn } from '../lib/utils';

export function GlassPanel({ children, className, intensity = 'medium', ...props }) {
    const intensityClasses = {
        light: 'bg-white/5 backdrop-blur-md border-white/5',
        medium: 'bg-white/10 backdrop-blur-xl border-white/10',
        heavy: 'bg-white/15 backdrop-blur-2xl border-white/20',
    };

    return (
        <div
            className={cn(
                'rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300',
                intensityClasses[intensity],
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 h-full w-full">{children}</div>
        </div>
    );
}
