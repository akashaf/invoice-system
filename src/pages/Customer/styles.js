const styles = theme => (
    {
        tableHeader: {
            backgroundColor: 'black'
        },
        tableHeaderTypography: {
            fontWeight: 500,
            color: 'white',
            textTransform: 'capitalize'
        },
        detailForm: {
            padding: '1rem',
            margin: '0 auto',
            [theme.breakpoints.down('sm')]: {
                width: 'auto'
              },
            [theme.breakpoints.up('md')]: {
                width: '34rem'
              },
        }
    }
)

export default styles;