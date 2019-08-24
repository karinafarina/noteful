import React from 'react'

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
})

export default NotesContext