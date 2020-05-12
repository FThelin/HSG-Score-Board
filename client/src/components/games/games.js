import React, { useState } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Form,
  TextInput,
  Button,
  FormField,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "grommet";

import { GameConsumer } from "../../context/gameContext";
import { UserConsumer } from "../../context/userContext";
import PlayerStats from "../playerstats/playerstats";

const Games = () => {
  const [value, setValue] = useState({
    goals: 0,
    assists: 0,
    penalties: 0,
  });

  const form = (allResults, loggedInUser) => {
    for (const result of allResults) {
      if (result.user.username != loggedInUser) {
        return false;
      }
    }
    return true;
  };

  return (
    <UserConsumer>
      {(user) => (
        <GameConsumer>
          {(game) => (
            <Accordion>
              {game.state.games.map((theGame, index) => (
                <AccordionPanel
                  key={index}
                  label={`${theGame.team} (${theGame.type}) ${theGame.date}`}
                >
                  <Box pad="medium" background="light-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell scope="col" border="bottom">
                            Spelare
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            Mål
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            Assist
                          </TableCell>
                          <TableCell scope="col" border="bottom">
                            Utv.min
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      {game.state.allResults.map((result) => (
                        <TableBody key={result._id}>
                          {result.game._id === theGame._id ? (
                            <PlayerStats
                              id={result._id}
                              player={result.user.username}
                              goals={result.goals}
                              assists={result.assists}
                              penalties={result.penalties}
                              loggedInUser={user.state.loggedInUser}
                            />
                          ) : null}
                        </TableBody>
                      ))}
                    </Table>

                    {form(game.state.allResults, user.state.loggedInUser) && (
                      <Form
                        value={value}
                        onChange={(nextValue) => setValue(nextValue)}
                        onReset={() => setValue({})}
                        onSubmit={({ value }) => {
                          game.createPost(
                            user.state.loggedInUserId,
                            theGame._id,
                            value
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
