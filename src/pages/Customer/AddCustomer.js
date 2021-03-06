import { Box, Grid, TextField, Button, withStyles, Paper, MenuItem, Typography } from '@material-ui/core';
import { Save, RotateLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import axiosApi from '../../axios.config';
import styles from './styles';
import SectionHeader from '../General/SectionHeader';

const AddCustomer = (props) => {
    const [stateData, setStateData] = useState(null);
    const [districtData, setDistrictData] = useState(null);
    const [customerData, setCustomerData] = useState({});
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        axiosApi.get('/state')
            .then(res => setStateData(res.data))
            .catch(err => console.log(err))
        axiosApi.get('/district')
            .then(res => setDistrictData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setCustomerData({ ...customerData, [evt.target.name]: newValue })
    }

    const handleInput = evt => {
        setCustomerData({ ...customerData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        axiosApi.post('/customer', customerData)
            .then(() => history.push('/customer'))
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            <SectionHeader data="New Customer" />
            <Paper className={classes.detailForm}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md>
                            <TextField
                                autoComplete="custid"
                                name="custid"
                                required
                                fullWidth
                                id="custid"
                                label="id"
                                autoFocus
                                onChange={handleIntInput}
                            />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <TextField
                                autoComplete="custname"
                                name="custname"
                                required
                                fullWidth
                                id="custname"
                                label="Name"
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                autoComplete="mailingaddr1"
                                name="mailingaddr1"
                                required
                                fullWidth
                                id="mailingaddr1"
                                label="Address 1"
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                autoComplete="mailingaddr2"
                                name="mailingaddr2"
                                required
                                fullWidth
                                id="mailingaddr2"
                                label="Address 2"
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                autoComplete="mailingaddr3"
                                name="mailingaddr3"
                                required
                                fullWidth
                                id="mailingaddr3"
                                label="Address 3"
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            <TextField
                                autoComplete="mailingpostcode"
                                name="mailingpostcode"
                                required
                                fullWidth
                                id="mailingpostcode"
                                label="Postcode"
                                autoFocus
                                onChange={handleIntInput}
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            {
                                stateData &&
                                <TextField
                                    id="mailingstate"
                                    select
                                    fullWidth
                                    name="mailingstate"
                                    label="State"
                                    defaultValue={stateData.stateid || ''}
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
                                    defaultValue={districtData.districtid || ''}
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
                </form>
            </Paper>
        </Box>
    )
}

export default withStyles(styles)(AddCustomer);