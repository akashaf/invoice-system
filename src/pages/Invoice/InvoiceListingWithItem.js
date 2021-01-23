import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import customInstance from '../../axios.config';
import moment from 'moment';
import SectionHeader from '../General/SectionHeader';

const InvoiceListingWithItem = () => {
    const [invoiceListingWithItemData, setInvoiceListingWithItem] = useState([]);
    useEffect(() => {
        customInstance.get('invoiceitem')
            .then(res => {
                console.log(res.data);
                setInvoiceListingWithItem(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <Box>
            <SectionHeader data="List of Detail Invoice with Items" />
            {
                invoiceListingWithItemData.map((invoiceWithItem, key) => (
                    <Box style={{ marginBottom: '1rem' }} key={key}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom><b>Invoice No:</b> {invoiceWithItem.invono}</Typography>
                                <Typography gutterBottom><b>Invoice Item No: </b>{invoiceWithItem.invoseq}</Typography>
                                <Typography gutterBottom><b>Description: </b>{invoiceWithItem.itemdesc}</Typography>
                                <Typography gutterBottom><b>Amount: </b>RM {invoiceWithItem.amountrm}</Typography>
                                <Typography gutterBottom><b>Due Date: </b>RM {moment(invoiceWithItem.duedate).format('DD/MM/YYYY')}</Typography>
                                <Typography gutterBottom><b>Created by: </b>{invoiceWithItem.createdusername}</Typography>
                                <Typography gutterBottom><b>Created Date: </b>{moment(invoiceWithItem.createddate).format('DD/MM/YYYY')}</Typography>
                                <Typography gutterBottom><b>Modified by: </b>{invoiceWithItem.modifiedusername}</Typography>
                                <Typography gutterBottom><b>Modified Date: </b>{moment(invoiceWithItem.modifieddate).format('DD/MM/YYYY')}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))
            }
        </Box>
    )
}

export default InvoiceListingWithItem;