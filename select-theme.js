const selector = document.getElementById("fth-select");

if (selector) {
    const OPTIONS = {
        light: { id: 'fth-olight', text: 'Light', value: 'light' },
        dark: { id: 'fth-odark', text: 'Dark', value: 'dark' },
        system: { id: 'fth-osystem', text: 'System', value: 'system' }
    };

    function createOrUpdateOption(theme, config) {
        let option = document.getElementById(config.id);

        if (!option) {
            option = document.createElement("option");
            option.id = config.id;
            option.value = config.value; // Usa el valor definido en OPTIONS
            option.textContent = config.text;
            selector.appendChild(option);
        }
        return option;
    }

    const options = Object.values(OPTIONS).map(config => createOrUpdateOption(config.value, config));


    function setSelectedOption(theme) {
        const optionToSelect = options.find(option => option.value === theme);
        if (optionToSelect) {
            optionToSelect.selected = true;
        }
    }

    const currentTheme = localStorage.getItem('[fx-theme]') ?? 'system';
    setSelectedOption(currentTheme);

    selector.addEventListener("change", (event) => {
        const newTheme = event.target.value;
        window.th.setTheme(newTheme);
    });

    document.addEventListener('th-changed', (event) => {
        if (event.detail.isSistem) setSelectedOption(OPTIONS.system);
        else setSelectedOption(event.detail.theme);
    });
}