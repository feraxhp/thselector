# thselector

The simplest way to add theme management to your HTML. Easy to configure and set up.

I think that the purpose of the web is to be simple. I am tired of complicated things to achieve simple use cases, and for that reason I developed this simple theme selector. With no more than 4 lines of pure HTML, you will be able to add simple (light, dark, system) control theme for your web.

## How it works?

It uses the `prefers-color-scheme` and css trics to be as simple as posible. you mut add this 4 lines of code to your HTML. 

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	...
	<meta id="fth-meta" name="color-scheme" content="dark ligth"> <!-- 1' -->
	<script src="https://cdn.jsdelivr.net/gh/feraxhp/thselector@v0.1.0/load-theme.js"></script> <!-- 2' -->
	<script src="https://cdn.jsdelivr.net/gh/feraxhp/thselector@v0.1.0/select-theme.js" defer></script> <!-- 3' -->
	...
</head>
<body>
    ...
	<select id="fth-select"></select> <!-- 4' -->
    ...
</body>
</html>
~~~

### Explanation

- `1'` This line controls the current color-scheme applied to the document.
- `2'` Loads the predefined theme for the user (reading the localStorage variable **`'[fx-theme]'`**)
- `3'` Adds the select options and its listener
- `4'` The selector for the theme

Actually, only line `2'` is essential as it contains the core functionality. If you use this line alone, you'll need to implement your own user input handling for theme changes, though system color management will continue to work automatically.

The *load-theme* script will provide the important API for the theme through the window variable.

#### API
- `window.th.setTheme(theme: string)` this function receives the desired theme to be set.
   The allowed input is ("light", "dark", "system"). If you provide a different value, it will fall back to "system"

The `setTheme` function will set the localStorage key to the given theme and change the root attribute `theme` to that value.

If the theme is set to "system", the root attribute `theme` will be set to dark or light depending on the user preference.

#### Event

the _load script_ will distpach a custom event named `th-changed` any time the theme is change using `window.th.setTheme` 
this means it will trigger even when the sistem theme changes if the user has select the _"sistem"_ preference.

the event will return 2 variables through `event.detail`:
- `theme`: the current theme ("dark", "light")
- `isSistem`: If the theme is manage by the system or is fixed by the user. 

## Working with CSS

I provide some examples to show how the color management is done:
- [latte-mocha](https://github.com/feraxhp/thselector/blob/main/latte-mocha.css)
- [latte-frappe](https://github.com/feraxhp/thselector/blob/main/latte-frappe.css)
- [latte-macchiato](https://github.com/feraxhp/thselector/blob/main/latte-macchiato.css)

---
As mentioned before, this tool is designed for simplicity while maintaining full flexibility for your specific needs.


## Planed

- [ ] add more theme selectors
- [ ] bundle to npm
