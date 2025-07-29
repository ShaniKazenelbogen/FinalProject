import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { createPageUrl } from "@/utils";
// import { User } from "@/entities/User";
// TODO: Replace with correct relative imports if these files exist, e.g.:
import { createPageUrl } from '../utils';
import { User } from '../entities/User';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const drawerWidth = 240;

const navIcons = {
  therapist: {
    Dashboard: <HomeIcon />,
    "My Clients": <GroupIcon />,
    Appointments: <CalendarMonthIcon />,
    Schedule: <ScheduleIcon />,
    About: <FavoriteIcon />
  },
  client: {
    Dashboard: <HomeIcon />,
    "My Sessions": <CalendarMonthIcon />,
    "Book Session": <AddIcon />,
    "Payment Status": <CreditCardIcon />,
    About: <FavoriteIcon />
  },
  manager: {
    Dashboard: <HomeIcon />,
    "Manage Staff": <HowToRegIcon />,
    "All Appointments": <CalendarMonthIcon />,
    Settings: <SettingsIcon />,
    About: <FavoriteIcon />
  }
};

const getRoleColor = (role) => {
  switch (role) {
    case 'therapist': return {bg: "#bbdefb", fg: "#1565c0"};
    case 'client': return {bg: "#c8e6c9", fg: "#388e3c"};
    case 'manager': return {bg: "#e1bee7", fg: "#6a1b9a"};
    default: return {bg: "#ececec", fg: "#616161"};
  }
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      if (location.pathname !== createPageUrl("SignIn") && location.pathname !== createPageUrl("About")) {
        navigate(createPageUrl("SignIn"));
      }
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      navigate(createPageUrl("SignIn"));
    } catch (error) {
      window.location.href = createPageUrl("SignIn");
    }
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (!user) return [];
    const commonItems = [
      { title: "About", url: createPageUrl("About"), icon: navIcons[user.role]?.About || <FavoriteIcon /> }
    ];
    switch (user.role) {
      case 'therapist':
        return [
          { title: "Dashboard", url: createPageUrl("TherapistDashboard"), icon: <HomeIcon /> },
          { title: "My Clients", url: createPageUrl("ClientList"), icon: <GroupIcon /> },
          { title: "Appointments", url: createPageUrl("AppointmentCalendar"), icon: <CalendarMonthIcon /> },
          { title: "Schedule", url: createPageUrl("TherapistSchedule"), icon: <ScheduleIcon /> },
          ...commonItems
        ];
      case 'client':
        return [
          { title: "Dashboard", url: createPageUrl("ClientDashboard"), icon: <HomeIcon /> },
          { title: "My Sessions", url: createPageUrl("MySessions"), icon: <CalendarMonthIcon /> },
          { title: "Book Session", url: createPageUrl("BookSession"), icon: <AddIcon /> },
          { title: "Payment Status", url: createPageUrl("PaymentStatus"), icon: <CreditCardIcon /> },
          ...commonItems
        ];
      case 'manager':
        return [
          { title: "Dashboard", url: createPageUrl("ManagerDashboard"), icon: <HomeIcon /> },
          { title: "Manage Staff", url: createPageUrl("ManageStaff"), icon: <HowToRegIcon /> },
          { title: "All Appointments", url: createPageUrl("AllAppointments"), icon: <CalendarMonthIcon /> },
          { title: "Settings", url: createPageUrl("Settings"), icon: <SettingsIcon /> },
          ...commonItems
        ];
      default:
        return commonItems;
    }
  };

  // Public pages that don't need authentication
  const publicPages = ['SignIn', 'About'];
  const isPublicPage = publicPages.includes(currentPageName);

  if (isLoading) {
    return (
      <Box minHeight="100vh" display="flex" bgcolor="linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)" alignItems="center" justifyContent="center">
        <CircularProgress color="secondary" />
        <Typography ml={2}>Loading application...</Typography>
      </Box>
    );
  }

  if (!user && !isPublicPage) {
    return (
      <Box minHeight="100vh" display="flex" bgcolor="linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)" alignItems="center" justifyContent="center">
        <Box textAlign="center">
          <Avatar sx={{ bgcolor: "#f06292", width: 64, height: 64, mb: 2 }}>
            <FavoriteIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
            You're in the Center
          </Typography>
          <Typography color="text.secondary" mb={3}>Please sign in to continue</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate(createPageUrl("SignIn"))}>
            Go to Sign In
          </Button>
        </Box>
      </Box>
    );
  }

  if (isPublicPage) {
    return (
      <Box minHeight="100vh" bgcolor="linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)">
        {children}
      </Box>
    );
  }

  // Main layout for authenticated users
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: "linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: "#fff8fd" },
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "#f06292", width: 48, height: 48 }}>
              <FavoriteIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography fontWeight="bold" color="text.primary" fontSize={18}>You're in the Center</Typography>
              <Typography color="secondary" fontSize={13}>Therapy Services</Typography>
            </Box>
          </Box>
        </Toolbar>
        <Divider />
        <List>
          {getNavigationItems().map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={Link}
                to={item.url}
                selected={location.pathname === item.url}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor: location.pathname === item.url ? "#ede7f6" : "",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
        <Box p={2}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar sx={{ bgcolor: getRoleColor(user?.role).bg }}>
              <Typography color={getRoleColor(user?.role).fg} fontWeight="bold">
                {user?.full_name?.charAt(0) || user?.first_name?.charAt(0) || 'U'}
              </Typography>
            </Avatar>
            <Box>
              <Typography fontWeight="bold" color="text.primary" fontSize={15}>
                {user?.full_name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'User'}
              </Typography>
              <Chip
                label={user?.role || 'user'}
                sx={{
                  bgcolor: getRoleColor(user?.role).bg,
                  color: getRoleColor(user?.role).fg,
                  height: 22,
                  fontSize: 12,
                  fontWeight: 'bold',
                  mt: 0.5
                }}
                size="small"
              />
            </Box>
          </Box>
          <Button
            variant="text"
            color="error"
            startIcon={<LogoutIcon />}
            fullWidth
            onClick={handleLogout}
            sx={{ justifyContent: "flex-start", fontWeight: "bold" }}
          >
            Sign Out
          </Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: "1px solid #ede7f6", bgcolor: "#fff8fd" }}>
          <Toolbar>
            <FavoriteIcon sx={{ color: "#f06292", mr: 1 }} />
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              You're in the Center
            </Typography>
          </Toolbar>
        </AppBar>
        <Box p={{ xs: 2, md: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}