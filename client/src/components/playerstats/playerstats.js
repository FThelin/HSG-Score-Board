import React from "react";
import { TableRow, TableCell } from "grommet";

import { FormEdit, FormTrash } from "grommet-icons";

const PlayerStats = (props) => {
  return (
    <TableRow>
      <TableCell scope="row">
        <strong>{props.player}</strong>
      </TableCell>
      <TableCell>{props.goals}</TableCell>
      <TableCell>{props.assists}</TableCell>
      <TableCell>{props.penalties}</TableCell>
      {console.log(props.loggedInUser)}
      {console.log(props.player)}
      {props.loggedInUser === props.player && (
        <TableCell>
          <FormEdit size="medium" color="grey" />
          <FormTrash size="medium" color="grey" />
        </TableCell>
      )}
    </TableRow>
  );
};

export default PlayerStats;
