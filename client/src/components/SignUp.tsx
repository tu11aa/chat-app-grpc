import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typopgraphy from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { IconButton, Tooltip } from "@material-ui/core";
import ImageGalleryDialog from "./ImageGallery";

const style: { [key: string]: React.CSSProperties } = {
  paper: {
    width: "30%",
    backgroundColor: "blueviolet",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  input: {
    marginTop: "50px",
    width: "50%",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    margin: "2rem 0rem",
  },
};

interface Props {
  onUserSubmit: (name: string, password: string, avatar: string) => void;
}

const Greeting: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const { onUserSubmit } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username && !password && !img) return;
    onUserSubmit(username, password, img);
  };

  const handleImageSelect = (imgURL: string) => {
    if (!imgURL) return;
    setImage(imgURL);
    setOpen(false);
  };

  return (
    <>
      <Paper style={style.paper}>
        <form onSubmit={handleSubmit} style={style.form}>
          <Typopgraphy variant="h5">
            If you do not have an account, just sign up here
          </Typopgraphy>
          <IconButton
            style={style.avatar}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Tooltip title="Add Image">
              <Avatar src={img} style={style.avatar} sizes="large" />
            </Tooltip>
          </IconButton>
          <TextField
            style={style.input}
            placeholder="Enter Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
          <TextField
            style={style.input}
            type="password"
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
          <button type="submit" style={{marginTop:'20px'}}>Submit</button>
        </form>
      </Paper>
      <ImageGalleryDialog isOpen={open} onImageSelect={handleImageSelect} />
    </>
  );
};

export default Greeting;
