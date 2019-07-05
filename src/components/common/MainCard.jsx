import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ subs, total }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      style={{ borderRadius: "15px", backgroundColor: "white" }}
    >
      <CardContent>
        <Typography
          variant="h3"
          component="h2"
          style={{ margin: "0.5em 0 0.2em 0.5em" }}
        >
          {`${subs} / ${total}`}
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ margin: "0 0 0 1em" }}
        >
          {`( Subscriber / Total )`}
        </Typography>
      </CardContent>
    </Card>
  );
}
