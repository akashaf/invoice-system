import { useEffect, useState } from "react";
import customInstance from '../../../axios.config';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const DistrictDetail = (props) => {
    const [districtData, setDistrictData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        queryDistrictDetail();
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
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="districtid"
                                name="districtid"
                                variant="outlined"
                                required
                                fullWidth
                                id="districtid"
                                label="districtid"
                                defaultValue={districtData.districtid}
                                autoFocus
                                onChange={handleIntInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="stateid"
                                name="stateid"
                                variant="outlined"
                                required
                                fullWidth
                                id="stateid"
                                label="stateid"
                                defaultValue={districtData.stateid}
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
                                defaultValue={districtData.isactive}
                                autoFocus
                                onChange={handleIntInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="createdusername"
                                name="createdusername"
                                variant="outlined"
                                required
                                fullWidth
                                id="createdusername"
                                label="createdusername"
                                defaultValue={districtData.createdusername}
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
                                defaultValue={districtData.modifiedusername}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="districtname"
                                name="districtname"
                                variant="outlined"
                                required
                                fullWidth
                                id="districtname"
                                label="districtname"
                                defaultValue={districtData.districtname}
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
                                defaultValue={moment(districtData.createddate).format("DD/MM/YYYY")}
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
                                defaultValue={moment(districtData.modifydate).format("DD/MM/YYYY")}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">Send</Button>
                            <Button type="reset" variant="contained">Reset</Button>
                            <Button variant="contained" color="secondary" onClick={deleteDistrict}>Delete</Button>
                        </Grid>
                    </Grid>
                </form>
            }
        </Box>
    )
}

export default DistrictDetail;