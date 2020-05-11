import React, { useState } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Form,
  TextInput,
  Button,
  FormField,
} from "grommet";
import { GameConsumer } from "../../context/gameContext";
import { UserConsumer } from "../../context/userContext";

const Games = () => {
  const [value, setValue] = useState({
    goals: 0,
    assists: 0,
    penalties: 0,
  });

  return (
    <UserConsumer>
      {(user) => (
        <GameConsumer>
          {(game) => (
            <Accordion>
              {game.state.games.map((gamex, index) => (
                <AccordionPanel
                  key={index}
                  label={`${gamex.team} (${gamex.type}) ${gamex.date}`}
                >
                  <Box pad="medium" background="light-2">
                    {user.state.loggedInUser && (
                      <Form
                        value={value}
                        onChange={(nextValue) => setValue(nextValue)}
                        onReset={() => setValue({})}
                        onSubmit={({ value }) => {
                          game.createPost(
                            user.state.loggedInUser,
                            user.state.loggedInUserId,
                            value,
                            gamex._id
                          );
                        }}
                      >
                        <FormField name="goals" label="Mål">
                          <TextInput name="goals" />
                        </FormField>
                        <FormField name="assists" label="Assists">
                          <TextInput name="assists" />
                        </FormField>
                        <FormField name="penalties" label="Utv.min">
                          <TextInput name="penalties" />
                        </FormField>
                        <Box direction="row" gap="medium">
                          <Button type="submit" primary label="Submit" />
                          <Button type="reset" label="Reset" />
                        </Box>
                      </Form>
                    )}
                  </Box>
                </AccordionPanel>
              ))}
            </Accordion>
          )}
        </GameConsumer>
      )}
    </UserConsumer>
  );
};

export default Games;
