import { useEffect, useState } from "react";
import { Save, RotateLeft, Delete } from '@material-ui/icons';
import axiosApi from '../../../axios.config';
import { Paper, Box, Grid, TextField, Button, FormGroup, FormControlLabel, Switch, withStyles, Typography } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import DistrictByState from "./DistrictByState";
import styles from "../../Customer/styles";
import SectionHeader from "../SectionHeader";

const StateDetail = (props) => {
    const [stateData, setStateData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        queryStateDetail();
        // eslint-disable-next-line
    }, [setStateData])

    const queryStateDetail = () => {
        axiosApi.get(`/state/${props.match.params.id}`)
            .then(res => { setStateData(res.data); })
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        axiosApi.put('/state', stateData)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        setStateData({ ...stateData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setStateData({ ...stateData, [evt.target.name]: newValue })
    }

    const handleCheck = evt => {
        let newValue = evt.target.checked ? 1 : 0;
        setStateData({ ...stateData, [evt.target.name]: newValue })
    }

    const deleteState = () => {
        axiosApi.delete(`/state/${props.match.params.id}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/stateList');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            <SectionHeader data="State Detail" />
            {
                stateData &&
                <Box>
                    <Paper className={classes.detailForm}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md>
                                    <TextField
                                        autoComplete="stateid"
                                        name="stateid"
                                        disabled
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        id="stateid"
                                        label="id"
                                        defaultValue={stateData.stateid}
                                        autoFocus
                                        onChange={handleIntInput}
                                    />
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <TextField
                                        autoComplete="statename"
                                        name="statename"
                                        required
                                        size="small"
                                        fullWidth
                                        id="statename"
                                        label="Name"
                                        defaultValue={stateData.statename}
                                        autoFocus
                                        onChange={handleInput}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        autoComplete="createdusername"
                                        name="createdusername"
                                        variant="filled"
                                        disabled
                                        size="small"
                                        fullWidth
                                        id="createdusername"
                                        label="Created By"
                                        defaultValue={stateData.createdusername}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        autoComplete="modifiedusername"
                                        name="modifiedusername"
                                        variant="filled"
                                        disabled
                                        size="small"
                                        fullWidth
                                        id="modifiedusername"
                                        label="Modified by"
                                        defaultValue={stateData.modifiedusername}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        autoComplete="createddate"
                                        name="createddate"
                                        variant="filled"
                                        disabled
                                        size="small"
                                        fullWidth
                                        id="createddate"
                                        label="Created Date"
                                        defaultValue={moment(stateData.createddate).format("DD/MM/YYYY")}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        autoComplete="modifydate"
                                        name="modifydate"
                                        variant="filled"
                                        disabled
                                        size="small"
                                        fullWidth
                                        id="modifydate"
                                        label="modified Date"
                                        defaultValue={moment(stateData.modifydate).format("DD/MM/YYYY")}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch size="small" checked={stateData.isactive === 1 ? true : false} onChange={handleCheck} name="isactive" id="isactive" />}
                                        label="is active"
                                    />
                                </FormGroup>
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
                                    onClick={deleteState}
                                >
                                    <Typography>
                                    Delete
                                    </Typography>
                                </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    <DistrictByState {...props} />
                </Box>
            }
        </Box>
    )
}

export default withStyles(styles)(StateDetail);