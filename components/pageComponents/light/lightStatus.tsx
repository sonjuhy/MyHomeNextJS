import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { useEffect, useState } from "react";
import Image from "next/image";

import OffImage from "/public/image/icon/light-off-cardview.png";
import OnImage from "/public/image/icon/light-on-cardview.png";
import Disconnection from "/public/image/icon/disconnection.png";
import RecordIcon from "/public/image/icon/record_list.png";
import BulbBlackIcon from "/public/image/icon/bulb_black.png";
import BulbWhiteIcon from "/public/image/icon/bulb_white.png";
import LightModeIcon from "@mui/icons-material/LightMode";

import { Card, Col, Container, Form, Row, Stack } from "react-bootstrap";
import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import Switch, { SwitchProps } from "@mui/material/Switch";

interface LightRecord {
  pk: number;
  room: string;
  time: string;
  day: string;
  action: boolean; // true : on, false : off
  user: string;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

type props = {
  roomData: roomInfo;
};
interface roomInfo {
  room: string;
  state: string;
  kor: string;
  category: string;
  connect: string;
}
export default function LightStatus({ roomData }: props): JSX.Element {
  const [status, setStatus] = useState(false);
  const [connection, setConnection] = useState(false);
  const [infoStatus, setInfoStatus] = useState(true);
  const [lightStatus, setLightStatus] = useState(false);
  const [recordList, setRecordList] = useState<LightRecord[]>([]);

  const changeStatus = async () => {
    const accessToken =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;
    const bodyData = {
      room: roomData.room,
      kor: roomData.kor,
      category: roomData.category,
      state: status ? "Off" : "On",
      connect: roomData.connect,
    };
    const response = await sendToSpring(
      "/light/control/" + accessToken,
      "POST",
      bodyData,
      ""
    );
    if (response.result === 200) {
      setStatus(!status);
    }
  };

  const getRecordByRoom = async (roomId: string) => {
    const accessToken =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;
    const response: any = await sendToSpring(
      "/light/getLast10Record/" + roomId,
      "GET",
      "",
      ""
    );
    if (response.result === 200) {
      const tmpList: LightRecord[] = [];
      for (const item of response.data) {
        let tmpData: LightRecord = {
          pk: item.pk,
          room: item.room,
          time: item.time,
          day: item.day,
          action: item.action,
          user: item.user,
        };
        tmpList.push(tmpData);
      }
      setRecordList(tmpList);
    }
  };

  useEffect(() => {
    roomData.state === "Off" ? setStatus(false) : setStatus(true);
    roomData.connect === "Off" ? setConnection(false) : setConnection(true);
    if (roomData !== null) {
      setInfoStatus(false);
    }
    setLightStatus(roomData.state === "Off" ? true : false);
    getRecordByRoom(roomData.room);
  }, [roomData]);
  return (
    <Paper
      sx={{ backgroundColor: "#fff", borderRadius: "25px", padding: "1rem" }}
    >
      <Box sx={{ margin: "1rem" }}>
        <Stack direction="horizontal">
          <LightModeIcon />
          <Typography fontWeight={"bold"} fontSize={24}>
            {roomData.kor}
          </Typography>
        </Stack>
        <Typography variant="overline" style={{ color: "#888" }}>
          Category : {roomData.category}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Stack
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                alt="bulb status image"
                src={
                  connection
                    ? status
                      ? BulbWhiteIcon
                      : BulbBlackIcon
                    : Disconnection
                }
                style={{
                  backgroundColor: status ? "#3edbc4" : "#EEEFFF",
                  borderRadius: "25px",
                }}
              />
              <br />
              <Typography variant="overline" fontWeight={"bold"} fontSize={18}>
                status : {status ? "on" : "off"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Stack
              direction="horizontal"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography fontWeight={"bold"} fontSize={"1.5rem"}>
                <SettingsRemoteIcon sx={{ marginRight: "0.5rem" }} />
                Control
              </Typography>
              <Box>
                <FormControlLabel
                  control={
                    <MaterialUISwitch sx={{ m: 1 }} checked={lightStatus} />
                  }
                  label={roomData.state}
                />
              </Box>
            </Stack>
            <Divider variant="middle" style={{ color: "#000" }} />
            <Typography fontWeight={"bold"} fontSize={"1.5rem"}>
              <DvrIcon sx={{ marginRight: "0.5rem" }} />
              Record
            </Typography>
            <TableContainer>
              <Table>
                <caption>Displays the last 10 data.</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: recordList.length }).map(
                    (_, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{recordList[index].day}</TableCell>
                        <TableCell>{recordList[index].time}</TableCell>
                        <TableCell>{recordList[index].action}</TableCell>
                        <TableCell>{recordList[index].user}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
