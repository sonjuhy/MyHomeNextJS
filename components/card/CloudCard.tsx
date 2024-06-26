import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Card from "react-bootstrap/Card";

import FileIcon from "/public/image/icon/file.png";
import FolderIcon from "/public/image/icon/folder.png";
import VideoIcon from "/public/image/icon/video.png";
import ImageIcon from "/public/image/icon/image.png";
import UpIcon from "/public/image/icon/up.png";
import ErrorIcon from "/public/image/icon/error.png";

import Loading from "@/components/loading/CloudCardLoading";

import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

type props = {
  uuid: string;
  name: string;
  type: string;
  path: string;
  mode: string;
};
type loaderProps = {
  src?: string;
};
export default function CloudCard({
  uuid,
  name,
  type,
  path,
  mode,
}: props): JSX.Element {
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const [loading, setLoading] = useState(false);

  const imageLoader = ({ src }: loaderProps) => {
    if (mode === "public")
      return "/file/downloadPublicImageLowQuality/" + src + "/" + accessToken;
    else return "/file/downloadPrivateMedia/" + src + "/" + accessToken;
  };

  const thumbNailLoader = ({ src }: loaderProps) => {
    return "/file/downloadThumbNail/" + src + "/" + accessToken;
  };

  const loadingEnd = () => {
    setLoading(true);
  };

  return (
    <Card className="shadow" style={{ height: "13rem", cursor: "pointer" }}>
      <br />
      <Card.Title className="text-center" style={{ width: "90%" }}>
        <Stack
          direction="horizontal"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src={
              type === "img"
                ? ImageIcon
                : type === "video"
                ? VideoIcon
                : FileIcon
            }
            sizes="(min-width: 480px) 10rem, 10rem"
            alt="type image"
            width={0}
            height={0}
            style={{ width: "2rem", height: "2rem" }}
          />
          <p
            style={{
              margin: "0",
              width: "90%",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </p>
        </Stack>
      </Card.Title>
      <Card.Body>
        {type === "img" && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <OverlayTrigger
              key={uuid}
              placement={"top"}
              overlay={<Tooltip id={`tooltip-${name}`}>{name}</Tooltip>}
            >
              <div>
                <div
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Image
                    loader={imageLoader}
                    src={uuid}
                    alt="cloud image"
                    sizes="(min-width: 480px) 10rem, 10rem"
                    width={0}
                    height={0}
                    style={{ width: "8rem", height: "8rem" }}
                    loading="eager"
                    onLoadingComplete={loadingEnd}
                    onError={(
                      event: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      const target = event.target as HTMLImageElement;
                      target.src = "/public/image/icon/error.png";
                    }}
                  />
                </div>

                {!loading && (
                  <div
                    style={{
                      position: "absolute",
                      opacity: "1",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Loading />
                  </div>
                )}
              </div>
            </OverlayTrigger>
          </div>
        )}
        {type === "video" && (
          <div
            style={{
              width: "100%",
              height: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <OverlayTrigger
              key={uuid}
              placement={"top"}
              overlay={<Tooltip id={`tooltip-${name}`}>{name}</Tooltip>}
            >
              <Image
                loader={thumbNailLoader}
                src={uuid}
                alt="cloud image"
                sizes="(min-width: 480px) 10rem, 10rem"
                width={0}
                height={0}
                style={{ width: "8rem", height: "8rem" }}
                loading="lazy"
              />
            </OverlayTrigger>
          </div>
        )}
        {(type === "file" || type === "dir" || type === "up") && (
          <div
            style={{
              width: "100%",
              height: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <OverlayTrigger
              key={uuid}
              placement={"top"}
              overlay={<Tooltip id={`tooltip-${name}`}>{name}</Tooltip>}
            >
              <Image
                alt="Light"
                src={type === "dir" ? FolderIcon : FileIcon}
                sizes="(min-width: 480px) 10rem, 10rem"
                loading="eager"
                width={0}
                height={0}
                style={{ width: "10rem", height: "10rem" }}
                priority={true}
              />
            </OverlayTrigger>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
