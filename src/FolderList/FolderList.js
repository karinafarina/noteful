import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './FolderList.css';

class FolderList extends Component {
  static contextType = NotesContext;
  render() {
    const { folders } = this.context;
    return (
      <div className="folder-list">
        <ul>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink to={`/folders/${folder.id}`}>{folder.name}</NavLink>
            </li>
          )}
        </ul>
        <button type="button" className="add-folder-button"><Link to='/add-folder'>+Folder</Link></button>
      </div>
    )
  }
}


export default FolderList;