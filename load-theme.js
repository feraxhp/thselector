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
          if (window.th.verbose) console.debug("Error saving the theme:", e)
        }
        
        try { window.th.onThemeChange(finalTheme); }
        catch(e) {
          if (window.th.verbose) console.debug("Error in custom 'onThemeChange':", e)
        }
        
        return finalTheme;
    },
    
    init() {
      try {
          const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) ?? 'system';
          window.th.setTheme(savedTheme);
      } catch (error) {
          if (window.th.verbose) console.debug('Error loading theme:', error);
          window.th.setTheme('system');
      }
      
      if (!('matchMedia' in window)) {
        if (window.th.verbose) console.debug("The 'matchMedia' parameter is not present")
      }
      
      const listener = () => {
        const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (currentTheme === 'system') { window.th.setTheme('system'); }
      }
      
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
      
      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
      }
    }
}

window.th.remove = window.th.init();
