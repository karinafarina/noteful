import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import { format } from 'date-fns';
import './NoteList.css';

function NoteList(props) {
  
  
  return (
    <NotesContext.Consumer>
      {(context) => (
        <div className="note-list">
          <ul>
            {context.getNotesForFolder(context.notes, parseInt(props.match.params.folder_id)).map(note =>
              <li key={note.id}>
                <div>
                  <Link to={`/notes/${note.id}`}>
                    {note.title}
                  </Link>
                </div>
                <div>{format(note.date_published, 'DD MMM YYYY')}</div>
              </li>
            )}
          </ul>
          <button type="button" className="add-note-button"><Link to="/add-note">+Note</Link></button>

        </div>
      )}
    </NotesContext.Consumer>
  )
}

export default NoteList;