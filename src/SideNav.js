import { Box, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const links = [
    {
        name: 'Invoices',
        path: '/',
    },
    {
        name: 'Customers',
        path: '/customer',
    },
    {
        name: 'States',
        path: '/stateList',
    },
    {
        name: 'Districts',
        path: '/districtList',
    },
    {
        name: 'List of Invoice with Items',
        path: '/invoice-listing-with-item',
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