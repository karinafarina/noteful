import React, { Component } from 'react';
import NotesContext from '../NotesContext';

export class AddFolder extends Component {

  static contextType = NotesContext;

  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
  }

  handleAddFolder(e) {
    e.preventDefault()
    const name = this.nameInput.current.value;
    console.log(name);
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
      console.log(res);
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later');
      }
      return res.json();
     })
     .then((folder) => {
        console.log(folder);
        this.context.addFolder(folder);
     })
      .catch(error => {
        console.error(error)
      })
    this.props.history.push('/')
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
            <input type="text" name="folder-name" id="folder-name" ref={this.nameInput} />
            <button className="add-folder-button" type="submit">Add folder</button>
          </form>
      </div>
    )
  }
}

export default AddFolder
