import React, { Component } from 'react'

export class AddFolder extends Component {
  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
    // this.state = {
    //    error: null,
    // }
  }

  handleAddFolder(e) {
    e.preventDefault()
    // const name = this.nameInput.current.value;
    console.log(this.nameInput.current.value);
    // this.setState({ error: null})
    // fetch('http://localhost:9090/folders')
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
            <input type="text" name="folder-name" id="folder-name" ref={this.NameInput} defaultValue="Frank" />
            <button className="add-folder-button" type="submit">Add folder</button>
            {/* <div className="form-error" role='alert'>
              {error && <p>{error.message}</p>}
            </div> */}
          </form>
      </div>
    )
  }
}

export default AddFolder
