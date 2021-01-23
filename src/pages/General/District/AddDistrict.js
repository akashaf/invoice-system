import { Box, Grid, TextField, Button, Paper, withStyles, MenuItem, Typography } from '@material-ui/core';
import { Save, RotateLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import axiosApi from '../../../axios.config';
import styles from '../../Customer/styles';
import SectionHeader from '../SectionHeader';

const AddDistrict = (props) => {
    const [districtData, setDistrictData] = useState({});
    const [stateData, setStateData] = useState(null);
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        axiosApi.get('/state')
            .then(res => setStateData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleInput = evt => {
        setDistrictData({ ...districtData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setDistrictData({ ...districtData, [evt.target.name]: newValue })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        axiosApi.post('/district', districtData)
            .then(() => history.push('/districtList'))
            .catch(err => addToast(err.message, { appearance: 'error', autoDismiss: true }))
    }

    return (
        <Box>
            <SectionHeader data="New District" />
            <Paper className={classes.detailForm}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <TextField
                                autoComplete="districtid"
                                name="districtid"
                                size="small"
                                required
                                fullWidth
                                id="districtid"
                                label="id"
                                autoFocus
                                onChange={handleIntInput}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                autoComplete="districtname"
                                name="districtname"
                                size="small"
                                required
                                fullWidth
                                id="districtname"
                                label="District Name"
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        {
                                stateData &&
                                <TextField
                                    id="stateid"
                                    select
                                    fullWidth
                                    name="stateid"
                                    label="State"
                                    defaultValue={stateData.stateid || ''}
                                    onChange={handleIntInput}
                                >
                                    {stateData.map((state) => (
                                        <MenuItem key={state.stateid} value={state.stateid}>
                                            {state.statename}
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

export default withStyles(styles)(AddDistrict);