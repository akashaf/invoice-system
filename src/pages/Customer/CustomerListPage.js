
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import customInstance from '../../axios.config';

const CustomerListPage = (props) => {
  const [customerList, setCustomerList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    querycustomerList();
  }, [])

  const querycustomerList = () => {
    customInstance.get('/customer')
      .then(res => setCustomerList(res.data))
      .catch(err => console.log(err))
  }
  const list = () => {
    const modifiedCustomerList = [];
    customerList.forEach(customer => {
      const tempData = {
        'custid': customer.custid,
        'custname': customer.custname,
        'address': customer.mailingaddr1 + ', ' + customer.mailingaddr2 + ', ' + customer.mailingaddr3 + ', ' + customer.mailingpostcode,
        'isactive': customer.isactive,
        'createdBy': customer.createdusername,
        'createdDate': moment(customer.createddate).format('DD/MM/YYYY'),
        'modifiedBy': customer.modifiedusername,
        'modifiedDate': moment(customer.modifydate).format('DD/MM/YYYY')
      }
      modifiedCustomerList.push(tempData);
    });
    return (
      <Table>
        <TableHead>
          {
            modifiedCustomerList.slice(0, 1).map(modifiedCustomerKey => (
              <TableRow key="0">
                {
                  Object.keys(modifiedCustomerKey).map((modifiedCustomer, key) => (
                    <TableCell key={key}>
                      <Typography>
                        {modifiedCustomer}
                      </Typography>
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableHead>
        <TableBody>
          {
            modifiedCustomerList.map((modifiedCustomer, key) => (
              <TableRow key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/customer-detail/${modifiedCustomer.custid}`)}>
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
                    {modifiedCustomer.isactive}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.createdBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.createdDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.modifiedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedCustomer.modifiedDate}
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
      <TableContainer>
        {list()}
      </TableContainer>
    </Box>
  );
}

export default CustomerListPage;
