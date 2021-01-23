import { useEffect, useState } from 'react';
import customInstance from '../../../axios.config';
import { withStyles, Box, TableContainer, TableCell, Typography, TableHead, TableRow, Table, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import styles from '../../Customer/styles';
import SectionHeader from '../SectionHeader';

const DistrictList = (props) => {
  const [districtList, setDistrictList] = useState([]);
  const history = useHistory();
  const { classes } = props;

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

    const tableHeaders = [
      'district id',
      'district name',
      'state id',
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
            modifiedDistrictList.map((modifiedDistrict, key) => (
              <TableRow hover key={key} style={{ cursor: 'pointer' }} onClick={() => history.push(`/district-detail/${modifiedDistrict.districtid}`)}>
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
                <TableCell>
                  <Typography>
                    {modifiedDistrict.isactive}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.createdusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.modifiedusername}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.createddate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {modifiedDistrict.modifydate}
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
      <SectionHeader data="Districts" />
      <TableContainer>
        {list()}
      </TableContainer>
    </Box>
  )
}

export default withStyles(styles)(DistrictList);