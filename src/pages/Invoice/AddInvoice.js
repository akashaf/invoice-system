import { Box, Grid, TextField, Button, MenuItem, Typography, Paper, withStyles } from '@material-ui/core';
import { Save, RotateLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import customInstance from '../../axios.config';
import moment from 'moment';
import SectionHeader from '../General/SectionHeader';
import styles from '../Customer/styles';

const AddInvoice = (props) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [customerDetailData, setCustomerDetailData] = useState(null);
    const [stateDetailData, setStateDetailData] = useState(null);
    const [districtDetailData, setDistrictDetailData] = useState(null);
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        customInstance.get('/customer')
            .then(res => setCustomerData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setInvoiceData({ ...invoiceData, [evt.target.name]: newValue })
    }

    const handleInput = evt => {
        setInvoiceData({ ...invoiceData, [evt.target.name]: evt.target.value })
    }

    const handleCustomerData = evt => {
        setInvoiceData({ ...invoiceData, [evt.target.name]: evt.target.value })
        customInstance.get(`/customer/${evt.target.value}`)
            .then(customer => {
                setCustomerDetailData(customer.data)
                customInstance.get(`/state/${customer.data.mailingstate}`)
                    .then(customerDetail => {
                        setStateDetailData(customerDetail.data);
                        customInstance.get(`/district/${customer.data.mailingdistrict}`)
                            .then(districtDetail => {
                                setDistrictDetailData(districtDetail.data);
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        invoiceData.invodate = parseInt(moment().format('x'));
        customInstance.post('/invoice', invoiceData)
            .then(invoice => {
                setInvoiceData(invoice.data);
                history.push(`/invoice-detail/${invoice.data.invono}`);
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            <SectionHeader data="New Invoice" />
            {
                customerData &&
                <form onSubmit={handleSubmit}>
                    <Paper className={classes.detailForm} style={{ marginBottom: '1rem' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Box>
                                    <Typography gutterBottom><b>TO</b></Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        name="custid"
                                        onChange={handleCustomerData}
                                    >
                                        {customerData.map((customer) => (
                                            <MenuItem key={customer.custid} value={customer.custid}>
                                                {customer.custname}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {
                                         customerDetailData && stateDetailData && districtDetailData &&
                                         <Box>
                                             <Typography>{customerDetailData.mailingaddr1},</Typography>
                                             <Typography>{customerDetailData.mailingaddr2},</Typography>
                                             <Typography>{customerDetailData.mailingpostcode}, {districtDetailData.districtname},</Typography>
                                             <Typography>{stateDetailData.statename}</Typography>
                                         </Box>
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box>
                                    <Box>
                                        <TextField required fullWidth onChange={handleIntInput} name="invono" label="Invoice No" />
                                    </Box>
                                    <Box>
                                        <TextField fullWidth onChange={handleInput} name="lotno" label="Lot No" />
                                    </Box>
                                    <Box>
                                        <TextField fullWidth onChange={handleIntInput} name="buildup" label="Build up" />
                                    </Box>
                                    <Box>
                                        <TextField fullWidth
                                            size="small"
                                            name="duedate"
                                            label="Due Date"
                                            type="date"
                                            required
                                            defaultValue={moment().format("YYYY-MM-DD")}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={evt => setInvoiceData({ ...invoiceData, [evt.target.name]: parseInt(moment(evt.target.value).format('x')) })}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        type="submit"
                                        startIcon={<Save />}
                                    >
                                        <Typography>
                                            Save
                                            </Typography>
                                    </Button>
                                    <Button
                                        style={{ marginRight: '1rem' }}
                                        variant="contained"
                                        size="small"
                                        startIcon={<RotateLeft />}
                                    >
                                        <Typography>
                                            Reset
                                            </Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            }
        </Box>
    )
}

export default withStyles(styles)(AddInvoice);