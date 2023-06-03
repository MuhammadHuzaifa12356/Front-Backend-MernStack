import * as React from "react";

const Table = ({id, columns, data }) => (

  <table>
    <tbody>
      <tr>
        {columns.map(({ path, name }) => (
          <th key={path}>{name}</th>
        ))}
      </tr>
      {data.map(({ rowData }) => (
        <tr key={rowData[id]}>
          {columns.map(({ path }) => (
            <td key={path}>{rowData[path]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
export default Table;
