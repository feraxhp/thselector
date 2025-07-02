const set_content = async () => {
    const content = await fetch("https://raw.githubusercontent.com/feraxhp/thselector/refs/heads/main/README.md")
    const text = await content.text();
    
    document.getElementById('content').innerHTML = marked.parse(text);
}
set_content()
