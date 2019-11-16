import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

export class AddNote extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folder_id: {
        value: ''
      },
      titleError: null,
      contentError: null
    }
  }

  updateTitle(title) {
    this.setState({ title: { value: title, touched: true } })
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } })
  }

  updateFolderId = e => {
    console.log('e.tartet', e.target.value)
    this.setState({ folder_id: e.target.value })
  }

  handleAddNote = e => {
    e.preventDefault();
    const title = this.state.title.value.trim();
    const content = this.state.content.value.trim();
    const folder_id = this.state.folder_id;
    const date_published = new Date();
    const options = {
      method: 'POST',
      body: JSON.stringify({ title, content, folder_id, date_published }),
      headers: {
        "content-type": "application/json",
      }
    }
    fetch('http://localhost:8000/api/notes', options)
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

  validateTitle() {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return "title is required";
    } else if (title.length < 3) {
      return "title must be at least 3 characters long";
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
    const titleError = this.validateTitle();
    const contentError = this.validateContent();
    return (
      <div>
        <h1>Create a note</h1>
          <form className="add-note" onSubmit={this.handleAddNote}>
            <label htmlFor="title">Title</label>
          <input type="text" name="title" id="add-note-title" onChange={e => this.updateTitle(e.target.value)} />
          {this.state.title.touched && (
            <ValidationError message={titleError} />
            )}
            <label htmlFor="content">Content</label>
            <input type="text" name="content" id="add-note-content" onChange={e => this.updateContent(e.target.value)} />
            {this.state.content.touched && (
              <ValidationError message={contentError} />
            )}
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" onChange={this.updateFolderId} >
              {this.context.folders.map(folder =>
                <option key={folder.id} value={folder.id}>{folder.title}</option>
              )}            
            </select>
            <button 
              type="submit"
              disabled={
                titleError ||
                contentError
              }
            >Add note</button>
          </form>
      </div>
    )
  }
}

AddNote.defaultProps = {
  title: "",
  content: "",
  folder_id: 'Important'
};

AddNote.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AddNote;
