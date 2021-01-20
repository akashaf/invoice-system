import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import customInstance from '../../../axios.config';

const AddState = () => {
    // eslint-disable-next-line
    const [stateData, setStateData] = useState({});
    const history = useHistory();

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.post('/state', stateData)
            .then(() => history.push('/stateList'))
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
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
                            autoFocus
                            onChange={evt => stateData[evt.target.name] = parseInt(evt.target.value)}
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
                            autoFocus
                            onChange={evt => stateData[evt.target.name] = evt.target.value}
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

export default AddState;