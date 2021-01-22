import { useEffect, useState } from "react";
import customInstance from '../../../axios.config';
import { Box, Grid, TextField, Button, FormGroup, FormControlLabel, Switch, Paper, withStyles, MenuItem } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import styles from "../../Customer/styles";

const DistrictDetail = (props) => {
    const [districtData, setDistrictData] = useState(null);
    const [stateData, setStateData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        queryDistrictDetail();
        customInstance.get('/state')
            .then(res => setStateData(res.data))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [setDistrictData])

    const queryDistrictDetail = () => {
        customInstance.get(`/district/${props.match.params.id}`)
            .then(res => setDistrictData(res.data))
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.put('/district', districtData)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        setDistrictData({ ...districtData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setDistrictData({ ...districtData, [evt.target.name]: newValue })
    }

    const handleCheck = evt => {
        let newValue = evt.target.checked ? 1 : 0;
        setDistrictData({ ...districtData, [evt.target.name]: newValue })
    }

    const deleteDistrict = () => {
        customInstance.delete(`/district/${props.match.params.id}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/districtList');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            {
                districtData &&
                <Paper className={classes.detailForm}>
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TextField
                                    autoComplete="districtid"
                                    name="districtid"
                                    size="small"
                                    required
                                    fullWidth
                                    id="districtid"
                                    label="District id"
                                    defaultValue={districtData.districtid}
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
                                    defaultValue={districtData.districtname}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                            {
                                stateData &&
                                <TextField
                                    id="stateid"
                                    select
                                    fullWidth
                                    name="stateid"
                                    label="State"
                                    defaultValue={districtData.stateid || 4}
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
                            <Grid item xs={12} md={6}>
                                <TextField
                                    autoComplete="createdusername"
                                    name="createdusername"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="createdusername"
                                    label="Created By"
                                    defaultValue={districtData.createdusername}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    autoComplete="modifiedusername"
                                    name="modifiedusername"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="modifiedusername"
                                    label="Modified By"
                                    defaultValue={districtData.modifiedusername}
                                    autoFocus
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <TextField
                                    autoComplete="createddate"
                                    name="createddate"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="createddate"
                                    label="Created Date"
                                    defaultValue={moment(districtData.createddate).format("DD/MM/YYYY")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    autoComplete="modifydate"
                                    name="modifydate"
                                    variant="filled"
                                    disabled
                                    fullWidth
                                    id="modifydate"
                                    label="Modified Date"
                                    defaultValue={moment(districtData.modifydate).format("DD/MM/YYYY")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormGroup>
                                    <FormControlLabel
                                    control={<Switch size="small" checked={districtData.isactive === 1 ? true : false} onChange={handleCheck} name="isactive" />}
                                    label="isactive"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box style={{ textAlign: 'center' }}>
                                    <Button style={{ marginRight: '1rem' }} type="submit" variant="contained" color="primary">Send</Button>
                                    <Button style={{ marginRight: '1rem' }} type="reset" variant="contained">Reset</Button>
                                    <Button variant="contained" color="secondary" onClick={deleteDistrict}>Delete</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            }
        </Box>
    )
}

export default withStyles(styles)(DistrictDetail);