let layer: HTMLDivElement | null = null;

export function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) document.documentElement.classList.add(stored as 'light' | 'dark');
}

export function onThemeTransitionLayer() {
    layer = document.querySelector('.theme-transition');
}

export function toggleTheme(e: React.MouseEvent<HTMLButtonElement>) {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    const button = e.currentTarget;
    
    // Disable button during animation
    button.disabled = true;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = next === 'dark' ? '#000' : '#fff';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    
    document.body.appendChild(overlay);

    // Fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '0.3';
    });

    // Switch theme with fade effect
    setTimeout(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(next);
        localStorage.setItem('theme', next);
        
        // Fade out
        overlay.style.opacity = '0';
        button.disabled = false;
        
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }, 300);

    // Accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(next);
        localStorage.setItem('theme', next);
    }
}
