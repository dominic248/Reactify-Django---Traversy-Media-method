import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  SvgIcon,
  Icon
} from "@material-ui/core";
import { Link } from "react-router-dom";




const useStyles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    //   for bottom and top drawer only
    width: "auto"
  }
});

class LeftDrawerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    openDrawer: false,
    menu1: [
      {
        name: "Inbox",
        icon: <Icon>inbox</Icon>,
        link: "/inbox"
      },
      {
        name: "Starred",
        icon: <Icon>star</Icon>,
        link: "/"
      },
      {
        name: "Send email",
        icon: <Icon>send</Icon>,
        link: "/"
      },
      {
        name: "Drafts",
        icon: <Icon>drafts</Icon>,
        link: "/"
      }
    ],
    menu2: [
      {
        name: "All mail",
        icon: <Icon>email</Icon>, 
        link: "/inbox"
      },
      {
        name: "Trash",
        icon: <Icon>trash</Icon>, 
        link: "/inbox"
      },
      {
        name: "Spam",
        icon: <Icon>block</Icon>, 
        link: "/inbox"
      },
      {
        name: "Settings",
        icon: <Icon>settings</Icon>, 
        link: "/settings"
      }
    ]
  };
  handleToggle = () => this.setState({ openDrawer: !this.state.openDrawer });
  handleClose = () => this.setState({ openDrawer: false });
  handleOpen = () => this.setState({ openDrawer: true });

  list = classes => (
    <div
      className={classes.list}
      role="presentation"
      onClick={this.handleClose}
      onKeyDown={this.handleClose}
    >
      <List>
        {this.state.menu1.map((text, index) => (
          <ListItem button key={text.name} component={Link} to={text.link}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {this.state.menu2.map((text, index) => (
          <ListItem button key={text.name} component={Link} to={text.link}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <SwipeableDrawer
          open={this.state.openDrawer}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          {this.list(classes)}
        </SwipeableDrawer>
      </div>
    );
  }
}

class RightDrawerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    openDrawer: false,
    menu1: [
      {
        name: "Inbox",
        icon: <Icon>inbox</Icon>
      },
      {
        name: "Starred",
        icon: <Icon>star</Icon>
      },
      {
        name: "Send email",
        icon: <Icon>send</Icon>
      },
      {
        name: "Drafts",
        icon: <Icon>drafts</Icon>
      }
    ],
    menu2: [
      {
        name: "All mail",
        icon: <Icon>email</Icon>
      },
      {
        name: "Trash",
        icon: <Icon>restore_from_trash</Icon>
      },
      {
        name: "Spam",
        icon: <Icon>block</Icon>
      }
    ]
  };
  handleToggle = () => this.setState({ openDrawer: !this.state.openDrawer });
  handleClose = () => this.setState({ openDrawer: false });
  handleOpen = () => this.setState({ openDrawer: true });

  list = classes => (
    <div
      className={classes.list}
      role="presentation"
      onClick={this.handleClose}
      onKeyDown={this.handleClose}
    >
      <List>
        {this.state.menu1.map((text, index) => (
          <ListItem button key={text.name}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {this.state.menu2.map((text, index) => (
          <ListItem button key={text.name}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <SwipeableDrawer
          anchor="right"
          open={this.state.openDrawer}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          {this.list(classes)}
        </SwipeableDrawer>
      </div>
    );
  }
}

class BottomDrawerComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    openDrawer: false,
    menu1: [
      {
        name: "Edit",
        icon: <Icon>edit</Icon>
      },
      {
        name: "Copy",
        icon: (
          <Icon>
            <SvgIcon>
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </SvgIcon>
          </Icon>
        )
      },
      {
        name: "Delete",
        icon: <Icon>delete</Icon>
      }
    ],
    menu2: [
      {
        name: "Share",
        icon: <Icon>share</Icon>
      }
    ]
  };
  handleToggle = () => this.setState({ openDrawer: !this.state.openDrawer });
  handleClose = () => this.setState({ openDrawer: false });
  handleOpen = () => this.setState({ openDrawer: true });

  list = classes => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={this.handleClose}
      onKeyDown={this.handleClose}
    >
      <List>
        {this.state.menu1.map((text, index) => (
          <ListItem button key={text.name}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {this.state.menu2.map((text, index) => (
          <ListItem button key={text.name}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.openDrawer}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          {this.list(classes)}
        </SwipeableDrawer>
      </div>
    );
  }
}

const LeftDrawer = withStyles(useStyles)(LeftDrawerComponent);
const RightDrawer = withStyles(useStyles)(RightDrawerComponent);
const BottomDrawer = withStyles(useStyles)(BottomDrawerComponent);

export { LeftDrawer, RightDrawer, BottomDrawer };
