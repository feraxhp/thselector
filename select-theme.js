const selector = document.getElementById("fth-select");

if (selector) {
    const OPTIONS = {
        light: { id: 'fth-olight', text: 'Light' },
        dark: { id: 'fth-odark', text: 'Dark' },
        system: { id: 'fth-osystem', text: 'System' }
    };

    function createOption(theme, config) {
        let option = document.getElementById(config.id);
        if (!option) {
            option = document.createElement("option");
            option.id = config.id;
            option.value = theme;
            option.textContent = config.text;
            selector.appendChild(option);
        }
        return option;
    }

    const options = Object.entries(OPTIONS).reduce((acc, [theme, config]) => {
        acc[theme] = createOption(theme, config);
        return acc;
    }, {});

    const currentTheme = localStorage.getItem('[fx-theme]') ?? 'system';
    options[currentTheme].selected = true;

    selector.addEventListener("change", (event) => {
        const newTheme = event.target.value;
        window.th.setTheme(newTheme);
    });
}