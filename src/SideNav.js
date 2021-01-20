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
        name: 'CustomerListPage',
        path: '/customer',
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
    },
]

const SideNav = () =>  {
    return(
        <div>
            <nav>
                <ul>
                    {
                        links.map(link => (
                            <li key={link.path}>
                                <Link to={link.path}>{link.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default SideNav;