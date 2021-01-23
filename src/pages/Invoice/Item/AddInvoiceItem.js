import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, withStyles } from "@material-ui/core";
import { Save, RotateLeft } from '@material-ui/icons';
import { useEffect, useState } from "react";
import moment from 'moment';
import axiosApi from '../../../axios.config';
import { useToasts } from 'react-toast-notifications';
import SectionHeader from '../../General/SectionHeader';
import { useHistory } from 'react-router-dom';
import styles from '../../Customer/styles';


const AddInvoiceItem = (props) => {
    const { addToast } = useToasts();
    const [invoiceItemDataPost, setInvoiceItemDataPost] = useState({});
    const [invoiceItemData, setInvoiceItemData] = useState(null);
    const history = useHistory();
    const { classes } = props;

    useEffect(() => {
        axiosApi.get(`/invoiceitem/invoiceno/${props.id}`)
            .then(res => setInvoiceItemData(res.data))
            .catch(err => addToast(err.message, { appearance: 'error' }))
        // eslint-disable-next-line
    }, [])

    const handleInput = evt => {
        setInvoiceItemDataPost({ ...invoiceItemDataPost, [evt.target.name]: evt.target.value })
    }

    const handleIntInput = evt => {
        let newValue = evt.target.value ? parseInt(evt.target.value) : '';
        setInvoiceItemDataPost({ ...invoiceItemDataPost, [evt.target.name]: newValue })
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            return;
        }
        invoiceItemDataPost.invono = props.id;
        invoiceItemDataPost.duedate = parseInt(moment().format('x'));
        axiosApi.post('/invoiceitem', invoiceItemDataPost)
            .then(res => {
                addToast('Saved Successfully', { appearance: 'success', autoDismiss: true });
                setInvoiceItemDataPost({});
                evt.target.reset();
                axiosApi.get(`/invoiceitem/invoiceno/${props.id}`)
                    .then(res => {
                        console.log(res);
                        setInvoiceItemData(res.data);
                    })
            })
            .catch(err => addToast(err.message, { appearance: 'error' }))
    }

    const tableHeaders = [
        'id',
        'amount',
        'Description',
        'Due Date',
        'Created by',
        'Modified by',
        'Created Date',
        'Modified Date'
    ]

    return (
        <Box>
            <SectionHeader data="New Invoice Item" />
            <Paper className={classes.detailForm}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoComplete="invoseq"
                        required
                        name="invoseq"
                        size="small"
                        fullWidth
                        label="ID"
                        autoFocus
                        onChange={handleIntInput}
                    />
                    <TextField
                        autoComplete="amountrm"
                        name="amountrm"
                        size="small"
                        fullWidth
                        label="Amount(RM)"
                        autoFocus
                        onChange={handleIntInput}
                    />
                    <TextField
                        autoComplete="itemdesc"
                        required
                        name="itemdesc"
                        size="small"
                        fullWidth
                        label="Description"
                        autoFocus
                        onChange={handleInput}
                    />
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
                        onChange={evt => setInvoiceItemDataPost({ ...invoiceItemDataPost, [evt.target.name]: parseInt(moment(evt.target.value).format('x')) })}
                    />
                    <Box style={{ marginTop: '1rem', textAlign: 'center' }}>
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
                            type="reset"
                        >
                            <Typography>
                                Reset
                                    </Typography>
                        </Button>
                    </Box>
                </form>
            </Paper>
            {
                invoiceItemData &&
                <Box>
                    <SectionHeader data="Items" />
                    <Table size="small">
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                {
                                    tableHeaders.map(tableHeader => (
                                        <TableCell key={tableHeader} className={classes.tableHeaderTypography}>
                                            <Typography>{tableHeader}</Typography>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                invoiceItemData.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Typography style={{ textAlign: 'center' }}>No Item</Typography>
                                    </TableCell>
                                </TableRow>
                            }
                            {
                                invoiceItemData.length > 0 && invoiceItemData.map(invoiceItem => (
                                    <TableRow hover key={invoiceItem.invoseq} style={{ cursor: 'pointer' }} onClick={() => history.push(`/invoice-detail/${props.id}/invoice-item-detail/${invoiceItem.invoseq}`)}>
                                        <TableCell>
                                            <Typography>{invoiceItem.invoseq}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{invoiceItem.amountrm}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{invoiceItem.itemdesc}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{moment(invoiceItem.duedate).format("DD/MM/YYYY")}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{invoiceItem.createdusername}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{invoiceItem.modifiedusername}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{moment(invoiceItemData.createddate).format("DD/MM/YYYY")}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{moment(invoiceItemData.modifydate).format("DD/MM/YYYY")}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>
            }
        </Box>
    )
}

export default withStyles(styles)(AddInvoiceItem);