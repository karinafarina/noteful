import React, { Component } from 'react';
import NotesContext from '../NotesContext';
// import PropTypes from 'prop-types';
import ValididationError from '../ValidationError';

export class AddNote extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: ''
      },
      content: {
        value: ''
      },
      folderId: {
        value: ''
      },
      titleError: null,
      contentError: null
    }
  }

  handleAddNote(e) {
    e.preventDefault();
    const name = this.state.name.value.trim();
    const content = this.state.content.value.trim();
    const folderId = this.state.folderId.value;
    const modified = new Date();
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
      body: JSON.stringify({ name, content, folderId, modified }),
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

  updateName(name) {
    this.setState({name: {value: name}})
  }

  updateContent(content) {
    this.setState({content: {value: content}})
  }

  updateFolderId(folderId) {
    this.setState({folderId: {value: folderId}})
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
    return (
      <div>
        <h1>Create a note</h1>
          <form className="add-note" onSubmit={e => this.handleAddNote(e)}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="add-note-name" onChange={e => this.updateName(e.target.value)} required />
            <ValididationError className="error" message={this.state.titleError} />
            <label htmlFor="content">Content</label>
            <input type="text" name="content" id="add-note-content" onChange={e => this.updateContent(e.target.value)} />
            <ValididationError className="error" message={this.state.contentError} />
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" onChange={e => this.updateFolderId(e.target.value)} >
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

export default AddNote;
