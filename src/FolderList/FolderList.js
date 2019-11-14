import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './FolderList.css';

class FolderList extends Component {
  static contextType = NotesContext;
  render() {
    const { folders } = this.context;
    // console.log('this is folders', folders)
    return (
      <div className="folder-list">
        <ul>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink to={`/folders/${folder.id}`}>{folder.title}</NavLink>
              {/* <Link to={`/edit/${folder.id}`}>
                Edit Folder
              </Link> */}
            </li>
          )}
        </ul>
        <button type="button" className="add-folder-button"><Link to='/add-folder'>+Folder</Link></button>
      </div>
    )
  }
}


export default FolderList;