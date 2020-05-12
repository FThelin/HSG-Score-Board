import React, { useState, useEffect } from "react";
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
  const [theUser, setTheUser] = useState("");
  const [showRegisterConfirmation, setShowRegisterConfirmation] = useState(
    false
  );

  useEffect(() => {
    if (document.cookie) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("USER:", user);
      setTheUser(user);
    } else {
      localStorage.clear();
    }
  }, [document.cookie]);

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
                  <Login setShowLogin={setShowLogin} />
                </Layer>
              )}
              {theUser && <Text>Logged in as: {theUser}</Text>}

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
