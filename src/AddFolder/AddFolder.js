import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

export class AddFolder extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: '',
        touched: false
      },
    };
  }

  updateName = (name) => {
    this.setState({ name: { value: name, touched: true }});
  };

  handleAddFolder(e) {
    e.preventDefault();
    const { name } = this.state;
    console.log("Name " , name.value);

      const options = {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: {
          "content-type": "application/json",
        }
      }
      fetch('http://localhost:9090/folders', options)
      .then(res => {
        if(!res.ok) {
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

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    const nameError = this.validateName();

    return (
      <div>
        <h1>Create a folder</h1>
        <form 
          className="add-folder-form"
          onSubmit={e => this.handleAddFolder(e)}
          >
            <label>Name</label>
            <input type="text" name="folder-name" id="folder-name" onChange={e => this.updateName(e.target.value)} />
            {this.state.name.touched && <ValidationError message={nameError} />}
            
            <button 
              className="add-folder-button" 
              type="submit"
              disabled={
                this.validateName()
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
