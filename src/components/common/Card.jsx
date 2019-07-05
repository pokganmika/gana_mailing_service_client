import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 100,
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

export default function SimpleCard({ title, data, per }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      style={{ borderRadius: "15px", backgroundColor: "white", margin: "1em" }}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          {title}
        </Typography>
        {!per ? (
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {data}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {Math.floor(per * 100) === per * 100
              ? `${data} (${per * 100}%)`
              : `${data} (${(per * 100).toFixed(2)}%)`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
