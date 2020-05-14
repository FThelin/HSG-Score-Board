import React, { useState } from "react";
import {
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextInput,
  Box,
  Form,
} from "grommet";
import { UserConsumer } from "../../context/userContext";

const DisplayUpdate = (props) => {
  const [value, setValue] = useState({ password: "" });
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <Table>
      <TableBody>
        <UserConsumer>
          {(user) =>
            user.state.allUsers.map(
              (theUser) =>
                theUser._id === props.id && (
                  <TableRow key={theUser._id}>
                    <TableCell scope="row">
                      <Form
                        value={value}
                        onChange={(nextValue) => setValue(nextValue)}
                        onReset={() => setValue({})}
                        onSubmit={({ value }) => {
                          user
                            .updateUser(props.id, value)
                            .then(props.setDisplayInfo(true))
                            .then(props.displayUpdate(false));
                        }}
                      >
                        <TextInput name="password" placeholder="New password" />

                        <Box>
                          <Button type="submit" primary label="Uppdatera" />
                        </Box>
                      </Form>
                    </TableCell>
                  </TableRow>
                )
            )
          }
        </UserConsumer>
      </TableBody>
    </Table>
  );
};

export default DisplayUpdate;

// onClick={() => user.updateUser(user._id)}
