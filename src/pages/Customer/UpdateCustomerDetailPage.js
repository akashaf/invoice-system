import { Box, Grid, TextField, Button } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import customInstance from '../../axios.config';

const UpdateCustomerDetailPage = (props) => {
    const [customerData, setCustomerData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        queryCustomerDetail();
        // eslint-disable-next-line
    }, [setCustomerData])

    const queryCustomerDetail = () => {
        customInstance.get(`/customer/${props.match.params.id}`)
            .then(res => { setCustomerData(res.data); })
            .catch(err => console.log(err))
    }
    
    const handleSubmit = evt => {
        evt.preventDefault();
        axios.put('http://iot.kiswire.com.my:8081/invoice', customerData, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrYXNoYWYiLCJmaXJzdG5hbWUiOiJNdWhhbW1hZCBBa2FzaGFmIiwibGFzdG5hbWUiOiJLaG9tYXJ1ZGluIiwiZW1haWwiOiJha2FzaGFmOTNAZ21haWwuY29tIiwid29ya2dyb3VwIjoiS1NCMDEiLCJhY2Nlc3Nyb2xlIjoiQURNSU4iLCJhY2Nlc3NsZXZlbCI6MSwicGhvdG91cmwiOiJub25lIiwiZXhwIjoxNjExNTM3NzYyfQ.SVWTijofh56ntTcVINKqKiQzSC0SpNlLv6BcOl29RUM` }
        })
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        const name = evt.target.name;
        customerData[name] = evt.target.value;
    }

    const deleteCustomer = () => {
        axios.delete(`http://iot.kiswire.com.my:8081/invoice/${props.match.params.id}`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrYXNoYWYiLCJmaXJzdG5hbWUiOiJNdWhhbW1hZCBBa2FzaGFmIiwibGFzdG5hbWUiOiJLaG9tYXJ1ZGluIiwiZW1haWwiOiJha2FzaGFmOTNAZ21haWwuY29tIiwid29ya2dyb3VwIjoiS1NCMDEiLCJhY2Nlc3Nyb2xlIjoiQURNSU4iLCJhY2Nlc3NsZXZlbCI6MSwicGhvdG91cmwiOiJub25lIiwiZXhwIjoxNjExNTM3NzYyfQ.SVWTijofh56ntTcVINKqKiQzSC0SpNlLv6BcOl29RUM` }
        })
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }
    
    return (
        <Box>
            {
                customerData &&
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="createdusername"
                                name="createdusername"
                                variant="outlined"
                                required
                                fullWidth
                                id="createdusername"
                                label="createdusername"
                                defaultValue={customerData.createdusername}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="custname"
                                name="custname"
                                variant="outlined"
                                required
                                fullWidth
                                id="custname"
                                label="custname"
                                defaultValue={customerData.custname}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="mailingaddr1"
                                name="mailingaddr1"
                                variant="outlined"
                                required
                                fullWidth
                                id="mailingaddr1"
                                label="mailingaddr1"
                                defaultValue={customerData.mailingaddr1}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="mailingaddr2"
                                name="mailingaddr2"
                                variant="outlined"
                                required
                                fullWidth
                                id="mailingaddr2"
                                label="mailingaddr2"
                                defaultValue={customerData.mailingaddr2}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="mailingaddr3"
                                name="mailingaddr3"
                                variant="outlined"
                                required
                                fullWidth
                                id="mailingaddr3"
                                label="mailingaddr3"
                                defaultValue={customerData.mailingaddr3}
                                autoFocus
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="mailingdistrict"
                                name="mailingdistrict"
                                variant="outlined"
                                required
                                fullWidth
                                id="mailingdistrict"
                                label="mailingdistrict"
                                defaultValue={customerData.mailingdistrict}
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
                                defaultValue={moment(customerData.createddate).format("DD/MM/YYYY")}
                                autoFocus
                                onChange={handleInput}
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
                                defaultValue={parseInt(customerData.custid)}
                                autoFocus
                                onChange={evt => customerData[evt.target.name] = parseInt(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="mailingpostcode"
                                name="mailingpostcode"
                                variant="outlined"
                                required
                                fullWidth
                                id="mailingpostcode"
                                label="mailingpostcode"
                                defaultValue={parseInt(customerData.mailingpostcode)}
                                autoFocus
                                onChange={evt => customerData[evt.target.name] = parseInt(evt.target.value)}
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
                                defaultValue={parseInt(customerData.isactive)}
                                autoFocus
                                onChange={evt => customerData[evt.target.name] = parseInt(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">Send</Button>
                            <Button type="reset" variant="contained">Reset</Button>
                            <Button variant="contained" color="secondary" onClick={deleteCustomer}>Delete</Button>
                        </Grid>
                    </Grid>
                </form>
            }
        </Box>
    )
}

export default UpdateCustomerDetailPage;