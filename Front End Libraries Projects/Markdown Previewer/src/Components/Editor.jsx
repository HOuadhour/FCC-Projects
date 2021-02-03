import React, { Component } from 'react';
import "../assets/style.css"

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() { 
    return (
      <div className='editor-wrapper'>
        <div className="Header">Editor</div>
        <textarea id="editor" onChange={this.props.handleChange} value={this.props.text}></textarea>
      </div>

    );
  }
}
 
export default Editor;
