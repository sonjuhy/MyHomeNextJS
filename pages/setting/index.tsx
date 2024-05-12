import NavBar from "@/components/navbar/NavBar";
import { Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Setting = () => {
  const [id, setId] = useState("ID");
  const [name, setName] = useState("Name");
  const [auth, setAuth] = useState("Auth");
  return (
    <>
      <div>
        <NavBar back="White" mode="light" sign={false}></NavBar>
        <Typography>Setting page</Typography>
        <Paper sx={{ backgroundColor: "#fff", borderRadius: "25px" }}>
          <Typography fontWeight={"bold"} sx={{ color: "#283a71" }}>
            Basic Info
          </Typography>
          {/* <Stack direction={"row"}>
            <Typography>ID</Typography>
            <TextField>{id}</TextField>
          </Stack>
          <Stack direction={"row"}>
            <Typography>Name</Typography>
            <TextField>{name}</TextField>
          </Stack>
          <Stack direction={"row"}>
            <Typography>Authorities</Typography>
            <TextField>{auth}</TextField>
          </Stack> */}
        </Paper>
      </div>
    </>
  );
};
export default Setting;
