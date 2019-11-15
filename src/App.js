import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import NotesContext from './NotesContext';
import Header from './Header/Header';
import './App.css';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import NoteView from './NoteView/NoteView'
import FolderView from './FolderView/FolderView';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import EditNote from './EditNote/EditNote';
import NoteError from './NoteError';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      folders: [],
      notes: [],
      error: null,
    }
  };

  componentDidMount() {
    fetch('http://localhost:8000/api/folders')
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          folders: data
        })
      })
      .catch(error => {
        console.error(error)
      });
    fetch('http://localhost:8000/api/notes')
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        // call the callback when the request is successful
        this.setState({
          notes: data
        })
      })
      .catch(error => {
        console.error(error)
      })
  } 

  render() {

    const getNotesForFolder = (notes = [], folder_id) => {
      let filteredNotes = notes.filter(note => note.folder_id === folder_id);
      return !folder_id ? notes : filteredNotes;
    }

    const findNote = (notes = [], noteId) =>
      notes.find(note => note.id === noteId)

    const deleteNote = (noteId) => {
      const newNotes = this.state.notes.filter(note => note.id !== noteId);
      this.setState({
        notes: newNotes
      })
      
    }

    const addFolder = (folder) => {
      const folders = [...this.state.folders, folder]
      this.setState({
        folders
      })
    }

    const addNote = (note) => {
      const notes = [...this.state.notes, note]
      this.setState({
        notes
      })
    }

    // const updateFolder = () => {
      
    // }

    const updateNote = (newNote) => {
      console.log('noteEdit', newNote)
      console.log('this.state.notes', this.state.notes)
      const updatedNote = this.state.notes.map(note => 
        note.id !== newNote.id ? note : newNote
      );
      this.setState({
        notes: updatedNote
      })
      console.log('newnote', newNote)

    }

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote,
      getNotesForFolder,
      findNote,
      addFolder,
      addNote,
      //updateFolder,
      updateNote,
    }
    // const findFolder = (folders, folder_id) =>
    //   folders.find(folder => folder.id === folder_id)
   
    return (
      <main className='App' >
        <Header />
        <div className='main'>
          {/* add NoteError */}
          <NotesContext.Provider value={contextValue}>
            {['/', '/folders/:folder_id'].map(path => (
              <Route
                exact
                key={path}
                path={path}
                component={FolderList}
              />
            )
            )}
          
            <Route
              path='/notes/:noteId'
              component={FolderView}
            />
      
          <Route 
            path='/notes/:noteId'
            component={NoteView}
          />
          {/* Map through these two options, same for both */}
          {['/', '/folders/:folder_id'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={NoteList}
            />
          ))
          }
          <NoteError>
            <Route
              path='/add-folder'
              component={AddFolder}
            />
          </NoteError>
          <NoteError>
            <Route
              path='/add-note'
              component={AddNote}
            />
          </NoteError>
            {/* <NoteError>
              <Route
                path='/edit-folder/:folder_id'
                component={EditFolder}
              />
            </NoteError> */}
            <NoteError>
              <Route
                path='/edit-note/:noteId'
                component={EditNote}
              />
            </NoteError>
          </NotesContext.Provider>
        </div> 
      </main>
    );
  }
}
  
 

export default App;