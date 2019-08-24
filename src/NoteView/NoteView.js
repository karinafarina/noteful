import React from 'react'
import { format } from 'date-fns'
import NotesContext from '../NotesContext';
import './NoteView.css';

export default function NoteView(props) {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <section className='note-view'>
          <div className='Note'>
            {/* <h2 className='Note__title'>{context.note.name}</h2> */}
            <button className='note-delete' type='button'>
              Delete
            </button>
            <div className='note-dates'>
              <div className='note-dates-modified'>
                Modified
                <span className='Date'>
                  {/* {format(context.note.modified, 'DD MMM YYYY')} */}
                </span>
              </div>
            </div>
          </div>
          <div className='note-content'>
            {/* {context.note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )} */}
          </div>
        </section>
      )}
    </NotesContext.Consumer>
  )
}

