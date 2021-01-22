import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InvoiceList from './pages/Invoice/InvoiceList';
import CustomerList from './pages/Customer/CustomerList';
import CustomerDetail from './pages/Customer/CustomerDetail';
import SideNav from './SideNav';
import { Grid } from '@material-ui/core';
import InvoiceDetail from './pages/Invoice/InvoiceDetail';
import AddInvoice from './pages/Invoice/AddInvoice';
import StateList from './pages/General/State/StateList';
import StateDetail from './pages/General/State/StateDetail';
import AddState from './pages/General/State/AddState';
import DistrictList from './pages/General/District/DistrictList';
import DistrictDetail from './pages/General/District/DistrictDetail';
import AddDistrict from './pages/General/District/AddDistrict';
import AddCustomer from './pages/Customer/AddCustomer';
const App = () => {
  return (
      <Router>
        <Grid container>
          <Grid item xs={12} md={2}>
            <SideNav />
          </Grid>
          <Grid item xs={12} md={10}>
            <Switch>
              <Route exact path="/" component={InvoiceList} />
              <Route path="/customer" component={CustomerList} />
              <Route path="/add-customer" component={AddCustomer} />
              <Route path="/customer-detail/:id" component={CustomerDetail} />
              <Route path="/invoice" component={AddInvoice} />
              <Route path="/invoice-detail/:id" component={InvoiceDetail} />
              <Route path="/stateList" component={StateList} />
              <Route path="/state-detail/:id" component={StateDetail} />
              <Route path="/add-state" component={AddState} />
              <Route path="/add-district" component={AddDistrict} />
              <Route path="/districtList" component={DistrictList} />
              <Route path="/district-detail/:id" component={DistrictDetail} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
  );
}

export default App;