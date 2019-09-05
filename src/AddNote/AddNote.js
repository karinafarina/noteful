import React, { Component } from 'react';
import NotesContext from '../NotesContext';


export class AddNote extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
    this.folderInput = React.createRef();
  }

  handleAddNote(e) {
    e.preventDefault();
    const name = this.nameInput.current.value;
    const content = this.contentInput.current.value;
    const folderId = this.folderInput.current.value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, content, folderId }),
      headers: {
        "content-type": "application/json",
      }
    }
    fetch('http://localhost:9090/notes', options)
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later');
      }
      return res.json();
    })
    .then((note) => {
      console.log(note);
      this.context.addNote(note);
    })
    .catch(error => {
      console.error(error)
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1>Create a note</h1>
          <form className="add-note" onSubmit={e => this.handleAddNote(e)}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="add-note-name" ref={this.nameInput} required />
            <label htmlFor="content">Content</label>
            <input type="text" name="content" id="add-note-content" ref={this.contentInput} />
            <label htmlFor="folder">Folder</label>
            <select id="note-folder-select" ref={this.folderInput} >
              {this.context.folders.map(folder =>
                <option value={folder.id}>{folder.name}</option>
              )}            
            </select>
            <button type="submit">Add note</button>
          </form>
      </div>
    )
  }
}

export default AddNote
