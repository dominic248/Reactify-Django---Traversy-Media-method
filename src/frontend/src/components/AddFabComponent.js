import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Icon
} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = theme => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
  });

class AddFabComponent extends React.Component {
    state={
        open:false,
        hidden:false,
        menu:[
            { icon: <FileCopyIcon />, name: 'Copy' },
            { icon: <SaveIcon />, name: 'Save' },
            { icon: <PrintIcon />, name: 'Print' },
            { icon: <ShareIcon />, name: 'Share' },
            { icon: <FavoriteIcon />, name: 'Like' },
          ]
    }

  handleVisibility = () => {
      this.setState({hidden:!this.state.hidden});
  };

  handleOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open:false});
  };


    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
      <Button onClick={this.handleVisibility}>Toggle Speed Dial</Button>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={this.state.hidden}
        icon={<SpeedDialIcon openIcon={<Icon>close</Icon>} />}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.open}
      >
        {this.state.menu.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={this.handleClose}
          />
        ))}
      </SpeedDial>
    </div>
        )
    };
}
export default withStyles(useStyles)(AddFabComponent);