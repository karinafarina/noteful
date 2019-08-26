import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './FolderList.css';

class FolderList extends Component {
  static contextType = NotesContext;
  render() {
    const { folders } = this.context;
    return (
      <div className="folder-list">
        <ul >
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink to={`/folders/${folder.id}`}>{folder.name}</NavLink>
            </li>
          )}
        </ul>
      </div>
    )
  }
}


export default FolderList;