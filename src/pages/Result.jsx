import React, { useEffect, useState } from 'react';
import { Container, Box, Text, Button, VStack, HStack, Input, Textarea } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPrint } from "react-icons/fa";

const Result = () => {
  const [reports, setReports] = useState([]);
  const [selectedSentences, setSelectedSentences] = useState([]);
  const [finalReport, setFinalReport] = useState("");

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

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Text fontSize="3xl" fontWeight="bold">Generate Radiological Report</Text>
        <HStack spacing={4} width="100%">
          <Box flex="1" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" mb={4}>Previous Reports</Text>
            {reports.map((report, index) => (
              <Box key={index} p={2} mb={2} bg="white" borderRadius="md" boxShadow="sm" onClick={() => handleSentenceClick(report.report_content)}>
                <Text>{report.report_content}</Text>
              </Box>
            ))}
          </Box>
          <Box flex="1" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" mb={4}>Selected Sentences</Text>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="selectedSentences">
                {(provided) => (
                  <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={2}>
                    {selectedSentences.map((sentence, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} p={2} bg="white" borderRadius="md" boxShadow="sm">
                            <Text>{sentence}</Text>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </HStack>
        <Box width="100%" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
          <Text fontSize="xl" mb={4}>Final Report</Text>
          <Textarea value={finalReport} onChange={handleReportChange} placeholder="Compile your final report here..." rows={10} />
        </Box>
        <Button leftIcon={<FaPrint />} colorScheme="teal" onClick={handlePrint}>Print Report</Button>
      </VStack>
    </Container>
  );
};

export default Result;