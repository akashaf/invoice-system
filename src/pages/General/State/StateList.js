import { useEffect, useState } from 'react';
import customInstance from '../../../axios.config';
import { Box, TableContainer, TableCell, Typography, TableHead, TableRow, Table, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const StateList = () => {
  const [stateList, setStateList] = useState([]);
  const history = useHistory();

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
    return (
      <Table>
        <TableHead>
          {
            modifiedStateList.slice(0, 1).map(modifiedStateKey => (
              <TableRow key="0">
                {
                  Object.keys(modifiedStateKey).map((modifiedState, key) => (
                    <TableCell key={key}>
                      <Typography>
                        {modifiedState}
                      </Typography>
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableHead>
        <TableBody>
          {
            modifiedStateList.map((modifiedState, key) => (
              <TableRow key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/state-detail/${modifiedState.stateid}`)}>
                <TableCell>
                  <Typography>
                    {modifiedState.createddate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.createdusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.isactive}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.modifiedusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedState.modifydate}
                  </Typography>
                </TableCell>
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
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }

  return (
    <Box>
      <TableContainer>
        {list()}
      </TableContainer>
    </Box>
  )
}

export default StateList;