import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { AdminUserList, EmployeeUserList } from "../UserList/UserList";
import { AddUserModal } from "../UserModal/AddUserModal";

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [userList, setUserList] = React.useState([]);
  const [divisionList, setDivisionList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  const [selectedDivision, setSelectedDivision] = React.useState("all");
  const [selectedDistrict, setSelectedDistrict] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalSaved, setIsModalSaved] = React.useState(false); // Track if the modal save action is performed
  const [isLoading, setIsLoading] = React.useState(true); // Track if data is being fetched

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    fetchUserList();
    fetchDivisionList();
  }, [isModalSaved]); // Add isModalSaved to the dependency array

  React.useEffect(() => {
    if (isModalSaved) {
      // Refresh the page while preserving the active tab
      const activeTab = new URLSearchParams(location.search).get("tab");
      navigate(`?tab=${activeTab}`, { replace: true });
      setIsModalSaved(false); // Reset isModalSaved to false after refreshing the page
    }
  }, [isModalSaved, location.search, navigate]);

  const fetchUserList = async () => {
    try {
      setIsLoading(true); // Set loading state to true while fetching data
      // Simulate delay for at least 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(
        "http://59.152.62.177:8085/api/Employee/EmployeeData"
      );
      const data = await response.json();
      setUserList(data.readEmployeeData);
      setIsLoading(false); // Data fetching completed, set isLoading to false
    } catch (error) {
      console.error("Error fetching user list:", error);
      setIsLoading(false); // Data fetching failed, set isLoading to false
    }
  };

  const fetchDivisionList = async () => {
    try {
      const response = await fetch(
        "http://59.152.62.177:8085/api/Employee/Division"
      );
      const data = await response.json();
      setDivisionList(data.readDivisionData);
    } catch (error) {
      console.error("Error fetching division list:", error);
    }
  };

  const fetchDistrictList = async (divisionId) => {
    try {
      const response = await fetch(
        `http://59.152.62.177:8085/api/Employee/District/${divisionId}`
      );
      const data = await response.json();
      setDistrictList(data.readDistrictData);
    } catch (error) {
      console.error("Error fetching district list:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDivisionChange = (event) => {
    const divisionId = event.target.value;
    setSelectedDivision(divisionId);
    fetchDistrictList(divisionId);

    // Automatically select "All District" when "All Division" is selected
    if (divisionId === "all") {
      setSelectedDistrict("all");
    }
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveUser = async (userData) => {
    // Perform save user operation using the provided API endpoint
    try {
      const response = await fetch(
        "http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserList([...userList, data]); // Add the saved user to the user list
        setIsModalOpen(false);
        setIsModalSaved(true); // Set isModalSaved to true after successfully saving the user
      } else {
        console.error("Failed to save user:", data);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
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
      return (
        <EmployeeUserList
          userList={filteredUserList}
          divisionList={divisionList}
          districtList={districtList}
          selectedDivision={selectedDivision}
          selectedDistrict={selectedDistrict}
          onDivisionChange={handleDivisionChange}
          onDistrictChange={handleDistrictChange}
        />
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="tabs example"
        centered
      >
        <Tab label="User" sx={{ fontWeight: "bold", fontSize: "1.2rem" }} />
        <Tab label="Employee" sx={{ fontWeight: "bold", fontSize: "1.2rem" }} />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
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
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <BounceLoader color="#368bd6" />
        </Box>
      ) : (
        renderUserList()
      )}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </Box>
  );
}
