const { Marked } = globalThis.marked;
const { markedHighlight } = globalThis.markedHighlight;
// const { hljs } = globalThis.hljs;

const marked = new Marked(
  markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const set_content = async () => {
    const content = await fetch("https://raw.githubusercontent.com/feraxhp/thselector/refs/heads/main/README.md")
    const text = await content.text();
    
    document.getElementById('content').innerHTML = marked.parse(text);
}
set_content()
