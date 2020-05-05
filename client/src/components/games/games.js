import React from "react";
import { Accordion, AccordionPanel, Box, Text } from "grommet";

const Games = () => {
  return (
    <Accordion>
      <AccordionPanel label="Game 1">
        <Box pad="medium" background="light-2">
          <Text>One</Text>
        </Box>
      </AccordionPanel>
      <AccordionPanel label="Game 2">
        <Box pad="medium" background="light-2">
          <Text>Two</Text>
        </Box>
      </AccordionPanel>
    </Accordion>
  );
};

export default Games;
