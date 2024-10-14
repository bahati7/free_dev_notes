import React, { useContext }  from 'react';
import { useNoteStore } from "../../store/note.js";
import { useEffect } from 'react';


const NoteDetails = () => {
    const title = localStorage.getItem('title');
    // const {fetchOneNote, notes}=useNoteStore();
  
    // useEffect(()=>{
    //     fetchOneNote();
    //   }, [fetchOneNote]);

//console.log((title));
  return (
    <div></div>
  )
}

export default NoteDetails