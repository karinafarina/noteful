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
    const currentFolder = this.context.folders.find(folder => currentNote.folderId === folder.id);
    console.log(currentFolder.name);
    return (
      <div className="folder-view">
        <button type="button" onClick={this.handleBackButton}>Back</button>
            {this.context.folders.length && (
              <h3 className='folder-view-name'>
                {currentFolder.name}
              </h3>
            )}
          </div>
        )}
      }

export default FolderView;