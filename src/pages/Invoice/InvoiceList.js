import { useEffect, useState } from 'react';
import customInstance from '../../axios.config';
import { Box, TableContainer, TableCell, Typography, TableHead, TableRow, Table, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const InvoiceList = (props) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    queryInvoiceList();
    // eslint-disable-next-line
  }, [])

  const queryInvoiceList = () => {
    customInstance.get('/invoice')
      .then(res => { setInvoiceList(res.data); })
      .catch(err => console.log(err))
  }

  const list = () => {
    const modifiedInvoiceList = [];
    invoiceList.forEach(invoice => {
      const tempData = {
        'invono': invoice.invono,
        'invodate': moment(invoice.invodate).format('DD/MM/YYYY'),
        'lotno': invoice.lotno,
        'buildup': invoice.buildup,
        'custid': invoice.custid,
        'createdusername': invoice.createdusername,
        'createddate': moment(invoice.createddate).format('DD/MM/YYYY'),
        'modifiedusername': invoice.modifiedusername,
        'modifydate': moment(invoice.modifydate).format('DD/MM/YYYY')
      }
      modifiedInvoiceList.push(tempData);
    });
    return (
      <Table>
        <TableHead>
          {
            modifiedInvoiceList.slice(0, 1).map(modifiedInvoiceKey => (
              <TableRow key="0">
                {
                  Object.keys(modifiedInvoiceKey).map((modifiedInvoice, key) => (
                    <TableCell key={key}>
                      <Typography>
                        {modifiedInvoice}
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
            modifiedInvoiceList.map((modifiedInvoice, key) => (
              <TableRow key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/invoice-detail/${modifiedInvoice.invono}`)}>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.invono}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.invodate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.lotno}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.buildup}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.custid}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.createdusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.createddate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.modifiedusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedInvoice.modifydate}
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
  )
}

export default InvoiceList;