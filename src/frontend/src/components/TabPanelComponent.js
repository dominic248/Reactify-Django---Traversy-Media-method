import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class TabPanelComponent extends React.Component {
  render(){
    return (
        <div>
        <TabPanel value={this.props.tabPanelValue} index={0}>
            Page One
        </TabPanel>
        <TabPanel value={this.props.tabPanelValue} index={1}>
            Page Two
        </TabPanel>
        <TabPanel value={this.props.tabPanelValue} index={2}>
            Page Three
        </TabPanel>
        </div>
    )
  };
}

export default TabPanelComponent;