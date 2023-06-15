import { Button, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Link } from "react-router-dom";

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
                <TableCell sx={{ width: "10%" }}>
                  <Button
                    component={Link}
                    to={`/user-details/${user.empID}`}
                    variant="contained"
                    color="primary"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function EmployeeUserList({
  userList,
  divisionList = [],
  districtList = [],
  selectedDivision,
  selectedDistrict,
  onDivisionChange,
  onDistrictChange,
}) {
  // Filter the user list based on the selected division and district
  let filteredUserList = userList;
  if (selectedDivision !== "all") {
    filteredUserList = filteredUserList.filter(
      (user) => user.divisionId === selectedDivision
    );
  }
  if (selectedDistrict !== "all") {
    filteredUserList = filteredUserList.filter(
      (user) => user.districeID === selectedDistrict
    );
  }

  return (
    <Box sx={{ margin: "20px" }}>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          id="division-select"
          select
          label="Division"
          variant="outlined"
          size="small"
          value={selectedDivision}
          onChange={onDivisionChange}
          fullWidth
        >
          <MenuItem value="all">All Division</MenuItem>
          {divisionList.map((division) => (
            <MenuItem key={division.divID} value={division.divID}>
              {division.divisionName.trim()}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <TextField
          id="district-select"
          select
          label="District"
          variant="outlined"
          size="small"
          value={selectedDistrict}
          onChange={onDistrictChange}
          fullWidth
        >
          <MenuItem value="all">All District</MenuItem>
          {districtList.map((district) => (
            <MenuItem key={district.districtID} value={district.districtID}>
              {district.districtName.trim()}
            </MenuItem>
          ))}
        </TextField>
      </Box>

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
            {filteredUserList.map((user) => (
              <TableRow key={user.empID}>
                <TableCell sx={{ width: "20%" }}>{user.empID}</TableCell>
                <TableCell sx={{ width: "20%" }}>{user.firstName}</TableCell>
                <TableCell sx={{ width: "20%" }}>{user.lastName}</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {user.disvision ? user.disvision.trim() : ""}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {user.district ? user.district.trim() : ""}
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <Button
                    component={Link}
                    to={`/user-details/${user.empID}`}
                    variant="contained"
                    color="primary"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
