import React, { useState } from "react";
import { Image, Grommet, Tabs, Tab, Box, Button, Layer, Text } from "grommet";
import Games from "./components/games/games";
import Scoreboard from "./components/scoreboard/scoreboard";
import Register from "./components/register/register";
import AllUsers from "./components/allUsers/allUsers";
import UserProvider, { UserConsumer } from "./context/userContext";
import GameProvider, { GameConsumer } from "./context/gameContext";
import bgImage from "./assets/bg.gif";

import Login from "./components/login/login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const theTheme = {
    global: {
      font: {
        family: "Teko",
      },
      colors: {
        brand: "#878787",
      },
    },
  };

  return (
    <UserProvider>
      <GameProvider>
        <UserConsumer>
          {(user) => (
            <Grommet theme={theTheme}>
              <div
                style={{
                  height: "7rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image src={bgImage} fit="contain" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <Button
                    label="Ny användare"
                    onClick={() => setShowRegister(true)}
                  />
                  {!user.state.loggedInUser ? (
                    <Button
                      label="Logga in"
                      onClick={() => setShowLogin(true)}
                    />
                  ) : (
                    <Button
                      label="Logga ut"
                      onClick={() => user.logoutUser()}
                    />
                  )}
                  {user.state.userRole === "admin" && (
                    <Button
                      onClick={() => {
                        setShowAllUsers(true);
                        user.getAllUsers();
                      }}
                      primary
                      label="Alla användare"
                    ></Button>
                  )}
                </div>

                {showRegister && (
                  <Layer
                    elevation="medium"
                    onEsc={() => setShowRegister(false)}
                    onClickOutside={() => setShowRegister(false)}
                  >
                    <Register setShowRegister={setShowRegister} />
                  </Layer>
                )}
                {showLogin && (
                  <Layer
                    elevation="medium"
                    onEsc={() => setShowLogin(false)}
                    onClickOutside={() => setShowLogin(false)}
                  >
                    <Login setShowLogin={setShowLogin} />
                  </Layer>
                )}
                {user.state.loggedInUser && (
                  <Text justifySelf="right">
                    Logged in as: {user.state.loggedInUser}
                  </Text>
                )}
                {showAllUsers && (
                  <Layer
                    elevation="medium"
                    onEsc={() => setShowAllUsers(false)}
                    onClickOutside={() => setShowAllUsers(false)}
                  >
                    <AllUsers />
                  </Layer>
                )}
              </div>
              <GameConsumer>
                {(game) => (
                  <Tabs>
                    <Tab title="Poängliga">
                      <Box pad="medium">
                        <Scoreboard results={game.state.allResults} />
                      </Box>
                    </Tab>
                    <Tab title="Spelschema">
                      <Box pad="medium">
                        <Games />
                      </Box>
                    </Tab>
                  </Tabs>
                )}
              </GameConsumer>
            </Grommet>
          )}
        </UserConsumer>
      </GameProvider>
    </UserProvider>
  );
};

export default App;
