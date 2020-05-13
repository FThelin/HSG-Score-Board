import React, { useState } from "react";
import { Form, FormField, TextInput, Box, Button } from "grommet";

const PostForm = (props) => {
  const [value, setValue] = useState({
    goals: 0,
    assists: 0,
    penalties: 0,
  });

  return (
    <Form
      value={value}
      onChange={(nextValue) => setValue(nextValue)}
      onReset={() => setValue({})}
      onSubmit={({ value }) => {
        props.createPost(props.loggedInUser, props.gameId, value);
        props.setShowPostForm(false);
      }}
    >
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
  );
};

export default PostForm;
