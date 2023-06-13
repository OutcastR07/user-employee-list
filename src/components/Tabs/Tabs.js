import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { AdminUserList, EmployeeUserList } from "../UserList/UserList";

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await fetch(
        "http://59.152.62.177:8085/api/Employee/EmployeeData"
      );
      const data = await response.json();
      setUserList(data.readEmployeeData);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const renderUserList = () => {
    let filteredUserList = [];
    if (value === 0) {
      filteredUserList = userList.filter(
        (user) => user.employeeType === "Admin"
      );
    } else if (value === 1) {
      filteredUserList = userList.filter(
        (user) => user.employeeType === "Employee"
      );
    }

    filteredUserList = filteredUserList.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return fullName.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (value === 0) {
      return <AdminUserList userList={filteredUserList} />;
    } else if (value === 1) {
      return <EmployeeUserList userList={filteredUserList} />;
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        <Tab label="User" sx={{ fontWeight: "bold" }} />
        <Tab label="Employee" sx={{ fontWeight: "bold" }} />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Add User clicked")}
        >
          Add User
        </Button>
        <TextField
          id="search-input"
          label="Search..."
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </Box>
      {renderUserList()}
    </Box>
  );
}
