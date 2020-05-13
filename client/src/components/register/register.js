import React, { useState } from "react";
import { Form, FormField, TextInput, Box, Button, Text } from "grommet";
import { UserConsumer } from "../../context/userContext";

const Register = (props) => {
  const [value, setValue] = useState({ username: "", password: "" });
  const [reveal, setReveal] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <UserConsumer>
      {(user) => (
        <>
          <Box pad="large">
            <Form
              value={value}
              onChange={(nextValue) => setValue(nextValue)}
              onReset={() => setValue({})}
              onSubmit={({ value }) => {
                user.createUser(value).then(setDisplayInfo(true));
              }}
            >
              <FormField name="username" label="Användarnamn">
                <TextInput name="username" />
              </FormField>
              <FormField name="password" label="Lösenord">
                <TextInput
                  type={reveal ? "text" : "password"}
                  name="password"
                />
              </FormField>
              <Box direction="row" gap="medium">
                <Button type="submit" primary label="Submit" />
                <Button type="reset" label="Reset" />
              </Box>
              {displayInfo &&
                (user.state.failedRegister ? (
                  <Box margin={{ top: "small" }} align="center">
                    <Text size="small" color="red" align="center">
                      Användarnamn finns redan. Prova ett annat.
                    </Text>
                  </Box>
                ) : (
                  <Box margin={{ top: "small" }} align="center">
                    <Text size="small" color="green" align="center">
                      Användare skapad. Vänligen logga in.
                    </Text>
                    <Button
                      label="Stäng"
                      onClick={() => props.setShowRegister(false)}
                    ></Button>
                  </Box>
                ))}
            </Form>
          </Box>
        </>
      )}
    </UserConsumer>
  );
};

export default Register;
