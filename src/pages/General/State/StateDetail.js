import { useEffect, useState } from "react";
import customInstance from '../../../axios.config';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import DistrictByState from "./DistrictByState";

const StateDetail = (props) => {
    const [stateData, setStateData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        queryStateDetail();
        // eslint-disable-next-line
    }, [setStateData])

    const queryStateDetail = () => {
        customInstance.get(`/state/${props.match.params.id}`)
            .then(res => { setStateData(res.data); })
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.put('/state', stateData)
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

    const deleteState = () => {
        customInstance.delete(`/state/${props.match.params.id}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/stateList');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            {
                stateData &&
                <Box>
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="stateid"
                                    name="stateid"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="stateid"
                                    label="stateid"
                                    defaultValue={stateData.stateid}
                                    autoFocus
                                    onChange={handleIntInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="isactive"
                                    name="isactive"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="isactive"
                                    label="isactive"
                                    defaultValue={stateData.isactive}
                                    autoFocus
                                    onChange={handleIntInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="statename"
                                    name="statename"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="statename"
                                    label="statename"
                                    defaultValue={stateData.statename}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="modifiedusername"
                                    name="modifiedusername"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="modifiedusername"
                                    label="modifiedusername"
                                    defaultValue={stateData.modifiedusername}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="modifiedusername"
                                    name="modifiedusername"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="modifiedusername"
                                    label="modifiedusername"
                                    defaultValue={stateData.modifiedusername}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="createddate"
                                    name="createddate"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="createddate"
                                    label="createddate"
                                    defaultValue={moment(stateData.createddate).format("DD/MM/YYYY")}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="modifydate"
                                    name="modifydate"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="modifydate"
                                    label="modifydate"
                                    defaultValue={moment(stateData.modifydate).format("DD/MM/YYYY")}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Send</Button>
                                <Button type="reset" variant="contained">Reset</Button>
                                <Button variant="contained" color="secondary" onClick={deleteState}>Delete</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <hr />
                    <DistrictByState {...props} />
                </Box>
            }
        </Box>
    )
}

export default StateDetail;