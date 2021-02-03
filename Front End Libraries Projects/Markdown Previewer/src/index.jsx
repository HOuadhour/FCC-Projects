import React, {Component} from "react";
import ReactDOM from "react-dom";
import Editor from './Components/Editor'
import Previewer from './Components/Previewer'
import './assets/style.css'
import marked from 'marked'

marked.use({
  gfm: true,
  breaks: true
})

const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
    - With different indentation levels.
    - That look like this.

1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Flogos-3%2F600%2FReact.js_logo-512.png&f=1&nofb=1)`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorText: defaultText,
      formattedText: marked(defaultText)
    };
  }

  handleChange = (event) => {
    this.setState({
      editorText: event.target.value,
      formattedText: marked(event.target.value).replace('::marker', '')
    })
  }

  render() {
    return (
      <div className="container">
      <Editor text={this.state.editorText} handleChange={this.handleChange}/>
      <Previewer output={this.state.formattedText}/>
    </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
