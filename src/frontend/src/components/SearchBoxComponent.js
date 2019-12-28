import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";

const useStyles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    isSearch:false
  },
  grow: {
    flexGrow: 1
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
//   divider: {
//     height: 28,
//     margin: 4,
//   },
});

class SearchBoxComponent extends React.Component {
  handleSearchClose= () => {
    this.props.handleSearchClose();
  };
render(){
    const { classes } = this.props;

  return (
    <div className={classes.grow}>
          <AppBar position="static" style={{background :"white"}}>
            <Toolbar>
      <IconButton edge="start" className={classes.iconButton} aria-label="menu" onClick={this.handleSearchClose}>
      <Icon>arrow_back</Icon>
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search something' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Toolbar>
          </AppBar>
         
        </div>
  )
};
}


export default withStyles(useStyles)(SearchBoxComponent);