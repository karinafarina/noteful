import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';
import './EditNote.css';
export class EditNote extends Component {

  static contextType = NotesContext;

  state = {
    apiError: null,
    id: '',
    folder_id: '',
    title: '',
    content: '',
    errors: {
      folder_id: '',
      title: '',
      content: ''
    }
  }

  //GET NOTE TO BE UPDATED
  componentDidMount() {
    const { noteId } = this.props.match.params;
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        console.log('res', res)
        if(!res.ok) 
          return res
            .json()
            .then(error => Promise.reject(error));
        
        return res.json();
      })
      .then(responseData => {
        console.log('response data', responseData)
        this.setState({
          id: responseData.id,
          title: responseData.title,
          folder_id: responseData.folder_id,
          content: responseData.content,
          //date_published: responseData.date_published
        });
      })
      .catch(error => {
        this.setState({ apiError: error });
      });
  }

  updateErrorCount = () => {
    let errors = this.state.errors;
    let count = 0;

    Object.values(errors).forEach(val => {
      if (val.length > 0) {
        count++
      }
    });

    this.setState({ errorCount: count });
    let valid = count === 0 ? true : false;
    this.setState({ formValid: valid });
  }

  handleUpdateTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleUpdateContent = e => {
    this.setState({ content: e.target.value })
  }

  updatefolderId = e => {
    this.setState({ folder_id: e.target.value })
  }

  handleClickCancel = () => {
    this.props.history.push('/');
  }

  resetFields = newFields => {
    this.setState({
      id: newFields.id || '',
      title: newFields.title || '',
      content: newFields.content || '',
      folder_id: newFields.folder_id || ''
    });
  };

  handleEditNote = e => {
    e.preventDefault();

    //DO NOT SUBMIT FORM IF ANY ERRORS
    // if(this.state.errorCount > 0) return;

    //GET FORM FIELDS TO BE UPDATED
    const { noteId } = this.props.match.params;

    const newNote = {
      id: this.state.id,
      folder_id: this.state.folder_id,
      title: this.state.title,
      content: this.state.content,
      date_published: new Date()
    };

    this.setState({ apiError: null });

    const options = {
      method: 'PATCH',
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
      }
    }
    //const noteId = this.props.match.params.noteId
    fetch(`http://localhost:8000/api/notes/${noteId}`, options)
      .then(res => {
        if (!res.ok) 
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newNote);
        this.context.updateNote(newNote);
        //return to note folder
        this.props.history.push(`/folders/${this.state.folder_id}`);
      })
      .catch(error => {
        console.error(error)
        this.setState({ apiError: error })
      });
    
  };

  
  render() {
    const { title, folder_id, content } = this.state
    // const titleError = this.validateTitle();
    // const contentError = this.validateContent();
    return (
      <div>
        <h1>Edit a note</h1>
        <form className="edit-note" onSubmit={this.handleEditNote}>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={title}
            onChange={this.handleUpdateTitle}
           />
          {/* {this.state.title.touched && (
            <ValidationError message={titleError} />
          )} */}
          <label htmlFor="content">Content</label>
          <input 
            type="text" 
            name="content" 
            id="edit-note-content" 
            value={content}
            onChange={this.handleUpdateContent} 
          />
          {/* {this.state.content.touched && (
            <ValidationError message={contentError} />
          )} */}
          <label htmlFor="note-folder-select">Folder</label>
          <select id="note-folder-select" onChange={this.updateFolderId} >
            {this.context.folders.map(folder =>
              <option key={folder.id} value={folder_id}>{folder.title}</option>
            )}
          </select>
          <button type='button' onClick={this.handleClickCancel}>Cancel</button>
          {' '}
          <button type="submit">Save</button>
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
  folder_id: PropTypes.array
};

export default EditNote;
