import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

export class AddFolder extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
  }

  // validateFolderName(fieldValue) {
  //   const name = this.state.name.value.trim();
  //   if(name.length === 0) {
  //     return 'Name is required';
  //   } else if(name.length < 3) {
  //     return 'Name must be at least 3 characters long';
  //   }
  // }

  handleAddFolder(e) {
    e.preventDefault()
    //if empty sting add error- update state if empty string
    //else go on with logic
    // const name = 
    // if (name.string === 0)
    const name = this.nameInput.current.value.trim();
    console.log(name);
    if (name.length === 0) {
      return "Name is required"
    } else {
      this.setState({ error: null});
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
  }
  
  
  render() {
    return (
      <div>
        <h1>Create a folder</h1>
        <form 
          className="add-folder-form"
          onSubmit={e => this.handleAddFolder(e)}
          >
            <label>Name</label>
            <input type="text" name="folder-name" id="folder-name" ref={this.nameInput} required />
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
