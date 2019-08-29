import React from 'react'
import { format } from 'date-fns'
import NotesContext from '../NotesContext';
import './NoteView.css';


  
class NoteView extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = NotesContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.match.params.noteId;

    fetch(`http://localhost:9090/notes/${noteId}`, {
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
      .then(() => {
        this.context.deleteNote(noteId)
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error(error)
      })
    }
  render() {
    console.log(this.context.deleteNote);
    console.log(this.props.match.params.noteId);
    console.log(this.props);
    let foundNote = this.context.notes.filter(note => {
      return note.id === this.props.match.params.noteId;
    });
    console.log(foundNote);
      if(foundNote.length) {
        return (
          <section className='note-view'>
            <div className='Note'>
              <h2 className='Note__title'>{foundNote[0].name}</h2>
              <button 
                className='note-delete' 
                type='button' 
                onClick={this.handleClickDelete}>
                Delete
              </button>
              <div className='note-dates'>
                <div className='note-dates-modified'>
                  Modified
                  <span className='Date'>
                    {format(foundNote[0].modified, 'DD MMM YYYY')}
                  </span>
                </div>
              </div>
            </div>
            <div className='note-content'>
              {foundNote[0].content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
              )}
            </div>
          </section>
      )
    } else {
        return (
        <section className='note-view'></section>
        )
    }
  }
}

export default NoteView;