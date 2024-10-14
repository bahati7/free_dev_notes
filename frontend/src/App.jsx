import { Box, useColorModeValue } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import NoteDetails from "./pages/NoteDetails";

function App() {


  return (
    <>
    <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
       <Navbar/> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/details" element={<NoteDetails />} />
      </Routes>

    </Box>
 
    </>
  )
}

export default App
