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

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      folders: [],
      notes: []
    }
  };

  componentDidMount() {
    fetch('http://localhost:9090/folders')
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
          folders: data
        })
      })
      .catch(error => {
        console.error(error)
      });
    fetch('http://localhost:9090/notes')
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

    const getNotesForFolder = (notes = [], folderId) => {
      let filteredNotes = notes.filter(note => note.folderId === folderId);
      return !folderId ? notes : filteredNotes;
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
      console.log(note);
      const notes = [...this.state.notes, note]
      
      this.setState({
        notes
      })
    }

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote,
      getNotesForFolder,
      findNote,
      addFolder,
      addNote,
    }
    // const findFolder = (folders, folderId) =>
    //   folders.find(folder => folder.id === folderId)
   
    return (
      <main className='App' >
        <Header />
        <div className='main'>
          <NotesContext.Provider value={contextValue}>
            {['/', '/folders/:folderId'].map(path => (
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
          {['/', '/folders/:folderId'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={NoteList}
            />
          ))
          }
            <Route
              path='/add-folder'
              component={AddFolder}
            />
            <Route
              path='/add-note'
              component={AddNote}
            />
          </NotesContext.Provider>
        </div> 
      </main>
    );
  }
}
  
 

export default App;