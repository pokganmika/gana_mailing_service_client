import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Home from "@material-ui/icons/Home";
import Edit from "@material-ui/icons/Edit";
import MailIcon from "@material-ui/icons/Mail";
import AccountBox from "@material-ui/icons/AccountBox";
import CheckBox from "@material-ui/icons/CheckBox";
import WatchLater from "@material-ui/icons/WatchLater";

import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MainRoute from "./Route";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor: "#006600",
    backgroundColor: "white",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    user: [],
    mail: [],
  });

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div
      className={classes.root}
      style={{ width: "100%", height: "95%", marginTop: "50px" }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            color="primary"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <TopBarInnerWrapper>
            <Link to="/">
              <Typography variant="h6" noWrap style={{ color: "black" }}>
                Gana Mail
              </Typography>
            </Link>
            {/* <Button variant="outlined" color="secondary">
              Logout
            </Button> */}
            <div style={{ display: "flex" }}>
              <Typography
                noWrap
                style={{
                  color: "black",
                  marginRight: "1em",
                  paddingTop: "0.3em",
                  // border: "1px solid red",
                }}
              >
                admin
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  localStorage.removeItem("userVerified");
                  props.authCheck();
                }}
              >
                Logout
              </Button>
            </div>
          </TopBarInnerWrapper>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          <Link to="/">
            <ListItem button key={"Home"}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>

              <ListItemText style={{ color: "black" }} primary={"Home"} />
            </ListItem>
          </Link>

          <Link to="/activitylog">
            <ListItem button key={"Activity Log"}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>

              <ListItemText
                style={{ color: "black" }}
                primary={"Activity Log"}
              />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <List>
          <Link to="/sendmail">
            <ListItem button key={"Send Mail"}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>

              <ListItemText style={{ color: "black" }} primary={"Send Mail"} />
            </ListItem>
          </Link>

          <Link to="/sendlater">
            <ListItem button key={"Send Later"}>
              <ListItemIcon>
                <WatchLater />
              </ListItemIcon>

              <ListItemText style={{ color: "black" }} primary={"Send Later"} />
            </ListItem>
          </Link>

          <Link to="/testmail">
            <ListItem button key={"Test Mail"}>
              <ListItemIcon>
                <CheckBox />
              </ListItemIcon>

              <ListItemText style={{ color: "black" }} primary={"Test Mail"} />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <List>
          <Link to="/usersetting">
            <ListItem button key={"Subscriber Setting"}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>

              {/*TODO: style change ? */}
              <ListItemText
                style={{ color: "black" }}
                primary={"Subscriber Setting"}
              />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <LayoutWrapper>
          <MainRoute />
        </LayoutWrapper>
      </main>
    </div>
  );
}

const TopBarInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1em;
  display: flex;
  justify-content: center;
`;
