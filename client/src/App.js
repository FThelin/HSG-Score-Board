import React, { useState } from "react";
import { Grommet, Tabs, Tab, Box, Button, Layer, Text } from "grommet";
import Games from "./components/games/games";
import Scoreboard from "./components/scoreboard/scoreboard";
import Register from "./components/register/register";
import AllUsers from "./components/allUsers/allUsers";
import UserProvider, { UserConsumer } from "./context/userContext";
import GameProvider from "./context/gameContext";

import Login from "./components/login/login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  return (
    <UserProvider>
      <GameProvider>
        <UserConsumer>
          {(user) => (
            <Grommet>
              <Button
                label="Ny användare"
                onClick={() => setShowRegister(true)}
              />
              <Button label="Logga in" onClick={() => setShowLogin(true)} />
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
                <Text>Logged in as: {user.state.loggedInUser}</Text>
              )}
              {user.state.loggedInUser === "admin" && (
                <Button
                  onClick={() => {
                    setShowAllUsers(true);
                    user.getAllUsers();
                  }}
                  primary
                  label="Alla användare"
                ></Button>
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

              <Tabs>
                <Tab title="Poängliga">
                  <Box pad="medium">
                    <Scoreboard />
                  </Box>
                </Tab>
                <Tab title="Spelschema">
                  <Box pad="medium">
                    <Games />
                  </Box>
                </Tab>
              </Tabs>
            </Grommet>
          )}
        </UserConsumer>
      </GameProvider>
    </UserProvider>
  );
};

export default App;
