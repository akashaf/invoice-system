import { Box, Button, Grid, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import { Save, RotateLeft, Delete } from '@material-ui/icons';
import { useEffect, useState } from "react";
import SectionHeader from "../../General/SectionHeader";
import customInstance from '../../../axios.config';
import styles from "../../Customer/styles";
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

const InvoiceItemDetail = (props) => {
    const [invoiceItemDetailData, setInvoiceItemDetailData ] = useState(null);
    const { classes } = props;
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        queryInvoiceItemDetail();
        // eslint-disable-next-line
    },[])

    const queryInvoiceItemDetail = () => {
        customInstance.get(`/invoiceitem/${props.match.params.id}/${props.match.params.itemID}`)
            .then(res => setInvoiceItemDetailData(res.data))
            .catch(err => console.log(err))
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        customInstance.put('/invoiceitem', invoiceItemDetailData)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true });
                history.goBack();
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const handleInput = evt => {
        setInvoiceItemDetailData({ ...invoiceItemDetailData, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setInvoiceItemDetailData({ ...invoiceItemDetailData, [evt.target.name]: newValue })
    }

    const deleteInvoiceItem = () => {
        customInstance.delete(`/invoiceitem/${props.match.params.id}/${props.match.params.itemID}`)
            .then(res => {
                addToast('Delete Successfully', { appearance: 'success', autoDismiss: true });
                history.goBack();
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    return(
        <Box>
            <SectionHeader data="Invoice Item Detail" />
            {
                invoiceItemDetailData &&
                <Box>
                    <Paper className={classes.detailForm}>
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md>
                                    <TextField
                                        autoComplete="invoseq"
                                        name="invoseq"
                                        required
                                        size="small"
                                        fullWidth
                                        id="invoseq"
                                        label="id"
                                        defaultValue={invoiceItemDetailData.invoseq}
                                        autoFocus
                                        onChange={handleIntInput}
                                    />
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <TextField
                                        autoComplete="itemdesc"
                                        name="itemdesc"
                                        required
                                        size="small"
                                        fullWidth
                                        id="itemdesc"
                                        label="Item Description"
                                        defaultValue={invoiceItemDetailData.itemdesc}
                                        autoFocus
                                        onChange={handleInput}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        autoComplete="amountrm"
                                        name="amountrm"
                                        required
                                        size="small"
                                        fullWidth
                                        id="amountrm"
                                        label="Amount (RM)"
                                        defaultValue={invoiceItemDetailData.amountrm}
                                        autoFocus
                                        onChange={handleIntInput}
                                    />
                                </Grid>
                                <Grid item xs={12} md>
                                <TextField
                                        size="small"
                                        fullWidth
                                        name="duedate"
                                        label="Due Date"
                                        type="date"
                                        defaultValue={moment().format("YYYY-MM-DD")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={evt => setInvoiceItemDetailData({ ...invoiceItemDetailData, [evt.target.name]: parseInt(moment(evt.target.value).format('x')) })}
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
                                        label="Modified Name"
                                        defaultValue={invoiceItemDetailData.modifiedusername}
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
                                        label="Modified Date"
                                        defaultValue={moment(invoiceItemDetailData.modifydate).format('DD/MM/YYYY')}
                                        autoFocus
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
                                        label="Created by"
                                        defaultValue={invoiceItemDetailData.createdusername}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        autoComplete="createddate"
                                        name="createddate"
                                        disabled
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        id="createddate"
                                        label="id"
                                        defaultValue={invoiceItemDetailData.createddate}
                                        autoFocus
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
                                    onClick={deleteInvoiceItem}
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
                </Box>
            }
        </Box>
    )
}

export default withStyles(styles)(InvoiceItemDetail);