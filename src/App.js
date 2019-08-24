import React, {Component} from 'react';
import { Route } from 'react-router-dom';
// import dummyStore from './dummy-store';
import NotesContext from './NotesContext';
import Header from './Header/Header';
import './App.css';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import NoteView from './NoteView/NoteView'
import FolderView from './FolderView/FolderView';

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
        console.log('folder data', data);
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
        console.log('notes data', data);
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
    // const { folders, notes } = this.state;
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    
    const findFolder = (folders, folderId) =>
      folders.find(folder => folder.id === folderId)

    const findNote = (notes = [], noteId) =>
      notes.find(note => note.id === noteId)

    const getNotesForFolder = (notes = [], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    )

    // const countNotesForFolder = (notes = [], folderId) =>
    //   notes.filter(note => note.folderId === folderId).length

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
          </NotesContext.Provider>
        </div> 
      </main>
    );
  }
}
  
 

export default App;