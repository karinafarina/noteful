import React from 'react'
import { format } from 'date-fns'
import NotesContext from '../NotesContext';
import './NoteView.css';

function deleteNoteRequest(noteId, callback) {
  fetch('http://localhost:9090/notes/${noteId}', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

class NoteView extends React.Component {
  static contextType = NotesContext;

  render() {
    let note = this.context.findNote(this.context.notes, this.props.match.params.noteId);
      return (
        <section className='note-view'>
          <div className='Note'>
            <h2 className='Note__title'>{note.name}</h2>
            <button className='note-delete' type='button' onClick={(e) => deleteNoteRequest(note.id, this.context.deleteNote)}>
              Delete
            </button>
            <div className='note-dates'>
              <div className='note-dates-modified'>
                Modified
                <span className='Date'>
                  {format(note.modified, 'DD MMM YYYY')}
                </span>
              </div>
            </div>
          </div>
          <div className='note-content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </section>
    )
  }
}

export default NoteView;