import React from 'react';
import './FolderView.css';

function FolderView(props) {
  return (
    <div className="note-sidebar">
        <button>Back</button>
        {props.folder && (
          <h3 className='note-sidebar__folder-name'>
            {props.folder.name}
          </h3>
        )}
      </div>
  )
}

export default FolderView;