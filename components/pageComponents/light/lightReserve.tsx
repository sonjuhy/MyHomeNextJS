import sendToSpring from "@/modules/sendToSpring/sendToSpring";

import LightReserveModal from "./lightReserveModal";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Card, Col, Container, Form, Row, Stack } from "react-bootstrap";

import AddIcon from "/public/image/icon/add.png";
import NoDataIcon from "/public/image/icon/nofile.png";
import ErrorIcon from "/public/image/icon/error.png";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface LightReservation {
  action: boolean; // true : on, false : off
  activated: boolean; // true : worked, false : not yet
  holiday: boolean; // true : active, false : deactivate
  reiteration: boolean; // true : repeat, false : only once
  day: string;
  name: string;
  room: string;
  roomKor: string;
  time: string;
}

type props = {
  room: string;
};

export default function LightSelector({ room }: props): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationStatus, setReservationStatus] = useState(false);
  const [reservationList, setReservationList] = useState<LightReservation[]>(
    []
  );

  const addButtonListener = () => {
    setModalVisible(!modalVisible);
  };
  const getReserveList = async () => {
    const response = await sendToSpring("/light/getReserveAll", "GET", "", "");
    if (response.result === 200) {
      const list: any = response.data;
      const tmpList: LightReservation[] = [];
      for (const item of list) {
        let tmpItem: LightReservation = {
          action: item.action === "ON" ? true : false,
          activated: item.activated === "True" ? true : false,
          holiday: item.holiday,
          reiteration: item.reiteration === "True" ? true : false,
          day: item.day,
          name: item.name,
          room: item.room,
          roomKor: item.roomKor,
          time: item.time,
        };
        tmpList.push(tmpItem);
      }
      setReservationList(tmpList);
      setReservationStatus(true);
    } else {
      setReservationList([]);
      setReservationStatus(false);
    }
  };
  useEffect(() => {
    getReserveList();
  }, []);
  return (
    <div>
      <LightReserveModal
        setVisible={addButtonListener}
        visible={modalVisible}
        room={room}
      />

      <Card style={{ borderRadius: "25px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1.5rem",
            paddingBottom: "0rem",
          }}
        >
          <Typography variant="overline" fontSize={24}>
            Light Reservation
          </Typography>
          <div style={{ cursor: "pointer" }} onClick={addButtonListener}>
            <Image
              alt="add button image"
              src={AddIcon}
              width={"80"}
              height={"80"}
            />
          </div>
        </div>
        <Divider
          variant="middle"
          sx={{ backgroundColor: "#000", marginBottom: "2rem" }}
        />
        <div>
          {!reservationStatus && (
            <Container style={{ height: "5rem", width: "100%" }}>
              <Stack
                direction="horizontal"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "5rem",
                    height: "5rem",
                    position: "relative",
                    objectFit: "cover",
                  }}
                >
                  <Image alt="NoData" src={ErrorIcon} fill />
                </div>
                <p style={{ marginTop: "0.7rem", fontSize: "2rem" }}>Error</p>
              </Stack>
            </Container>
          )}
          {reservationList.length == 0 ? (
            <Container style={{ height: "5rem", width: "100%" }}>
              <Stack
                direction="horizontal"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "5rem",
                    height: "5rem",
                    position: "relative",
                    objectFit: "cover",
                  }}
                >
                  <Image alt="NoData" src={NoDataIcon} fill />
                </div>
                <p style={{ marginTop: "0.7rem", fontSize: "2rem" }}>No Data</p>
              </Stack>
            </Container>
          ) : (
            <TableContainer sx={{ padding: "1rem" }}>
              <Table>
                <caption>Displays all reservation data</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Repeat</TableCell>
                    <TableCell>Work On Holiday</TableCell>
                    <TableCell>Worked Within Today</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: reservationList.length }).map(
                    (_, index: number) => (
                      <TableRow>
                        <TableCell>{reservationList[index].name}</TableCell>
                        <TableCell>{reservationList[index].roomKor}</TableCell>
                        <TableCell>{reservationList[index].time}</TableCell>
                        <TableCell>{reservationList[index].day}</TableCell>
                        <TableCell>
                          {reservationList[index].action ? "On" : "Off"}
                        </TableCell>
                        <TableCell>
                          {reservationList[index].reiteration ? (
                            <CheckIcon />
                          ) : (
                            <ClearIcon />
                          )}
                        </TableCell>
                        <TableCell>
                          {reservationList[index].holiday ? (
                            <CheckIcon />
                          ) : (
                            <ClearIcon />
                          )}
                        </TableCell>
                        <TableCell>
                          {reservationList[index].activated ? (
                            <CheckIcon />
                          ) : (
                            <ClearIcon />
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <style jsx>{`
          .content {
            padding: 1px 16px;
          }
        `}</style>
      </Card>
    </div>
  );
}
