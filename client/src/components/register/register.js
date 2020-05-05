import React, { useState } from "react";
import { Form, FormField, TextInput, Box, Button } from "grommet";

const Register = (props) => {
  const [value, setValue] = useState({});
  const [reveal, setReveal] = useState(false);

  async function createUser(data) {
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  return (
    <Box pad="large">
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }) => {
          createUser(value).then((data) => {
            props.setUser(data.username);
          });
        }}
      >
        <FormField name="username" label="Användarnamn">
          <TextInput name="username" />
        </FormField>
        <FormField name="password" label="Lösenord">
          <TextInput type={reveal ? "text" : "password"} name="password" />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </Box>
  );
};

export default Register;
