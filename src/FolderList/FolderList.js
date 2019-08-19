import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './FolderList.css';

class FolderList extends Component {
  render() {
    
    return (
      <div className="folder-list">
        <ul>
          {this.props.folders.map(folder =>
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