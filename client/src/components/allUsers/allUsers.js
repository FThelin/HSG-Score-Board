import React from "react";
import {
  Box,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "grommet";
import { UserConsumer } from "../../context/userContext";
import { FormEdit, FormTrash } from "grommet-icons";

const AllUsers = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Användare
          </TableCell>
          <TableCell scope="col" border="bottom">
            Ändra/Ta bort
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <UserConsumer>
          {(user) =>
            user.state.allUsers.map(
              (theUser) =>
                theUser.username !== "admin" && (
                  <TableRow key={theUser._id}>
                    <TableCell scope="row">
                      <strong>{theUser.username}</strong>
                    </TableCell>
                    <TableCell>
                      <FormEdit
                        size="medium"
                        color="grey"
                        // onClick={() => user.updateUser(user._id)}
                      ></FormEdit>

                      <FormTrash
                        onClick={() => user.deleteUser(theUser._id)}
                        size="medium"
                        color="grey"
                      ></FormTrash>
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

export default AllUsers;
