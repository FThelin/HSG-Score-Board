import React, { useState } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  Button,
} from "grommet";

import { GameConsumer } from "../../context/gameContext";
import { UserConsumer } from "../../context/userContext";
import PlayerStats from "../playerstats/playerstats";
import PostForm from "../postForm/postForm";

const Games = () => {
  const [showPostForm, setShowPostForm] = useState(false);

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
                              editPost={game.editPost}
                            />
                          ) : null}
                        </TableBody>
                      ))}
                    </Table>

                    <Button
                      primary
                      label="Lägg till dina poäng"
                      onClick={() => setShowPostForm(true)}
                    />

                    {showPostForm && (
                      <PostForm
                        loggedInUser={user.state.loggedInUserId}
                        gameId={theGame._id}
                        createPost={game.createPost}
                        setShowPostForm={setShowPostForm}
                      />
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
