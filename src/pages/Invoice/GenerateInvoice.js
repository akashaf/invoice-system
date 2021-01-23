import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import customInstance from "../../axios.config";
import styles from "../Customer/styles";
import moment from 'moment';
import { useHistory } from "react-router-dom";
import Print from '@material-ui/icons/Print';
import Create from '@material-ui/icons/Create';
import SectionHeader from "../General/SectionHeader";

const GenerateInvoice = (props) => {
    const [invoiceItemDetailData, setInvoiceItemDetailData] = useState(null)
    const [customerDetailData, setCustomerDetailData] = useState({})
    const [stateDetailData, setStateDetailData] = useState({})
    const [districtDetailData, setDistrictDetail] = useState({})
    const { classes } = props;
    const history = useHistory();

    useEffect(() => {
        queryInvoiceItem();
        //eslint-disable-next-line
    }, [])

    const queryInvoiceItem = () => {
        customInstance.get(`/invoice/items/${props.match.params.id}`)
            .then(invoiceItem => {
                setInvoiceItemDetailData(invoiceItem.data);
                customInstance.get(`/customer/${invoiceItem.data.custid}`)
                    .then(customerDetail => {
                        setCustomerDetailData(customerDetail.data);
                        customInstance.get(`/state/${customerDetail.data.mailingstate}`)
                            .then(stateDetail => {
                                setStateDetailData(stateDetail.data);
                                customInstance.get(`/district/${customerDetail.data.mailingdistrict}`)
                                    .then(districtDetail => {
                                        setDistrictDetail(districtDetail.data);
                                    })
                            })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const totalItem = () => {
        let total = 0;
        if (invoiceItemDetailData && invoiceItemDetailData.items.length > 0) {
            invoiceItemDetailData.items.forEach(item => {
                total += item.amountrm;
            });
        }
        return total;
    }

    const tableHeaders = [
        'id',
        'Description',
        'Amount(RM)',
        'Due Date',
        'Created by',
        'Modified by',
        'Created Date',
        'Modified Date'
    ];

    return (
        <Paper style={{ padding: '1rem' }}>
            {
                invoiceItemDetailData &&
                <Box>
                    <Box displayPrint="block">
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom><b>BILL TO:</b></Typography>
                                    <Typography>
                                        <b style={{ textTransform: 'uppercase' }}>
                                            {customerDetailData.custname}
                                        </b>
                                    </Typography>
                                    <Typography>{customerDetailData.mailingaddr1},</Typography>
                                    <Typography>{customerDetailData.mailingaddr2},</Typography>
                                    <Typography>{customerDetailData.mailingaddr3},</Typography>
                                    <Typography>{customerDetailData.mailingpostcode} {districtDetailData.districtname},</Typography>
                                    <Typography gutterBottom>{stateDetailData.statename}</Typography>
                                </Grid>
                                <Grid item xs>
                                    <Box style={{ textAlign: 'right' }}>
                                        <Typography><b>Invoice No.</b></Typography>
                                        <Typography gutterBottom>{invoiceItemDetailData.invono}</Typography>
                                        <Typography><b>Invoice Date</b></Typography>
                                        <Typography gutterBottom>{moment(invoiceItemDetailData.invodate).format('DD/MM/YYYY')}</Typography>
                                        <Typography><b>Lot No</b></Typography>
                                        <Typography gutterBottom>{invoiceItemDetailData.lotno ? invoiceItemDetailData.lotno : '-'}</Typography>
                                        <Typography><b>Build up</b></Typography>
                                        <Typography gutterBottom>{invoiceItemDetailData.buildup ? invoiceItemDetailData.buildup : '-'}</Typography>
                                        <Box style={{
                                            backgroundColor: 'green',
                                            width: '10rem',
                                            float: 'right',
                                            padding: '.5rem',
                                            color: 'white',
                                            textAlign: 'center'
                                        }}>
                                            <Box style={{ marginBottom: '.5rem' }}>
                                                <Typography variant="h5">Total Amount</Typography>
                                            </Box>
                                            <Box style={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                padding: '.5rem 0'
                                            }}>
                                                <Typography variant="h5">RM {totalItem()}</Typography>
                                            </Box>
                                        </Box>
                                        {/* <Typography variant="h4" color="secondary" style={{ textTransform: 'uppercase' }}>Total: {totalItem()}</Typography> */}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <SectionHeader data="Items Description" />
                        </Box>
                        <Box>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead className={classes.tableHeader}>
                                        <TableRow>
                                            {
                                                tableHeaders.map(tableHeader => (
                                                    <TableCell key={tableHeader} className={classes.tableHeaderTypography}>
                                                        <Typography>{tableHeader}</Typography>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            !invoiceItemDetailData.items &&
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <Typography style={{ textAlign: 'center' }}>No Item</Typography>
                                                </TableCell>
                                            </TableRow>
                                        }
                                        {
                                            invoiceItemDetailData.items && invoiceItemDetailData.items.map(item => (
                                                <TableRow key={item.invoseq}>
                                                    <TableCell>
                                                        <Typography>{item.invoseq}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{item.itemdesc}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{item.amountrm}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{moment(item.duedate).format('DD/MM/YYYY')}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{item.createdusername}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{moment(item.createddate).format('DD/MM/YYYY')}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{item.modifiedusername}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{moment(item.modifydate).format('DD/MM/YYYY')}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box style={{ minHeight: '9rem' }} />
                            <Grid style={{ marginTop: '1rem' }} container>
                                <Grid item xs>
                                    <Typography>Prepared by</Typography>
                                    <Box style={{ minHeight: '2rem' }} />
                                    <Typography>...................</Typography>
                                </Grid>
                                <Grid item xs>
                                    <Box style={{ textAlign: 'right' }}>

                                        <Typography>Approved by</Typography>
                                        <Box style={{ minHeight: '2rem' }} />
                                        <Typography>...................</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box displayPrint="none" style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginRight: '1rem' }}
                            startIcon={<Create />}
                            onClick={() => history.push(`/invoice-detail/${props.match.params.id}`)}
                        >
                            <Typography>
                                Update
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<Print />}
                            onClick={() => window.print()}
                        >
                            <Typography>
                                Print
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            }
        </Paper>
    )
}

export default withStyles(styles)(GenerateInvoice);