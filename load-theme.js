const THEME_STORAGE_KEY = '[fx-theme]';
const META_ID = 'fth-meta';

window.th = {
    verbose: false,
    themes: {
        light: 'light',
        dark: 'dark',
        system: 'dark light'
    },

    onThemeChange() { },
    setMetaTag(content) {
        let meta = document.getElementById(META_ID);
        if (!meta) {
            meta = document.createElement('meta');
            meta.id = META_ID;
            meta.name = 'color-scheme';
            document.head.appendChild(meta);
        }
        meta.content = content;
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
        
        this.setMetaTag(this.themes[theme] || this.themes.system);
        
        const finalTheme = theme === 'system' ? this.getSystemTheme() : theme;
        
        document.documentElement.setAttribute('theme', finalTheme);
        
        try { localStorage.setItem(THEME_STORAGE_KEY, theme); }
        catch (e) { 
          if (this.verbose) console.debug("Error saving the theme:", e)
        }
        
        this.dispatchThemeChangeEvent(finalTheme);
        
        return finalTheme;
    },
    
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('th-changed', { detail: { theme } });
        document.dispatchEvent(event);
    },
    
    init() {
      try {
          const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) ?? 'system';
          this.setTheme(savedTheme);
      } catch (error) {
          if (this.verbose) console.debug('Error loading theme:', error);
          this.setTheme('system');
      }
      
      if (!('matchMedia' in window)) {
        if (this.verbose) console.debug("The 'matchMedia' parameter is not present")
      }
      
      const listener = () => {
        const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (currentTheme === 'system') { this.setTheme('system'); }
      }
      
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
      
      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
      }
    }
}

window.th.remove = window.th.init();
