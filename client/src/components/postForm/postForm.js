import React, { useState, useEffect } from "react";
import { Select, Form, FormField, TextInput, Box, Button } from "grommet";
import { UserConsumer } from "../../context/userContext";

const PostForm = (props) => {
  const [value, setValue] = useState({
    goals: 0,
    assists: 0,
    penalties: 0,
  });
  const [usernames, setUsernames] = useState([]);
  const [userValue, setUserValue] = useState("");

  useEffect(() => {
    getUserNames();
  }, []);

  const getUserNames = async () => {
    const data = await props.getAllUsers();
    for (const user of data) {
      usernames.push(user.username);
    }
  };

  return (
    <UserConsumer>
      {(user) => (
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onReset={() => setValue({})}
          onSubmit={({ value }) => {
            props.createPost(props.loggedInUser, props.gameId, value);
            props.setShowPostForm(false);
          }}
        >
          {console.log(usernames)}
          {user.state.userRole === "admin" && (
            <Select
              options={usernames}
              value={value}
              onChange={({ option }) => setUserValue(option)}
            />
          )}
          <FormField name="goals" label="Mål">
            <TextInput name="goals" />
          </FormField>
          <FormField name="assists" label="Assists">
            <TextInput name="assists" />
          </FormField>
          <FormField name="penalties" label="Utv.min">
            <TextInput name="penalties" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      )}
    </UserConsumer>
  );
};

export default PostForm;
