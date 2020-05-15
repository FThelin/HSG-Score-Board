import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";

const Scoreboard = (props) => {
  const [mergedResult, setMergedResult] = useState([]);
  useEffect(() => {
    for (const res of props.results) {
      res.games = 1;
      res.score = res.goals + res.assists;
    }

    var properties = ["goals", "assists", "penalties", "games", "score"];

    var map = props.results.reduce(function (map, e) {
      map[e.user.username] = properties.map(function (property, i) {
        return +e[property] + ((map[e.user.username] || [])[i] || 0);
      });
      return map;
    }, {});

    let result = Object.keys(map).map(function (k) {
      return map[k].reduce(
        function (object, e, i) {
          object[properties[i]] = e;
          return object;
        },
        { Player: k }
      );
    });

    let sortedList = result.sort((a, b) =>
      a.goals + a.assists < b.goals + b.assists ? 1 : -1
    );
    setMergedResult(sortedList);
  }, [props.results]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Spelare
          </TableCell>
          <TableCell scope="col" border="bottom">
            Matcher
          </TableCell>
          <TableCell scope="col" border="bottom">
            Mål
          </TableCell>
          <TableCell scope="col" border="bottom">
            Assist
          </TableCell>
          <TableCell scope="col" border="bottom">
            Poäng
          </TableCell>
          <TableCell scope="col" border="bottom">
            Utv.min
          </TableCell>
          <TableCell scope="col" border="bottom">
            Poängsnitt
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mergedResult.map((result) => (
          <TableRow key={result.Player}>
            <TableCell scope="row">
              <strong>{result.Player}</strong>
            </TableCell>
            <TableCell>{result.games}</TableCell>
            <TableCell>{result.goals}</TableCell>
            <TableCell>{result.assists}</TableCell>
            <TableCell>
              <strong>{result.goals + result.assists}</strong>
            </TableCell>
            <TableCell>{result.penalties}</TableCell>
            <TableCell>{(result.score / result.games).toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Scoreboard;
