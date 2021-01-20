import { useEffect, useState } from 'react';
import customInstance from '../../../axios.config';
import { Box, TableContainer, TableCell, Typography, TableHead, TableRow, Table, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const DistrictList = (props) => {
  const [districtList, setDistrictList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    queryDistrictList();
    // eslint-disable-next-line
  }, [])

  const queryDistrictList = () => {
    let path = props && props.match.params.id ? `/district/state/${props.match.params.id}` : '/district'
    customInstance.get(path)
      .then(res => { setDistrictList(res.data); })
      .catch(err => console.log(err))
  }

  const list = () => {
    const modifiedDistrictList = [];
    districtList.forEach(district => {
      const tempData = {
        'createddate': moment(district.createddate).format('DD/MM/YYYY'),
        'createdusername': district.createdusername,
        'isactive': district.isactive,
        'modifiedusername': district.modifiedusername,
        'modifydate': moment(district.modifydate).format('DD/MM/YYYY'),
        'districtid': district.districtid,
        'districtname': district.districtname,
        'stateid': district.stateid
      }
      modifiedDistrictList.push(tempData);
    });
    return (
      <Table>
        <TableHead>
          {
            modifiedDistrictList.slice(0, 1).map(modifiedDistrictKey => (
              <TableRow key="0">
                {
                  Object.keys(modifiedDistrictKey).map((modifiedDistrict, key) => (
                    <TableCell key={key}>
                      <Typography>
                        {modifiedDistrict}
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
            modifiedDistrictList.map((modifiedDistrict, key) => (
              <TableRow key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/district-detail/${modifiedDistrict.districtid}`)}>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.createddate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.createdusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.isactive}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.modifiedusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.modifydate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.districtid}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.districtname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.stateid}
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

export default DistrictList;