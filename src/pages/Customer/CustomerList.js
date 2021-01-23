import { useEffect, useState } from 'react';
import axiosApi from '../../axios.config';
import { Grid, Button, Box, TableContainer, TableCell, Typography, TableHead, TableRow, Table, TableBody, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import styles from './styles'
import SectionHeader from '../General/SectionHeader';
import AddIcon from '@material-ui/icons/Add';

const CustomerList = (props) => {
  const [customerList, setCustomerList] = useState([]);
  const history = useHistory();
  const { classes } = props;

  useEffect(() => {
    queryCustomerList();
    // eslint-disable-next-line
  }, [])

  const queryCustomerList = () => {
    axiosApi.get('/customer')
      .then(res => { setCustomerList(res.data); })
      .catch(err => console.log(err))
  }

  const list = () => {
    const modifiedCustomerList = [];
    customerList.forEach(customer => {
      const tempData = {
        'custid': customer.custid,
        'custname': customer.custname,
        'address': customer.mailingaddr1 + ', ' + customer.mailingaddr2 + ', ' + customer.mailingaddr3 + ', ' + customer.mailingpostcode,
        'mailingstate': customer.mailingstate,
        'mailingdistrict': customer.mailingdistrict,
        'isactive': customer.isactive,
        'createdusername': customer.createdusername,
        'modifiedusername': customer.modifiedusername,
        'createddate': moment(customer.createddate).format('DD/MM/YYYY'),
        'modifydate': moment(customer.modifydate).format('DD/MM/YYYY')
      }
      modifiedCustomerList.push(tempData);
    });

    const tableHeaders = [
      'id',
      'name',
      'address',
      'state',
      'district',
      'is_active',
      'created by',
      'modified by',
      'created date',
      'modified date'
    ]

    return (
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableHeader}>
            {
              tableHeaders.map(tableHeader => (
                <TableCell key={tableHeader}>
                  <Typography className={classes.tableHeaderTypography}>{tableHeader}</Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            modifiedCustomerList.map((modifiedCustomer, key) => (
              <TableRow hover key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/customer-detail/${modifiedCustomer.custid}`)}>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.custid}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.custname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.mailingstate}
                  </Typography>
                </TableCell>
                <TableCell>
                  {modifiedCustomer.mailingdistrict}
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.isactive}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.createdusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.modifiedusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.createddate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.modifydate}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs>
          <SectionHeader data="Customers" />
        </Grid>
        <Grid item xs>
          <Box style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push('/add-customer')}
            >
              <Typography>
                New Customer
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <TableContainer>
        {list()}
      </TableContainer>
    </Box>
  )
}

export default withStyles(styles)(CustomerList);