import { useEffect, useState } from 'react';
import customInstance from '../../../axios.config';
import { Grid, Button, Box, TableContainer, TableCell, Typography, TableHead, TableRow, Table, TableBody, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import styles from '../../Customer/styles';
import SectionHeader from '../SectionHeader';
import AddIcon from '@material-ui/icons/Add';

const StateList = (props) => {
  const [stateList, setStateList] = useState([]);
  const history = useHistory();
  const { classes } = props;

  useEffect(() => {
    queryStateList();
  }, [])

  const queryStateList = () => {
    customInstance.get('/state')
      .then(res => setStateList(res.data))
      .catch(err => console.log(err))
  }

  const list = () => {
    const modifiedStateList = [];
    stateList.forEach(state => {
      const tempData = {
        'createddate': moment(state.createddate).format('DD/MM/YYYY'),
        'createdusername': state.createdusername,
        'isactive': state.isactive,
        'modifiedusername': state.modifiedusername,
        'modifydate': moment(state.modifydate).format('DD/MM/YYYY'),
        'stateid': state.stateid,
        'statename': state.statename
      }
      modifiedStateList.push(tempData);
    });

    const tableHeaders = [
      'id',
      'state',
      'is_active',
      'created by',
      'modified by',
      'created date',
      'modified date'
    ]

    return (
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableHeader}>
            {
              tableHeaders.map(tableHeader => (
                <TableCell key={tableHeader}>
                  <Typography className={classes.tableHeaderTypography}>{tableHeader}</Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            modifiedStateList.map((modifiedState, key) => (
              <TableRow hover key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/state-detail/${modifiedState.stateid}`)}>
                <TableCell>
                  <Typography>
                    {modifiedState.stateid}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.statename}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.isactive}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.createdusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.modifiedusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.createddate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.modifydate}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs>
          <SectionHeader data="List of State" />
        </Grid>
        <Grid item xs>
          <Box style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push('/add-state')}
            >
              <Typography>
                New State
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <TableContainer>
        {list()}
      </TableContainer>
    </Box>
  )
}

export default withStyles(styles)(StateList);