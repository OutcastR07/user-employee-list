import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function UserDetails() {
  const { empID } = useParams();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [districtId, setDistrictId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details based on empID
    fetch(
      `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${empID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data.readEmployeeData[0]);
        setFirstName(data.readEmployeeData[0].firstName);
        setLastName(data.readEmployeeData[0].lastName);
        setEmployeeType(data.readEmployeeData[0].employeeType);
        setDistrictId(data.readEmployeeData[0].districtId);
      })
      .catch((error) => console.log(error));
  }, [empID]);

  const handleUpdate = () => {
    const updatedUser = {
      empID,
      firstName,
      lastName,
      employeeType,
      districeID: districtId,
    };
    // Update user details
    fetch(
      `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${empID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          // Update user details in the state
          setUser({
            ...user,
            firstName,
            lastName,
            employeeType,
            districtId,
          });
          // Close the modal
          setIsModalOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ margin: "20px" }}>
      <h1
        style={{ marginBottom: "30px", fontSize: "25px", fontWeight: "bold" }}
      >
        User Details
      </h1>
      <TextField
        label="First Name"
        value={user.firstName}
        disabled
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        value={user.lastName}
        disabled
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Employee Type"
        value={user.employeeType}
        disabled
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Employee">Employee</MenuItem>
      </TextField>
      {user.districtId ? (
        <TextField
          type="number"
          value={user.districtId}
          disabled
          fullWidth
          sx={{ mb: 2 }}
        />
      ) : (
        <TextField
          label="District ID"
          type="number"
          disabled
          fullWidth
          sx={{ mb: 2 }}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleModalOpen}>
        Edit
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ ml: 2 }}
      >
        Back
      </Button>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 3,
          }}
        >
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Employee Type"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </TextField>
          <TextField
            label="District ID"
            type="number"
            value={districtId}
            onChange={(e) =>
              setDistrictId(Math.max(parseInt(e.target.value), 0))
            }
            fullWidth
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
