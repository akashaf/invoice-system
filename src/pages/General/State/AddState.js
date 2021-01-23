import { Box, Grid, TextField, Button, withStyles, Paper, Typography } from '@material-ui/core';
import { Save, RotateLeft } from '@material-ui/icons';
import { useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import customInstance from '../../../axios.config';
import styles from '../../Customer/styles';
import SectionHeader from '../SectionHeader';

const AddState = (props) => {
    // eslint-disable-next-line
    const [stateData, setStateData] = useState({});
    const history = useHistory();
    const { classes } = props;

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        customInstance.post('/state', stateData)
            .then(() => history.push('/stateList'))
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            <SectionHeader data="New State" />
            <Paper className={classes.detailForm}>
                <form onSubmit={handleSubmit}>
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

export default withStyles(styles)(AddState);