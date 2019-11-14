import React from 'react'

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  getNotesForFolder: () => {},
  findNote: () => {},
  addFolder: () => {},
  addNote: () => {},
  //updateFolder: () => {},
  updateNote: () => {},
})

export default NotesContext