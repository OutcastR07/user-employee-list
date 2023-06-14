import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

export function AdminUserList({ userList }) {
  return (
    <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Admin User List">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>District</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.empID}>
                <TableCell sx={{ width: "20%" }}>{user.empID}</TableCell>
                <TableCell sx={{ width: "20%" }}>{user.firstName}</TableCell>
                <TableCell sx={{ width: "20%" }}>{user.lastName}</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {user.disvision.trim()}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {user.district.trim()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function EmployeeUserList({ userList }) {
  return (
    <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Employee User List">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>District</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.empID}>
                <TableCell sx={{ width: "20%" }}>{user.empID}</TableCell>
                <TableCell sx={{ width: "20%" }}>{user.firstName}</TableCell>
                <TableCell sx={{ width: "20%" }}>{user.lastName}</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {user.disvision.trim()}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {user.district.trim()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
