import React from 'react'
import { format } from 'date-fns'
import NotesContext from '../NotesContext';
import './NoteView.css';

function deleteBookmarkRequest(bookmarkId, callback) {
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
      callback()
    })
    .catch(error => {
      console.error(error)
    })
}

export default function NoteView(props) {
  return (
    <NotesContext.Consumer>
      {(context) => (
        console.log('context is', context),
          <section className='note-view'>
            <div className='Note'>
              <h2 className='Note__title'>{context.notes.name}</h2>
              <button className='note-delete' type='button'>
                Delete
              </button>
              <div className='note-dates'>
                <div className='note-dates-modified'>
                  Modified
                  <span className='Date'>
                    {format(context.notes.modified, 'DD MMM YYYY')}
                  </span>
                </div>
              </div>
            </div>
            <div className='note-content'>
              {/* {context.notes.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
              )} */}
            </div>
          </section>
       
        
      )}
    </NotesContext.Consumer>
  )
}

