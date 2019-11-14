import React from 'react';
import NotesContext from '../NotesContext';
import './FolderView.css';

class FolderView extends React.Component {
  static contextType = NotesContext;

  handleBackButton = () => {
    this.props.history.push('/')
  };
  
  render() {
    const currentNote = this.context.notes.find(note => note.id === this.props.match.params.noteId);
    console.log('current note: ', this.context.notes);
    const currentFolder = this.context.folders.find(folder => currentNote.folderId === folder.id);
    return (
      <div className="folder-view">
        <button type="button" onClick={this.handleBackButton}>Back</button>
            {currentFolder && (
              <h3 className='folder-view-name'>
                {currentFolder.name}
              </h3>
            )}
          </div>
        )}
      }

export default FolderView;