import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';

class NoteList extends Component {
  
  render() {
    
    return (
      <div className="note-list">
        <ul>
          {this.props.notes.map(note =>
            <li key={note.id}>
              <div>
                <Link to={`/notes/${note.id}`}>
                  {note.name}
                </Link>
              </div>
              <div>{note.modified}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }
  
}

export default NoteList;