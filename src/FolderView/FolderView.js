import React from 'react';
import NotesContext from '../NotesContext';
import './FolderView.css';

class FolderView extends React.Component {
  static contextType = NotesContext;

  handleBackButton = () => {
    this.props.history.push('/')
  };
  
  render() {
    console.log(this.props.match)
    return (
      <div className="folder-view">
        <button type="button" onClick={this.handleBackButton}>Back</button>
            {this.context.folders.length && (
              <h3 className='folder-view-name'>
                {this.context.folders.name}
              </h3>
            )}
          </div>
        )}
      }

export default FolderView;