import React from 'react'

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  getNotesForFolder: () => {},
  findNote: () => {},
  addFolder: () => {},
  addNote: () => {},
  updateError: () => {},
})

export default NotesContext