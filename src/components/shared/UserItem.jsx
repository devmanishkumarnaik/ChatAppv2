import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import {Add as AddIcon, Remove as RemoveIcon} from "@mui/icons-material";
import {transformImage} from "../../lib/features";
import checkpic from "/check.png";

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false, styling = {}}) => {
  const { name, username, _id, avatar} = user;
  const isVerified = ["Manish","Shiva"].includes(user?.username);
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)}/>

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
          {isVerified && (
            <img style={{ height: "14px", marginLeft: "2px" }} src={checkpic} alt="logo" />
          )}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >

          {
            isAdded ? <RemoveIcon /> :  <AddIcon />
          }
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
