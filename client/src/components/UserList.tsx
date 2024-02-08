import React from "react";
import Card from "@material-ui/core/Card";
import { Avatar, Typography, Chip, Grid } from "@material-ui/core";
import { Session } from "../App";

interface IUser {
  id: number;
  username: string;
  isOnline: boolean;
  avatar: string;
}
interface Props {
  user: Session;
  users: Array<IUser>;
}

const style: { [key: string]: React.CSSProperties } = {
  card: {
    height: "80px",
    width: "100%",
    backgroundColor: "aliceblue",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    margin: "20px",
  },
};

const UserList: React.FC<Props> = (props) => {
  const { user, users } = props;

  return (
    <>
      {users.map((u) => 
        u.username !== user.username ? (
        <Card style={style.card} key={u.id}>
          <Avatar style={style.avatar} src={u.avatar} />
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="body1">{u.username}</Typography>
            <Chip
              color={u.isOnline ? "primary" : "default"}
              size="small"
              style={{ width: "70px" }}
              label={u.isOnline ? "online" : "offline"}
            />
          </Grid>
        </Card>
        ):<></>
      )}
    </>
  );
};

export default UserList;
