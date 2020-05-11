import React, { useState } from "react";
import { Grommet, Tabs, Tab, Box, Button, Layer, Text } from "grommet";
import Games from "./components/games/games";
import Scoreboard from "./components/scoreboard/scoreboard";
import Register from "./components/register/register";
import UserProvider, { UserConsumer } from "./context/userContext";
import GameProvider from "./context/gameContext";
import { LinkDown } from "grommet-icons";
import Login from "./components/login/login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterConfirmation, setShowRegisterConfirmation] = useState(
    false
  );

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
                  <Register
                    setShowRegisterConfirmation={setShowRegisterConfirmation}
                  />
                  {showRegisterConfirmation && (
                    <Box
                      // animation={{
                      //   duration: "1s",
                      //   jiggle: { duration: "0.1s" },
                      // }}
                      pad="small"
                      align="center"
                    >
                      <Text>Användare {user.state.username} skapad.</Text>
                      <Text>Vänligen logga in.</Text>
                      <LinkDown size="medium" color="gray" />
                      <Button
                        label="close"
                        onClick={() => setShowRegister(false)}
                      />
                    </Box>
                  )}
                </Layer>
              )}
              {showLogin && (
                <Layer
                  elevation="medium"
                  onEsc={() => setShowLogin(false)}
                  onClickOutside={() => setShowLogin(false)}
                >
                  <Login />
                </Layer>
              )}
              {user.state.loggedInUser && (
                <Text>Logged in as: {user.state.loggedInUser}</Text>
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
