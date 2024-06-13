import React, { useEffect, useState } from 'react';
import { Container, Box, Text, Button, VStack, HStack, Input, Textarea, Flex, IconButton, useMediaQuery } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPrint, FaBars, FaSun, FaMoon, FaUser, FaHome, FaFileAlt, FaQuestion, FaCog, FaBell, FaEnvelope } from "react-icons/fa";

const Result = () => {
  const [reports, setReports] = useState([]);
  const [selectedSentences, setSelectedSentences] = useState([]);
  const [finalReport, setFinalReport] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Fetch previously generated radiological reports from the backend
    fetch('/api/reports')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedSentences);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedSentences(items);
  };

  const handleSentenceClick = (sentence) => {
    setSelectedSentences([...selectedSentences, sentence]);
  };

  const handleReportChange = (e) => {
    setFinalReport(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box bg={darkMode ? "#1E1E1C" : "#FCFDF9"} color={darkMode ? "#C7EAF3" : "#1E1E1C"} minH="100vh" transition="background-color 0.3s, color 0.3s">
      <Button onClick={toggleSidebar} display={{ base: "block", md: "none" }} position="absolute" top="10px" left="10px" bg="transparent" border="none" color={darkMode ? "#C7EAF3" : "#1E1E1C"} fontSize="20px" transition="color 0.3s">
        <FaBars />
      </Button>
      <Flex as="nav" bg={darkMode ? "#242421" : "#ECEDE6"} p={4} justify="space-between" align="center" boxShadow="md" position="fixed" top="0" w="full" zIndex="10" transition="background-color 0.3s">
        <Flex align="center">
          <img alt="Logo" src="https://i.ibb.co/tZD4b4Z/natan-paraisk-httpss-mj-runvs-Rrfecl6po-unique-logo-for-an-AI-ra-80aa576f-4e3f-4293-aa3e-149c6f3a84a.png" width="32" height="32" style={{ marginRight: "8px", transition: "transform 0.3s" }} />
          <Text fontSize="xl" fontWeight="semibold" color={darkMode ? "#C7EAF3" : "#1E1E1C"}>Laudos AI</Text>
        </Flex>
        <Flex align="center" spacing={4}>
          <Button as="a" href="/profile" variant="link" color={darkMode ? "#C7EAF3" : "#1E1E1C"} leftIcon={<FaUser />} mr={4}>Profile</Button>
          <Button onClick={() => setDarkMode(!darkMode)} variant="link" color={darkMode ? "#C7EAF3" : "#1E1E1C"}>{darkMode ? <FaSun /> : <FaMoon />}</Button>
          <Button as="a" href="/logout" variant="link" color={darkMode ? "#C7EAF3" : "#1E1E1C"}>Logout</Button>
        </Flex>
      </Flex>
      <Flex mt="16" h="full">
        <Box as="aside" bg={darkMode ? "#242421" : "#ECEDE6"} p={4} w={isSidebarOpen ? "250px" : "60px"} transition="width 0.3s ease-in-out, opacity 0.3s ease-in-out, background-color 0.3s" boxShadow="md">
          <Button bg="#1E1E1C" color="#C7EAF3" py={2} px={4} mb={4} w="full" display={isSidebarOpen ? "flex" : "none"} alignItems="center" justifyContent="center" borderRadius="md" _hover={{ bg: "#216D77", color: "#1E1E1C" }}>
            <Text>New Report</Text>
            <Text ml={2} bg="gray.600" fontSize="xs" py={1} px={2} borderRadius="md">Ctrl I</Text>
          </Button>
          <VStack spacing={2} align="stretch">
            <Button as="a" href="/" variant="link" color="gray.400" _hover={{ color: "#C7EAF3" }} leftIcon={<FaHome />} display="flex" alignItems="center">
              <Text display={isSidebarOpen ? "block" : "none"}>Home</Text>
            </Button>
            <Button as="a" href="/meus_laudos" variant="link" color="gray.400" _hover={{ color: "#C7EAF3" }} leftIcon={<FaFileAlt />} display="flex" alignItems="center">
              <Text display={isSidebarOpen ? "block" : "none"}>My Reports</Text>
            </Button>
          </VStack>
          <Box mt={4} display={isSidebarOpen ? "block" : "none"}>
            <Text fontWeight="semibold" color={darkMode ? "#C7EAF3" : "#1E1E1C"}>Recent Reports</Text>
            {reports.map((report, index) => (
              <Box key={index} bg="#1E1E1C" p={2} mb={2} borderRadius="md" _hover={{ bg: "#216D77", color: "#1E1E1C" }} onClick={() => handleSentenceClick(report.report_content)}>
                <Text color="#C7EAF3" fontSize="sm" mb={1}>{report.report_content}</Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box flex="1" p={4}>
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" mb={8}>Laudos AI</Text>
          <Box bg={darkMode ? "#1E1E1C" : "#ECEDE6"} p={6} borderRadius="md" border="1px solid" borderColor="gray.600">
            <form method="POST" action="/generate_report">
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text as="label" htmlFor="exame" fontWeight="bold" color="gray.400" mb={2} display="block">Tipo de Exame:</Text>
                  <Input id="exame" name="exame" placeholder="Ex: Radiografia de Tórax" required bg="transparent" borderColor="gray.600" color="#C7EAF3" _placeholder={{ color: "gray.400" }} _focus={{ borderColor: "#216D77" }} />
                </Box>
                <Box>
                  <Text as="label" htmlFor="achados" fontWeight="bold" color="gray.400" mb={2} display="block">Achados:</Text>
                  <Textarea id="achados" name="achados" placeholder="Descreva os achados da imagem" rows={5} required bg="transparent" borderColor="gray.600" color="#C7EAF3" _placeholder={{ color: "gray.400" }} _focus={{ borderColor: "#216D77" }} />
                </Box>
                <Button type="submit" bg="#1E1E1C" color="#C7EAF3" py={3} px={6} borderRadius="lg" _hover={{ bg: "#216D77", color: "#1E1E1C" }}>Gerar Laudo</Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </Flex>
      {isMobile && (
        <Flex as="footer" position="fixed" bottom="0" w="full" bg={darkMode ? "#242421" : "#ECEDE6"} p={4} justify="space-around" boxShadow="md">
          <IconButton aria-label="Settings" icon={<FaCog />} size="lg" variant="ghost" color={darkMode ? "#C7EAF3" : "#1E1E1C"} />
          <IconButton aria-label="Notifications" icon={<FaBell />} size="lg" variant="ghost" color={darkMode ? "#C7EAF3" : "#1E1E1C"} />
          <IconButton aria-label="Messages" icon={<FaEnvelope />} size="lg" variant="ghost" color={darkMode ? "#C7EAF3" : "#1E1E1C"} />
        </Flex>
      )}
      <Box as="footer" textAlign="center" py={4} position="absolute" bottom="0" w="full" color={darkMode ? "gray.400" : "#1E1E1C"} display={{ base: "none", md: "block" }}>
        <Text as="a" href="https://labs.laudai.online/" _hover={{ color: "#C7EAF3" }}>Labs Laudos AI</Text>
      </Box>
    </Box>
  );
};

export default Result;