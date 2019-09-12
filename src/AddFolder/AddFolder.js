import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';

export class AddFolder extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
    this.nameInput = React.createRef();
  }

  handleAddFolder(e) {
    e.preventDefault()
    const name = this.nameInput.current.value.trim();
    if (name.length === 0) {
      this.updateError(name);
      return;
    }
      //this.setState({ error: null});
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
  
  updateError = (name) => {
    console.log(name);
      this.setState({
         error: "Must contain letters"
      })
    }

  
  render() {
    console.log(this.state.error);
    return (
      <div>
        <h1>Create a folder</h1>
        <form 
          className="add-folder-form"
          onSubmit={e => this.handleAddFolder(e)}
          >
            <label>Name</label>
            <input type="text" name="folder-name" id="folder-name" ref={this.nameInput} required />
            <ValidationError message={this.state.error}/>
            <button className="add-folder-button" type="submit">Add folder</button>
          </form>
      </div>
    )
  }
}

AddFolder.propTypes = {
  value: PropTypes.string
};

export default AddFolder
