import { Box, Grid, TextField, Button, withStyles, Paper } from '@material-ui/core';
import { useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import customInstance from '../../../axios.config';
import styles from '../../Customer/styles';

const AddState = (props) => {
    // eslint-disable-next-line
    const [stateData, setStateData] = useState({});
    const history = useHistory();
    const { classes } = props;

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.post('/state', stateData)
            .then(() => history.push('/stateList'))
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Paper className={classes.detailForm}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs md>
                        <TextField
                            autoComplete="stateid"
                            name="stateid"
                            required
                            fullWidth
                            id="stateid"
                            label="id"
                            autoFocus
                            onChange={evt => stateData[evt.target.name] = parseInt(evt.target.value)}
                        />
                    </Grid>
                    <Grid item xs md={10}>
                        <TextField
                            autoComplete="statename"
                            name="statename"
                            required
                            fullWidth
                            id="statename"
                            label="Name"
                            autoFocus
                            onChange={evt => stateData[evt.target.name] = evt.target.value}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box style={{ textAlign: 'center' }}>
                            <Button style={{ marginRight: '1rem' }} type="submit" variant="contained" color="primary">Send</Button>
                            <Button type="reset" variant="contained">Reset</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default withStyles(styles)(AddState);