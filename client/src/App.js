import React, { useState } from "react";
import { Grommet, Tabs, Tab, Box, Button, Layer } from "grommet";
import Games from "./components/games/games";
import Scoreboard from "./components/scoreboard/scoreboard";
import Register from "./components/register/register";

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState("Kalle");

  return (
    <Grommet>
      <Box>{user}</Box>
      <Button label="Ny användare" onClick={() => setShowRegister(true)} />
      {showRegister && (
        <Layer
          onEsc={() => setShowRegister(false)}
          onClickOutside={() => setShowRegister(false)}
        >
          <Register setUser={setUser} />
          <Box pad="small">
            <Button label="close" onClick={() => setShowRegister(false)} />
          </Box>
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
  );
};

export default App;
