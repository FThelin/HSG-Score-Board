import React, { useState, useContext } from "react";
import { Form, FormField, TextInput, Box, Button } from "grommet";
import { UserConsumer } from "../../context/userContext";

const Register = (props) => {
  const [value, setValue] = useState({ username: "", password: "" });
  const [reveal, setReveal] = useState(false);

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
                user
                  .createUser(value)
                  .then(props.setShowRegisterConfirmation(true));
              }}
            >
              {console.log(user.state.username)}
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
            </Form>
          </Box>
        </>
      )}
    </UserConsumer>
  );
};

export default Register;
