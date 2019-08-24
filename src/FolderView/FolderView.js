import React from 'react';
import NotesContext from '../NotesContext';
import './FolderView.css';

function FolderView() {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <div className="note-sidebar">
          <button>Back</button>
          {context.folder && (
            <h3 className='note-sidebar__folder-name'>
              {context.folder.name}
            </h3>
          )}
        </div>
      )}
    </NotesContext.Consumer>
  )
}

export default FolderView;