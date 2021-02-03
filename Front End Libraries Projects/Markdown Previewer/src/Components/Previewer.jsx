import React, { Component } from 'react';
import "../assets/style.css"

class Previewer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() { 
    return (
      <div className='previewer-wrapper'>
        <div className="Header">Previewer</div>
        <div id="preview" dangerouslySetInnerHTML={{__html: this.props.output}}></div>
      </div>
    );
  }
}
 
export default Previewer;
