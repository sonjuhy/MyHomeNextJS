import { Box } from "@mui/material";
import NavBar from "@/components/navbar/NavBar";

export default function Home() {
  return (
    <Box>
      <NavBar back="White" mode="light" sign={false}></NavBar>
    </Box>
  );
}
