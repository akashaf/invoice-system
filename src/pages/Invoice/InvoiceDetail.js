import { useEffect, useState } from "react";
import { Save, RotateLeft, Delete } from '@material-ui/icons';
import axiosApi from '../../axios.config';
import { Box, withStyles, Typography, Grid, TextField, Button, MenuItem, Paper } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import styles from "../Customer/styles";
import AddInvoiceItem from "./Item/AddInvoiceItem";

const InvoiceDetail = (props) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [customerDetailData, setCustomerDetailData] = useState(null);
    const [stateDetailData, setStateDetailData] = useState(null);
    const [districtDetailData, setDistrictDetailData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        queryInvoiceDetail();
        axiosApi.get('/customer')
            .then(customer => {
                setCustomerData(customer.data);
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [setInvoiceData])

    const queryInvoiceDetail = () => {
        axiosApi.get(`/invoice/${props.match.params.id}`)
            .then(res => {
                setInvoiceData(res.data);
                axiosApi.get(`/customer/${res.data.custid}`)
                    .then(customer => {
                        setCustomerDetailData(customer.data);
                        axiosApi.get(`/state/${customer.data.mailingstate}`)
                            .then(state => {
                                setStateDetailData(state.data);
                                axiosApi.get(`/district/${customer.data.mailingdistrict}`)
                                    .then(district => {
                                        setDistrictDetailData(district.data);
                                    })
                                    .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleCustomerData = evt => {
        setInvoiceData({ ...invoiceData, [evt.target.name]: evt.target.value })
        axiosApi.get(`/customer/${evt.target.value}`)
            .then(customer => {
                setCustomerDetailData(customer.data)
                axiosApi.get(`/state/${customer.data.mailingstate}`)
                    .then(customerDetail => {
                        setStateDetailData(customerDetail.data);
                        axiosApi.get(`/district/${customer.data.mailingdistrict}`)
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
        axiosApi.put('/invoice', invoiceData)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        setInvoiceData({ ...invoiceData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setInvoiceData({ ...invoiceData, [evt.target.name]: newValue })
    }

    const deleteInvoice = () => {
        axiosApi.delete(`/invoice/${props.match.params.id}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            {
                invoiceData && customerDetailData && stateDetailData && districtDetailData &&
                <Box>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h3" gutterBottom>Invoice</Typography>
                        <Paper className={classes.detailForm} style={{ marginBottom: '1rem' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Box>
                                        <Typography gutterBottom><b>BILL TO:</b></Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            name="custid"
                                            defaultValue={invoiceData.custid || ''}
                                            onChange={handleCustomerData}
                                        >
                                            {customerData.map((customer) => (
                                                <MenuItem key={customer.custid} value={customer.custid}>
                                                    {customer.custname}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Typography>{customerDetailData.mailingaddr1},</Typography>
                                        <Typography>{customerDetailData.mailingaddr2},</Typography>
                                        <Typography>{customerDetailData.mailingpostcode}, {districtDetailData.districtname},</Typography>
                                        <Typography>{stateDetailData.statename}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box>
                                        <Box>
                                            <TextField fullWidth defaultValue={invoiceData.invono} disabled variant="filled" name="invono" label="Invoice No" />
                                        </Box>
                                        <Box>
                                            <TextField fullWidth defaultValue={invoiceData.lotno} onChange={handleInput} name="lotno" label="Lot No" />
                                        </Box>
                                        <Box>
                                            <TextField fullWidth defaultValue={invoiceData.buildup} onChange={handleIntInput} name="buildup" label="Build up" />
                                        </Box>
                                        <Box>
                                            <TextField fullWidth
                                                size="small"
                                                name="duedate"
                                                label="Due Date"
                                                type="date"
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
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            startIcon={<Delete />}
                                            onClick={deleteInvoice}
                                        >
                                            <Typography>
                                                Delete
                                        </Typography>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                    <AddInvoiceItem id={invoiceData.invono} />
                </Box>
            }
        </Box>
    )
}

export default withStyles(styles)(InvoiceDetail);