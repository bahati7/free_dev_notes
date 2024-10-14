import React, { useState ,   createContext, useContext } from "react";

import {
  Card,
  CardHeader,
  Text,
  Heading,
  CardBody,
  CardFooter,
  Button,
  HStack,
  useToast,
  useDisclosure,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useNoteStore } from "../../store/note";
import { Link } from "react-router-dom";



const NoteCard = ({ note }) => {
  //const [noteDetails, setNoteDetails] = useState({note});
  const [updatedNote, setUpdatedNote] = useState(note);
  const { deleteNote, updateNote, fetchOneNote } = useNoteStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNoteDetails= async (nid)=>{
       await fetchOneNote(nid);
       const title=note.title;
  console.log(title)
  localStorage.setItem('title', (title));
  
  }

  const handleDeleteNote = async (nid) => {
    const { success, message } = await deleteNote(nid);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Note Deleted",
        description: "Note has been deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdateNote = async (nid, updatedNote) => {
    const { success, message } = await updateNote(nid, updatedNote);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Note updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Card>
        <CardHeader>
          <Heading size="md"> {note.title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{note.description}</Text>
          <Text mt={5} fontSize={"x-small"}>
            created by {note.author} at {note.createdAt}
          </Text>
        </CardBody>
        <CardFooter>
          <HStack>
           {/* <Link to="/details"><Button onClick={()=>handleNoteDetails(note._id)} bg={"blue.300"} >View</Button></Link>  */}
            <Button bg={"green.300"} onClick={onOpen}>
              Edit
            </Button>
            <Button bg={"red.300"} onClick={() => handleDeleteNote(note._id)}>
              Delete
            </Button>
          </HStack>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                title="title"
                value={updatedNote.title}
                onChange={(e) =>
                  setUpdatedNote({ ...updatedNote, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                description="description"
                value={updatedNote.description}
                onChange={(e) =>
                  setUpdatedNote({
                    ...updatedNote,
                    description: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Author"
                author="author"
                value={updatedNote.author}
                onChange={(e) =>
                  setUpdatedNote({ ...updatedNote, author: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateNote(note._id, updatedNote)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  
      
    </Box>
  );
};

export default NoteCard;
