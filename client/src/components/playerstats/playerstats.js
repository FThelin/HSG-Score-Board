import React from "react";
import { TableRow, TableCell } from "grommet";
import { FormEdit, FormTrash } from "grommet-icons";
import { GameConsumer } from "../../context/gameContext";

const PlayerStats = (props) => {
  return (
    <>
      <GameConsumer>
        {(game) => (
          <TableRow>
            <TableCell scope="row">
              <strong>{props.player}</strong>
            </TableCell>
            <TableCell>{props.goals}</TableCell>
            <TableCell>{props.assists}</TableCell>
            <TableCell>{props.penalties}</TableCell>
            {props.loggedInUser === props.player && (
              <TableCell>
                <FormEdit
                  size="medium"
                  color="grey"
                  // onClick={}
                ></FormEdit>
                <FormTrash
                  onClick={() => game.deleteResult(props.id)}
                  size="medium"
                  color="grey"
                ></FormTrash>
              </TableCell>
            )}
          </TableRow>
        )}
      </GameConsumer>
    </>
  );
};

export default PlayerStats;
