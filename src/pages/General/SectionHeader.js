const { Box, Typography } = require("@material-ui/core")

const SectionHeader = props => {
    return (
        <Box>
            <Typography
                gutterBottom
                variant="h4"
                style={{ textTransform: 'uppercase' }}
            >
                {props.data}
            </Typography>
        </Box>
    )
}

export default SectionHeader;