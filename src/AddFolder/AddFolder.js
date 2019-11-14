import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

export class AddFolder extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: '',
        touched: false
      }
    };
  }

  updateTitle(title) {
    this.setState({ title: { value: title, touched: true } });
  }

  handleAddFolder(e) {
    e.preventDefault();
    const title = this.state.title.value;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        "content-type": "application/json",
      }
    }
    fetch('http://localhost:8000/api/folders', options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
      })
      .catch(error => {
        console.error(error)
      })
    this.props.history.push('/')
  }

  validateTitle() {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return "Title is required";
    } else if (title.length < 3) {
      return "Title must be at least 3 characters long";
    }
  }

  render() {
    const titleError = this.validateTitle();

    return (
      <div>
        <h1>Create a folder</h1>
        <form 
          className="add-folder-form"
          onSubmit={e => this.handleAddFolder(e)}
          >
            <label>Title</label>
          <input type="text" name="folder-title" id="folder-title" onChange={e => this.updateTitle(e.target.value)} />
            {this.state.title.touched && (
              <ValidationError message={titleError} />
            )}
            <button 
              className="add-folder-button" 
              type="submit"
              disabled={
                this.validateTitle()
              }
            >
              Add folder
            </button>
          </form>
      </div>
    )
  }
}

AddFolder.propTypes = {
  value: PropTypes.string
};

export default AddFolder
