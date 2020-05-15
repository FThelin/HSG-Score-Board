import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text,
} from "grommet";
import { UserConsumer } from "../../context/userContext";
import { FormEdit, FormTrash, UserPolice } from "grommet-icons";
import DisplayUpdate from "./displayUpdate";

const AllUsers = () => {
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [displayUpdateId, setDisplayUpdateId] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Användare
            </TableCell>
            <TableCell scope="col" border="bottom">
              Roll
            </TableCell>
            <TableCell scope="col" border="bottom">
              Ändra/Ta bort/Roll
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <UserConsumer>
            {(user) => (
              <>
                {user.state.allUsers.map(
                  (theUser) =>
                    theUser.username !== "admin" && (
                      <TableRow key={theUser._id}>
                        <TableCell scope="row">
                          <strong>{theUser.username}</strong>
                        </TableCell>
                        <TableCell scope="row">{theUser.role}</TableCell>
                        <TableCell>
                          <FormEdit
                            size="medium"
                            color="grey"
                            onClick={() => {
                              setDisplayUpdateId(theUser._id);
                              setDisplayUpdate(true);
                              setDisplayInfo(false);
                            }}
                          ></FormEdit>

                          <FormTrash
                            onClick={() => user.deleteUser(theUser._id)}
                            size="medium"
                            color="grey"
                          ></FormTrash>

                          {theUser.role === "admin" ? (
                            <UserPolice
                              onClick={() =>
                                user.updateRole(theUser._id, "player")
                              }
                              size="medium"
                              color="blue"
                            ></UserPolice>
                          ) : (
                            <UserPolice
                              onClick={() =>
                                user.updateRole(theUser._id, "admin")
                              }
                              size="medium"
                              color="grey"
                            ></UserPolice>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                )}
                {displayInfo &&
                  (user.state.failedEditUser ? (
                    <TableRow>
                      <TableCell>
                        <Text size="small" color="red" align="center">
                          Kunde inte ändra lösenord.
                        </Text>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell>
                        <Text size="small" color="green" align="center">
                          Lösenord ändrat.
                        </Text>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </UserConsumer>
        </TableBody>
      </Table>
      {displayUpdate && (
        <DisplayUpdate
          id={displayUpdateId}
          displayUpdate={setDisplayUpdate}
          setDisplayInfo={setDisplayInfo}
        />
      )}
    </>
  );
};

export default AllUsers;
