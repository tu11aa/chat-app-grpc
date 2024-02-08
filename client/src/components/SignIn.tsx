import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typopgraphy from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
  }
};

interface Props {
  onUserSubmit: (name: string, avatar: string) => void;
}

const SignIn: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { onUserSubmit } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username && !password) return;
    onUserSubmit(username, password);
  };

  return (
    <>
      <Paper style={style.paper}>
        <form onSubmit={handleSubmit} style={style.form}>
          <Typopgraphy variant="h5">
            Please sign in to join chat
          </Typopgraphy>
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
    </>
  );
};

export default SignIn;
