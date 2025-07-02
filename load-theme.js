const THEME_STORAGE_KEY = '[fx-theme]';
const META_ID = 'fth-meta';

window.th = {
    themes: {
        light: 'light',
        dark: 'dark',
        system: 'dark light'
    },

    createMetaTag(content) {
        const meta = document.createElement('meta');
        meta.id = META_ID;
        meta.name = 'color-scheme';
        meta.content = content;
        return meta;
    },

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    },

    setTheme(theme) {
        if (!(theme in this.themes)) {
            console.warn(`Invalid theme: ${theme}. Falling back to system theme.`);
            theme = 'system';
        }
        
        let meta = document.getElementById(META_ID);
        if (!meta) {
            meta = this.createMetaTag(this.themes[theme]);
            document.head.appendChild(meta);
        } else {
            meta.content = this.themes[theme];
        }
        
        const finalTheme = theme === 'system' ? this.getSystemTheme() : theme;
        document.documentElement.setAttribute('theme', finalTheme);
        
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    
        return finalTheme;
    }
}

try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) ?? 'system';
    window.th.setTheme(savedTheme);
} catch (error) {
    console.error('Error loading theme:', error);
    window.th.setTheme('system');
}

if ('matchMedia' in window) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (currentTheme === 'system') { window.th.setTheme('system'); }
        });
}