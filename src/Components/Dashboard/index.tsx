import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HistoryIcon from "@mui/icons-material/History";
import LocationIcon from "@mui/icons-material/LocationOn";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

import { Avatar, Card, CardHeader, Grid } from "@mui/material";
import DataTable from "./DataTable";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Dashboard(props: Props) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Schedule Flight", icon: <ScheduleIcon /> },
    { text: "Flight History", icon: <HistoryIcon /> },
    { text: "Geotag Flight", icon: <LocationIcon /> },
  ];
  const navItems2 = [
    { text: "Settings", icon: <SettingsIcon /> },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      action: () => {
        navigate("");
      },
    },
  ];
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navItems.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                {navItem.icon}
              </ListItemIcon>
              <ListItemText primary={navItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {navItems2.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={navItem.action}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                {navItem.icon}
              </ListItemIcon>
              <ListItemText primary={navItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box mb={2}>
          <Typography component="h1" fontSize="2rem">
            Welcome Back!
          </Typography>
          <Typography>
            There has been new flight activity since you last checked.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ background: "lightgrey" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#1976d2" }} aria-label="recipe">
                    <FlightLandIcon />
                  </Avatar>
                }
                title="667"
                subheader="Arriving flights"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ background: "lightgrey" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#1976d2" }} aria-label="recipe">
                    <FlightTakeoffIcon />
                  </Avatar>
                }
                title="317"
                subheader="Departing Flights"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ background: "lightgrey" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#1976d2" }} aria-label="recipe">
                    <AirplanemodeInactiveIcon />
                  </Avatar>
                }
                title="16"
                subheader="Canceled Flights"
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <DataTable />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
