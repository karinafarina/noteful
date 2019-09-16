import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

export class AddNote extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folderId: {
        value: ''
      },
      titleError: null,
      contentError: null
    }
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } })
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } })
  }

  updateFolderId(folderId) {
    this.setState({ folderId: { value: folderId } })
  }

  handleAddNote(e) {
    e.preventDefault();
    const name = this.state.name.value.trim();
    const content = this.state.content.value.trim();
    const folderId = 
      this.state.folderId.value ? 
      this.state.folderId.value : 
      this.context.folders[0].id;
    const modified = new Date();
    
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

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return "Content is required";
    } else if (content.length < 3) {
      return "Content must be at least 3 characters long";
    }
  }

  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();
    return (
      <div>
        <h1>Create a note</h1>
          <form className="add-note" onSubmit={e => this.handleAddNote(e)}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="add-note-name" onChange={e => this.updateName(e.target.value)} />
            {this.state.name.touched && (
              <ValidationError message={nameError} />
            )}
            <label htmlFor="content">Content</label>
            <input type="text" name="content" id="add-note-content" onChange={e => this.updateContent(e.target.value)} />
            {this.state.content.touched && (
              <ValidationError message={contentError} />
            )}
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" onChange={e => this.updateFolderId(e.target.value)} >
              {this.context.folders.map(folder =>
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              )}            
            </select>
            <button 
              type="submit"
              disabled={
                nameError ||
                contentError
              }
            >Add note</button>
          </form>
      </div>
    )
  }
}

AddNote.defaultProps = {
  name: "",
  content: "",
  folderId: 'Important'
};

AddNote.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  folder: PropTypes.array
};

export default AddNote;
