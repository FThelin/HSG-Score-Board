import React, { useState } from "react";
import { Form, FormField, TextInput, Box, Button, Text } from "grommet";
import { UserConsumer } from "../../context/userContext";

const Login = (props) => {
  const [value, setValue] = useState({ loggedinusername: "", password: "" });
  const [reveal, setReveal] = useState(false);

  return (
    <UserConsumer>
      {(user) => (
        <Box pad="large">
          <Form
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onReset={() => setValue({})}
            onSubmit={({ value }) => {
              user.loginUser(value);
            }}
          >
            <FormField name="loggedinusername" label="Användarnamn">
              <TextInput name="loggedinusername" />
            </FormField>
            <FormField name="password" label="Lösenord">
              <TextInput type={reveal ? "text" : "password"} name="password" />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Logga in" />
              <Button type="reset" label="Reset" />
            </Box>

            {user.state.failedLogin && (
              <Box margin={{ top: "small" }} align="center">
                <Text size="small" color="red" align="center">
                  Fel användarnamn eller lösenord.
                </Text>
              </Box>
            )}
          </Form>
        </Box>
      )}
    </UserConsumer>
  );
};

export default Login;
