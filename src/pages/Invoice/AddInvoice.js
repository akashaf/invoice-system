import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { addToast } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import customInstance from '../../axios.config';
import moment from 'moment';

const AddInvoice = () => {
    const [invoiceData, setInvoiceData] = useState({});
    const history = useHistory();

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setInvoiceData({ ...invoiceData, [evt.target.name]: newValue })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.post('/invoice', invoiceData)
            .then(() => history.push('/'))
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            autoComplete="invono"
                            name="invono"
                            variant="outlined"
                            required
                            fullWidth
                            id="invono"
                            label="invono"
                            autoFocus
                            onChange={handleIntInput}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoComplete="custid"
                            name="custid"
                            variant="outlined"
                            required
                            fullWidth
                            id="custid"
                            label="custid"
                            autoFocus
                            onChange={handleIntInput}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="invodate"
                            id="invodate"
                            label="invodate"
                            type="date"
                            defaultValue="yyyy-MM-dd"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={evt => setInvoiceData({ ...invoiceData, [evt.target.name]: parseInt(moment(evt.target.value).format('x')) })}
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

export default AddInvoice;