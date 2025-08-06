'use client';

import { useEffect } from 'react';
import { onThemeTransitionLayer } from '@/lib/theme';

export default function ThemeLayer() {
    useEffect(() => onThemeTransitionLayer(), []);
    return <div className="theme-transition" aria-hidden="true" />;
}