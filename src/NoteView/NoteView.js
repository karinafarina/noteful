import React from 'react'
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import './NoteView.css';

export default function NoteView(props) {
  return (
    <section className='NoteView'>
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${props.note.id}`}>
            {props.note.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button'>
          Delete
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            <span className='Date'>
              {format(props.note.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
      <div className='NoteView__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NoteView.defaultProps = {
  note: {
    content: '',
  }
}
