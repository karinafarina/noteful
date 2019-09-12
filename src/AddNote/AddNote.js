import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValididationError from '../ValidationError';

export class AddNote extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
    this.folderInput = React.createRef();
    this.state = {
      titleError: null,
      contentError: null
    }
  }

  handleAddNote(e) {
    e.preventDefault();
    const name = this.nameInput.current.value.trim();
    const content = this.contentInput.current.value.trim();
    const folderId = this.folderInput.current.value;
    if(name.length === 0) {
      this.updateNameError(name);
      return;
    }
    if (content.length === 0) {
      this.updateContentError(content);
      return;
    }
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
      this.context.addNote(note);
    })
    .catch(error => {
      console.error(error)
    })
    this.props.history.push('/')
  }

  updateNameError = (name) => {
    console.log(name);
    this.setState({
      titleError: "Must contain letters"
    })
  }

  updateContentError = (content) => {
    this.setState({
      contentError: "Must contain content"
    })
  }

  render() {
    console.log(this.state.titleError);
    return (
      <div>
        <h1>Create a note</h1>
          <form className="add-note" onSubmit={e => this.handleAddNote(e)}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="add-note-name" ref={this.nameInput} required />
            <ValididationError message={this.state.titleError} />
            <label htmlFor="content">Content</label>
            <input type="text" name="content" id="add-note-content" ref={this.contentInput} />
            <ValididationError message={this.state.contentError} />
            <label htmlFor="folder">Folder</label>
            <select id="note-folder-select" ref={this.folderInput} >
              {this.context.folders.map(folder =>
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              )}            
            </select>
            <button type="submit">Add note</button>
          </form>
      </div>
    )
  }
}

AddNote.defaultProps = {
  name: "",
  content: ""
};

AddNote.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  folder: PropTypes.array
};

export default AddNote;
