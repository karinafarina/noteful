import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

export class EditNote extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    let foundNote = this.context.notes.find(note => {
      return note.id === this.props.match.params.noteId;
    });
    if(!foundNote) {
      throw new Error;
    }
    this.state = {
      title: {
        value: foundNote.title,
        touched: false
      },
      content: {
        value: foundNote.content,
        touched: false
      },
      folder_id: {
        value: foundNote.folder_id
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

  updatefolder_id(folder_id) {
    this.setState({ folder_id: { value: folder_id } })
  }

  handleEditNote(e) {
    e.preventDefault();
    const title = this.state.title.value.trim();
    const content = this.state.content.value.trim();
    const folder_id =
      this.state.folder_id.value ?
        this.state.folder_id.value :
        this.context.folders[0].id;
    const modified = new Date();

    const options = {
      method: 'PATCH',
      body: JSON.stringify({ title, content, folder_id, modified }),
      headers: {
        "content-type": "application/json",
      }
    }
    const noteId = this.props.match.params.noteId
    fetch(`http://localhost:8000/api/notes/:${noteId}`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then((note) => {
        this.context.editNote(note);
      })
      .catch(error => {
        console.error(error)
      })
    this.props.history.push('/')
  }

  // validateName() {
  //   const name = this.state.name.value.trim();
  //   if (name.length === 0) {
  //     return "Name is required";
  //   } else if (name.length < 3) {
  //     return "Name must be at least 3 characters long";
  //   }
  // }

  // validateContent() {
  //   const content = this.state.content.value.trim();
  //   if (content.length === 0) {
  //     return "Content is required";
  //   } else if (content.length < 3) {
  //     return "Content must be at least 3 characters long";
  //   }
  // }

  render() {
    
    const titleError = this.validateTitle();
    const contentError = this.validateContent();
    return (
      <div>
        <h1>Edit a note</h1>
        <form className="edit-note" onSubmit={e => this.handleEditNote(e)}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="edti-note-title" onChange={e => this.updateTitle(e.target.value)} />
          {this.state.title.touched && (
            <ValidationError message={titleError} />
          )}
          <label htmlFor="content">Content</label>
          <input type="text" name="content" id="edit-note-content" onChange={e => this.updateContent(e.target.value)} />
          {this.state.content.touched && (
            <ValidationError message={contentError} />
          )}
          <label htmlFor="note-folder-select">Folder</label>
          <select id="note-folder-select" onChange={e => this.updatefolder_id(e.target.value)} >
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
          >Edit note</button>
        </form>
      </div>
    )
  }
}

EditNote.defaultProps = {
  title: "",
  content: "",
  folder_id: 'Important'
};

EditNote.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  folder: PropTypes.array
};

export default EditNote;
