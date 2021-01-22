import { useEffect, useState } from "react";
import customInstance from '../../axios.config';
import { withStyles, Box, Grid, TextField, Button, FormGroup, FormControlLabel, Switch, Paper, MenuItem } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import styles from './styles';

const CustomerDetail = (props) => {
    const [customerData, setCustomerData] = useState(null);
    const [stateData, setStateData] = useState(null);
    const [districtData, setDistrictData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        queryCustomerDetail();
        customInstance.get('/state')
            .then(res => setStateData(res.data))
            .catch(err => console.log(err))
        customInstance.get('/district')
            .then(res => setDistrictData(res.data))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [setCustomerData])

    const queryCustomerDetail = () => {
        customInstance.get(`/customer/${props.match.params.id}`)
            .then(res => { setCustomerData(res.data); })
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.put('/customer', customerData)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        setCustomerData({ ...customerData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setCustomerData({ ...customerData, [evt.target.name]: newValue })
    }

    const handleCheck = evt => {
        let newValue = evt.target.checked ? 1 : 0;
        setCustomerData({ ...customerData, [evt.target.name]: newValue })
    }

    const deleteCustomer = () => {
        customInstance.delete(`/customer/${props.match.params.id}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/customer');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            {
                customerData &&
                <Paper className={classes.detailForm}>
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md>
                                <TextField
                                    size="small"
                                    autoComplete="custid"
                                    name="custid"
                                    required
                                    fullWidth
                                    id="custid"
                                    label="id"
                                    defaultValue={customerData.custid}
                                    autoFocus
                                    onChange={handleIntInput}
                                />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <TextField
                                    size="small"
                                    autoComplete="custname"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="custname"
                                    label="Name"
                                    defaultValue={customerData.custname}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    size="small"
                                    autoComplete="mailingaddr1"
                                    name="mailingaddr1"
                                    required
                                    fullWidth
                                    id="mailingaddr1"
                                    label="Address 1"
                                    defaultValue={customerData.mailingaddr1}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    size="small"
                                    autoComplete="mailingaddr2"
                                    name="mailingaddr2"
                                    required
                                    fullWidth
                                    id="mailingaddr2"
                                    label="Address 2"
                                    defaultValue={customerData.mailingaddr2}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    size="small"
                                    autoComplete="mailingaddr3"
                                    name="mailingaddr3"
                                    required
                                    fullWidth
                                    id="mailingaddr3"
                                    label="Address 3"
                                    defaultValue={customerData.mailingaddr3}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    size="small"
                                    autoComplete="mailingpostcode"
                                    name="mailingpostcode"
                                    required
                                    fullWidth
                                    id="mailingpostcode"
                                    label="Postcode"
                                    defaultValue={customerData.mailingpostcode}
                                    autoFocus
                                    onChange={handleIntInput}
                                />
                            </Grid>
                            <Grid item xs={12} md>
                                {
                                    console.log(customerData)
                                }
                            {
                                stateData &&
                                <TextField
                                    id="mailingstate"
                                    select
                                    fullWidth
                                    name="mailingstate"
                                    label="State"
                                    defaultValue={customerData.mailingstate || ''}
                                    onChange={handleInput}
                                >
                                    {stateData.map((state) => (
                                        <MenuItem key={state.stateid} value={String(state.stateid)}>
                                            {state.statename}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            }
                        </Grid>
                        <Grid item xs={12} md>
                            {
                                districtData &&
                                <TextField
                                    id="mailingdistrict"
                                    select
                                    fullWidth
                                    name="mailingdistrict"
                                    label="District"
                                    defaultValue={customerData.mailingdistrict || ''}
                                    onChange={handleInput}
                                >
                                    {districtData.map((district) => (
                                        <MenuItem key={district.districtid} value={String(district.districtid)}>
                                            {district.districtname}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            }
                        </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    autoComplete="createdusername"
                                    name="createdusername"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="createdusername"
                                    label="Created by"
                                    defaultValue={customerData.createdusername}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    autoComplete="modifiedusername"
                                    name="modifiedusername"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="modifiedusername"
                                    label="Modified by"
                                    defaultValue={customerData.modifiedusername}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    autoComplete="createddate"
                                    name="createddate"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="createddate"
                                    label="Created Date"
                                    defaultValue={moment(customerData.createddate).format("DD/MM/YYYY")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md>
                                <TextField
                                    size="small"
                                    autoComplete="modifydate"
                                    name="modifydate"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="modifydate"
                                    label="Modify Date"
                                    defaultValue={moment(customerData.modifydate).format("DD/MM/YYYY")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch size="small" checked={customerData.isactive === 1 ? true : false} onChange={handleCheck} name="isactive" id="isactive" />}
                                        label="is active"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box style={{ textAlign: 'center' }}>
                                    <Button style={{ marginRight: '1rem' }} type="submit" variant="contained" color="primary">Send</Button>
                                    <Button style={{ marginRight: '1rem' }} type="reset" variant="contained">Reset</Button>
                                    <Button variant="contained" color="secondary" onClick={deleteCustomer}>Delete</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            }
        </Box>
    )
}

export default withStyles(styles)(CustomerDetail);