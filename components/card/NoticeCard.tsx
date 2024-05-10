import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAppDispatch } from "@/lib/redux/hooks";
import { changePage } from "@/lib/redux/features/pageType/pageSlice";

type NoticeCard = { mode: string };
function WithHeaderAndQuoteExample({ mode }: NoticeCard) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("Notice Title");
  const [content, setContent] = useState(
    "This is a space that displays what you have written as a notice."
  );
  const [writer, setWriter] = useState("writer");

  async function getLastNotice() {
    const response = await sendToSpring("/notice/getTopNotice", "GET", "", "");
    var notice: any = response.data;
    setTitle(notice.title);
    setContent(notice.content);
    setWriter(notice.writer);
  }
  useEffect(() => {
    getLastNotice();
  });
  return (
    <>
      {mode === "home" ? (
        <Grid container direction={"row"} spacing={3}>
          <Grid item xs={8} sm={8} md={10} lg={10}>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Card
                style={{
                  borderRadius: "25px",
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
                }}
              >
                {/* <Card.Header>{title}</Card.Header> */}
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{content}</Card.Text>
                  <Card.Text style={{ textAlign: "end" }}>{writer}</Card.Text>
                  {/* <blockquote className="blockquote mb-0">
                    <p>{title}</p>
                    <p> {content}</p>
                    <footer className="blockquote-footer text-end">
                      {writer}
                    </footer>
                  </blockquote> */}
                </Card.Body>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={2}>
            <Button
              variant="contained"
              color="info"
              style={{
                width: "80%",
                height: "100%",
                borderRadius: "25px",
                boxShadow:
                  "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
              }}
              onClick={() => {
                dispatch(changePage("notice"));
              }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      ) : mode === "notice" ? (
        <Card
          style={{
            borderRadius: "25px",
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
          }}
        >
          {/* <Card.Header>{title}</Card.Header> */}
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{content}</Card.Text>
            <Card.Text style={{ textAlign: "end" }}>{writer}</Card.Text>
            {/* <blockquote className="blockquote mb-0">
              <p>{title}</p>
              <p> {content}</p>
              <footer className="blockquote-footer text-end">{writer}</footer>
            </blockquote> */}
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}

export default WithHeaderAndQuoteExample;
