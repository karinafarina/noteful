import React from 'react';
import NotesContext from '../NotesContext';
import './FolderView.css';

class FolderView extends React.Component {
  static contextType = NotesContext;

  handleBackButton = () => {
    this.props.history.push('/')
  };
  
  render() {
    console.log(this.context)
    return (
      <div className="note-sidebar">
        <button type="button" onClick={this.handleBackButton}>Back</button>
            {this.context.folder && (
              <h3 className='note-sidebar__folder-name'>
                {this.context.folder.name}
              </h3>
            )}
          </div>
        )}
      }

export default FolderView;