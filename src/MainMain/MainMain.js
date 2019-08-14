import React, {Component} from 'react';
import './MainMain.css';

class MainMain extends Component {
  
  render() {
    return (
      <div className="main-main">
        <ul>
          {this.props.notes.map(note =>
            <li key={note.id}>
              {note.name}
              {note.modified}
            </li>
          )}
        </ul>
      </div>
    )
  }
  
}

export default MainMain;