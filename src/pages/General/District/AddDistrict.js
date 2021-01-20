import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import customInstance from '../../../axios.config';

const AddDistrict = () => {
    const [districtData, setDistrictData] = useState({});
    const history = useHistory();

    const handleInput = evt => {
        setDistrictData({ ...districtData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setDistrictData({ ...districtData, [evt.target.name]: newValue })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.post('/district', districtData)
            .then(() => history.push('/districtList'))
            .catch(err => addToast(err.message, { appearance: 'error', autoDismiss: true }))
    }

    return (
        <Box>
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
                            autoFocus
                            onChange={handleIntInput}
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
                            autoFocus
                            onChange={handleInput}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Send</Button>
                        <Button type="reset" variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddDistrict;