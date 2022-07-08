marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

function App() {
  const [markdown, setMarkdown] = React.useState(`
  # Markdown Previewer

  ## This is a subheader

  [Link](https://www.example.com)

  \`print("hello world")\`

  \`\`\`
  {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25 
  } 
  \`\`\`

  - First item
  - Second item
  - Third item

  > Blockquote

  ![alt text](image.jpg)

  ***bold text**

  `);
// a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Markdown Previewer</h1>
      <textarea name="text" id="editor" rows="15" className="form-control" value={markdown} style={{height: '300px'}} onChange={(e) => setMarkdown(e.target.value)}>
      </textarea>
      <h3 className="display-8 py-3 fw-bold">Output:</h3>
      <div id="preview" dangerouslySetInnerHTML={{ __html: marked(markdown, {renderer : renderer}) }}>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));