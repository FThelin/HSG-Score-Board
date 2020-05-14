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
  const [userId, setUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUserNames();
  }, []);

  const getUserNames = async () => {
    const data = await props.getAllUsers();
    setAllUsers(data);
    if (data) {
      for (const user of data) {
        usernames.push(user.username);
      }
    }
  };

  const getUserId = (name) => {
    let id = allUsers.find((user) => user.username === name);
    if (id) {
      setUserId(id._id);
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
            if (user.state.userRole === "admin") {
              props.createPost(userId, props.gameId, value);
            } else {
              props.createPost(props.loggedInUser, props.gameId, value);
            }
            props.setShowPostForm(false);
          }}
        >
          {user.state.userRole === "admin" && (
            <Select
              options={usernames}
              value={value}
              onChange={({ option }) => getUserId(option)}
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
