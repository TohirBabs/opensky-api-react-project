import React from "react";
import { styled } from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "airport" | "time" | "arriving" | "departing";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "airport", label: "Airport", minWidth: 120 },
  {
    id: "time",
    label: "Time",
    minWidth: 150,
    format: (value: number) =>
      new Date(value).toLocaleTimeString("en-US", {
        timeZoneName: "short",
      }),
  },
  {
    id: "arriving",
    label: "Arriving",
    minWidth: 100,
    align: "right",
  },
  {
    id: "departing",
    label: "Departing",
    minWidth: 100,
    align: "right",
  },
];

interface Data {
  airport: string;
  time: string;
  arriving: number;
  departing: number;
}

function createData(
  airport: string,
  time: string,
  arriving: number,
  departing: number
): Data {
  return { airport, time, arriving, departing };
}

function getOccurrence(array: string[], value: string) {
  return array.filter((v) => v === value).length;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [tableData, setTableData] = React.useState<Data[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const currentTime = Math.floor(Date.now() / 1000);
  const dayStart = currentTime - 7200;
  const depPorts: string[] = [];
  const arrPorts: string[] = [];

  React.useEffect(() => {
    async function getData() {
      const apiData = await fetch(
        `https://opensky-network.org/api/flights/all?begin=${dayStart}&end=${currentTime}`
      ).then((response) => response.json());
      console.log(apiData);

      apiData.forEach((flightData: any) => {
        flightData.estDepartureAirport &&
          depPorts.push(flightData.estDepartureAirport);
      });
      apiData.forEach((flightData: any) => {
        flightData.estDepartureAirport &&
          arrPorts.push(flightData.estDepartureAirport);
      });
      apiData.forEach((flightData: any) => {
        flightData.estDepartureAirport &&
          setTableData(
            (current) =>
              [
                ...current,
                createData(
                  flightData.estDepartureAirport,
                  //  flightData.estArrivalAirport,
                  flightData.firstSeen,
                  getOccurrence(arrPorts, flightData.estArrivalAirport),
                  getOccurrence(depPorts, flightData.estDepartureAirport)
                ),
              ] as Data[]
          );
      });
    }

    getData();
  }, []);

  console.log(tableData);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
