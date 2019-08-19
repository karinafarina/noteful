import React, {Component} from 'react';
import './NoteList.css';

class NoteList extends Component {
  
  render() {
    
    return (
      <div className="note-list">
        <ul>
          {this.props.notes.map(note =>
            <li key={note.id}>
              <div>{note.name}</div>
              <div>{note.modified}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }
  
}

export default NoteList;