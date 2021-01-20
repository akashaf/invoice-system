import { useEffect, useState } from "react";
import customInstance from '../../axios.config';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const InvoiceDetail = (props) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        queryInvoiceDetail();
        // eslint-disable-next-line
    }, [setInvoiceData])

    const queryInvoiceDetail = () => {
        customInstance.get(`/invoice/${props.match.params.id}`)
            .then(res => { setInvoiceData(res.data); })
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        customInstance.put('/invoice', invoiceData)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        setInvoiceData({ ...invoiceData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setInvoiceData({ ...invoiceData, [evt.target.name]: newValue })
    }

    const deleteInvoice = () => {
        customInstance.delete(`/invoice/${props.match.params.id}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.push('/');
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return (
        <Box>
            {
                invoiceData &&
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
                                    defaultValue={invoiceData.invono}
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
                                    defaultValue={invoiceData.custid}
                                    autoFocus
                                    onChange={handleIntInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="buildup"
                                    name="buildup"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="buildup"
                                    label="buildup"
                                    defaultValue={invoiceData.buildup}
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
                                    defaultValue={invoiceData.createdusername}
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
                                    defaultValue={invoiceData.modifiedusername}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="lotno"
                                    name="lotno"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lotno"
                                    label="lotno"
                                    defaultValue={invoiceData.lotno}
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
                                    defaultValue={moment(invoiceData.modifydate).format("DD/MM/YYYY")}
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
                                    defaultValue={moment(invoiceData.createddate).format("DD/MM/YYYY")}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="invodate"
                                    name="invodate"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="invodate"
                                    label="invodate"
                                    defaultValue={moment(invoiceData.invodate).format("DD/MM/YYYY")}
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Send</Button>
                                <Button type="reset" variant="contained">Reset</Button>
                                <Button variant="contained" color="secondary" onClick={deleteInvoice}>Delete</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            }
        </Box>
    )
}

export default InvoiceDetail;