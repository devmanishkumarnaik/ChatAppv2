import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "pdf":
      return (
        <iframe
          src={url}
          width="100%"
          height="290px"
          style={{
            border: "none",
          }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FileOpenIcon />
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "5px 10px",
              backgroundColor: "black",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Download
          </a>
        </div>
      );
  }
};

export default RenderAttachment;
