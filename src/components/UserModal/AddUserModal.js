import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";

export function AddUserModal({ isOpen, onClose, onSave }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [employeeType, setEmployeeType] = React.useState("");
  const [districtId, setDistrictId] = React.useState(0);

  const handleSave = () => {
    const userData = {
      firstName,
      lastName,
      employeeType,
      districtId,
    };
    onSave(userData);
    setFirstName("");
    setLastName("");
    setEmployeeType("");
    setDistrictId(0);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
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
          label="Employee Type"
          value={employeeType}
          onChange={(e) => setEmployeeType(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="District ID"
          type="number"
          value={districtId}
          onChange={(e) => setDistrictId(parseInt(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
