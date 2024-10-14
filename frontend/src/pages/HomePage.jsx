import { Container, VStack, Text, Image, SimpleGrid} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNoteStore } from "../../store/note";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const {fetchNotes, notes}=useNoteStore();

  useEffect(()=>{
    fetchNotes();
  }, [fetchNotes]);

  //console.log("notes", notes)

  return (
    <Container maxW="container.xl" mt={10}>
      <VStack spacing={9}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
          textAlign={"center"}
        >
          Current Ideas
        </Text>

      	<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
         {
          notes.map((note) => (
            <NoteCard key={note._id} note={note}/>
          ))
         }
        </SimpleGrid>

        {notes.length === 0 && (
           <>
           <Text
           fontSize="xl"
           textAlign={"center"}
           fontWeight="bold"
           color="gray.500"
         >
           No ideas found 😢{" "}
           <Link to={"/create"}>
             <Text
               as="span"
               color="green.500"
               _hover={{ textDecoration: "underline" }}
             >
               Create an idea
             </Text>
           </Link>
         </Text>
            <Image
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-overwhelmed-people-illustration_23-2149352794.jpg?ga=GA1.1.990392183.1728665351&semt=ais_hybrid"
            alt="Dan Abramov"
          />
           </>
 
        )}

             </VStack>
    </Container>
  );
};

export default HomePage;
