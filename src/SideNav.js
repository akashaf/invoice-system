import { Box, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const links = [
    {
        name: 'InvoiceList',
        path: '/',
    },
    {
        name: 'AddInvoice',
        path: '/invoice',
    },
    {
        name: 'CustomerList',
        path: '/customer',
    },
    {
        name: 'AddCustomer',
        path: '/add-customer',
    },
    {
        name: 'stateList',
        path: '/stateList',
    },
    {
        name: 'AddState',
        path: '/add-state',
    },
    {
        name: 'DistrictList',
        path: '/districtList',
    },
    {
        name: 'AddDistrict',
        path: '/add-district',
    }
]

const SideNav = () => {
    return (
        <div>
            {
                links.map(link => (
                    <Box key={link.path}>
                        <Box style={{ margin: '.5rem' }}>
                            <Typography>
                                <Link to={link.path} style={{ textDecoration: 'none', cursor: 'pointer' }}>{link.name}</Link>
                            </Typography>
                        </Box>
                        <Divider />
                    </Box>
                ))
            }
        </div>
    )
}

export default SideNav;