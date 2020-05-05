import React from "react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";

const Scoreboard = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Spelare
          </TableCell>
          <TableCell scope="col" border="bottom">
            Mål
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell scope="row">
            <strong>Fredrik Thelin</strong>
          </TableCell>
          <TableCell>20</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">
            <strong>Jonathan Dahlgren</strong>
          </TableCell>
          <TableCell>0</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Scoreboard;
