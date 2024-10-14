import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNoteStore } from "../../store/note";

const CreatePage = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    author: "",
  });

  const toast = useToast();


  const { createNote } = useNoteStore();

  const handleAddIdea = async () => {
    const {success, message}= await createNote(newNote);
    if(!success){
        toast({
            title:"Error",
            description:message,
            status:"error",
            duration:5000,
            isClosable:true
        });
    }else{
        toast({
            title:"Success",
            description:message,
            status:"success",
            duration:5000,
            isClosable:true
        });
    }
    setNewNote({title:"", description:"", author:""})
    
  };
  return (
    <Container mt={10} maxW={"container.sm"}>
      <VStack spacing={9}>
        <Heading as={"h4"} size={"2xl"} textAlign={"center"} mb={9}>
          Add new Project Idea
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={7}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={5}>
            <Input
              placeholder="Project title"
              title="title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Explain your project"
              description="description"
              value={newNote.description}
              onChange={(e) =>
                setNewNote({ ...newNote, description: e.target.value })
              }
            />
            <Input
              placeholder="Your name"
              author="author"
              value={newNote.author}
              onChange={(e) =>
                setNewNote({ ...newNote, author: e.target.value })
              }
            />
            <Button colorScheme="green" onClick={handleAddIdea}>
              Create New Idea
            </Button>
            <Link to={"/"}>
              <Button colorScheme="red">Cancel</Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
