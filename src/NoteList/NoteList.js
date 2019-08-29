import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './NoteList.css';

function NoteList(props) {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <div className="note-list">
          {console.log(context.getNotesForFolder(context.notes, props.match.params.folderId))}
          <ul>
            {context.getNotesForFolder(context.notes, props.match.params.folderId).map(note =>
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
      )}
    </NotesContext.Consumer>
  )
}

export default NoteList;