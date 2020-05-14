import React, { useState } from "react";
import { TableRow, TableCell, Layer } from "grommet";
import { FormEdit, FormTrash } from "grommet-icons";
import { GameConsumer } from "../../context/gameContext";
import { UserConsumer } from "../../context/userContext";
import EditForm from "../editForm/editForm";

const PlayerStats = (props) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <UserConsumer>
        {(user) => (
          <GameConsumer>
            {(game) => (
              <TableRow>
                <TableCell scope="row">
                  <strong>{props.player}</strong>
                </TableCell>
                <TableCell>{props.goals}</TableCell>
                <TableCell>{props.assists}</TableCell>
                <TableCell>{props.penalties}</TableCell>
                {(props.loggedInUser === props.player ||
                  user.state.userRole === "admin") && (
                  <TableCell>
                    <FormEdit
                      size="medium"
                      color="grey"
                      onClick={() => setShowEditForm(true)}
                    ></FormEdit>
                    <FormTrash
                      onClick={() => game.deleteResult(props.id)}
                      size="medium"
                      color="grey"
                    ></FormTrash>
                  </TableCell>
                )}
                {showEditForm && (
                  <Layer
                    elevation="medium"
                    onEsc={() => setShowEditForm(false)}
                    onClickOutside={() => setShowEditForm(false)}
                  >
                    <EditForm
                      gameId={props.id}
                      editPost={props.editPost}
                      setShowEditForm={setShowEditForm}
                    />
                  </Layer>
                )}
              </TableRow>
            )}
          </GameConsumer>
        )}
      </UserConsumer>
    </>
  );
};

export default PlayerStats;
