import React from "react";
import { LeftDrawer, RightDrawer, BottomDrawer } from "./DrawerComponents";
import { fade, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Fab,

} from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import AppbarTabsComponent from './AppbarTabsComponent';
import SearchBoxComponent from './SearchBoxComponent';
import { Redirect } from 'react-router';


const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "block"
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class AppbarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    isNotSearch:true
  };

  

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
    // this.openBottomDrawer();
  };

  openLeftDrawer = () => {
    console.log("hell");
    this.refs.leftDrawer.handleOpen();
  };
  openRightDrawer = () => {
    console.log("hell");
    this.refs.rightDrawer.handleOpen();
  };
  openBottomDrawer = () => {
    console.log("hell");
    this.refs.bottomDrawer.handleOpen();
  };

  handleSearchOpen = () => {
    console.log("search");
    this.setState({ isNotSearch:false });
  };
  handleSearchClose= () => {
    console.log("search close");
    this.setState({ isNotSearch:true });
  };
  render() {
    const { classes } = this.props;

    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
        {/* onClick={this.handleProfileMenuOpen}> */}
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    
    return (

      <>
      <Collapse in={this.state.isNotSearch} {...(this.state.isNotSearch ? { timeout: 500 } : { timeout: 500 })}>
        <div className={classes.grow}>
        
          <AppBar position="static">
            <Toolbar>

              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={this.openLeftDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Material-UI
              </Typography>
              <div className={classes.grow} />
              <IconButton color="inherit" onClick={this.handleSearchOpen} >
              <SearchIcon />
              </IconButton>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen} //mobile + bottom drawer
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>

          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
        <LeftDrawer ref="leftDrawer" />
        <RightDrawer ref="rightDrawer" />
        <BottomDrawer ref="bottomDrawer" />
        <AppbarTabsComponent loginState={this.props.isAuthenticated} />
        </Collapse>
        {/* <button onClick={this.openRightDrawer}>Click right</button> */}
        <Collapse in={!this.state.isNotSearch} {...(!this.state.isNotSearch ? { timeout: 500 } : { timeout: 0 })}>
          <SearchBoxComponent handleSearchClose={this.handleSearchClose} />
        </Collapse>
      </>
    );
    
  }
}

export default withStyles(useStyles)(AppbarComponent);
