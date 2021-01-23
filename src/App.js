import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InvoiceList from './pages/Invoice/InvoiceList';
import CustomerList from './pages/Customer/CustomerList';
import CustomerDetail from './pages/Customer/CustomerDetail';
import SideNav from './SideNav';
import { Box } from '@material-ui/core';
import InvoiceDetail from './pages/Invoice/InvoiceDetail';
import AddInvoice from './pages/Invoice/AddInvoice';
import StateList from './pages/General/State/StateList';
import StateDetail from './pages/General/State/StateDetail';
import AddState from './pages/General/State/AddState';
import DistrictList from './pages/General/District/DistrictList';
import DistrictDetail from './pages/General/District/DistrictDetail';
import AddDistrict from './pages/General/District/AddDistrict';
import AddCustomer from './pages/Customer/AddCustomer';
import InvoiceItemDetail from './pages/Invoice/Item/InvoiceItemDetail';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import GenerateInvoice from './pages/Invoice/GenerateInvoice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: '1rem',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Box displayPrint="none">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Invoice App
            </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />
            <SideNav />
          </Drawer>
        </Box>
        <Box className={classes.content}>
          <Box displayPrint="none" className={classes.toolbar} />
          <Box displayPrint="block">
            <Switch>
              <Route exact path="/" component={InvoiceList} />
              <Route path="/customer" component={CustomerList} />
              <Route path="/add-customer" component={AddCustomer} />
              <Route path="/customer-detail/:id" component={CustomerDetail} />
              <Route path="/invoice/:id" component={GenerateInvoice} />
              <Route path="/invoice" component={AddInvoice} />
              <Route path="/invoice-detail/:id/invoice-item-detail/:itemID" component={InvoiceItemDetail} />
              <Route path="/invoice-detail/:id" component={InvoiceDetail} />
              <Route path="/stateList" component={StateList} />
              <Route path="/state-detail/:id" component={StateDetail} />
              <Route path="/add-state" component={AddState} />
              <Route path="/add-district" component={AddDistrict} />
              <Route path="/districtList" component={DistrictList} />
              <Route path="/district-detail/:id" component={DistrictDetail} />
            </Switch>
          </Box>
        </Box>
      </div>
    </Router>
  );
}

export default App;