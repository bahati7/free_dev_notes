import {create} from "zustand";

export const useNoteStore = create((set)=>({
    notes: [],
    setNotes:(notes)=>set({notes}),

    createNote:async (newNote)=>{
        if(!newNote.title || !newNote.description || !newNote.author){
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/notes",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newNote)

        })
        const data = await res.json();
        set((state)=> ({notes:[...state.notes, data.data]}));
        return {success:true, message:"noted added successfully"}
    },
    fetchNotes: async ()=>{
        const res= await fetch("/api/notes");
        const data = await res.json();        
        set ({notes:data.data});

    },
    fetchOneNote: async (nid)=>{
        const res= await fetch("/api/notes");
        const data = await res.json();
        const oneNote= data.data.find(note=>note._id==nid);       
        set({notes: oneNote});
  
    },
    
    deleteNote: async (nid)=>{
        const res = await fetch(`/api/notes/${nid}`, {
            method:"DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message};
        //update the ui immediately
        set(state=>({notes: state.notes.filter(note=>note._id !==nid)}));
        return {success:true, message:data.message};
    },
    updateNote: async (nid, updatedNote)=>{
        const res = await fetch(`/api/notes/${nid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(updatedNote)
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message};

         //update the ui without refresh
         set((state)=>({
            notes:state.notes.map((note)=>(note._id === nid ? data.data: note)),
        }));
        return {success:true, message:data.message};

    },

}))