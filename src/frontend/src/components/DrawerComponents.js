import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
    openDrawer: false
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Open Left</Button>

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
    openDrawer: false
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Open Left</Button>

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
    openDrawer: false
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Open Left</Button>

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
