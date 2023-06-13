import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    </Box>
  );
}
