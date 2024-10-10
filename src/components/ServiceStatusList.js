import React, {useEffect, useState} from 'react';
import {getServerStatus} from "../redux/stores/serverStatusSlice";
import {useDispatch, useSelector} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled, tableCellClasses} from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ServiceStatusList = () => {
  const dispatch = useDispatch();
  const catalogs = useSelector(state => state?.serverStatus?.data)
  const status = useSelector(state => state?.serverStatus?.status)
  const [isTableVisible, setIsTableVisible] = useState([]);

  const toggleTableVisibility = (index, value) => {
    setIsTableVisible(isTableVisible => {
      const newIsTableVisible = [...isTableVisible];
      newIsTableVisible[index] = value;
      return newIsTableVisible;
    });
  };
  useEffect(() => {
    dispatch(getServerStatus())
  }, [dispatch])

  useEffect(() => {
    console.log(typeof isTableVisible);
    console.log(isTableVisible[0]);
  }, [isTableVisible])

  return (
    <Paper>
      {status === 'loading' ? (
        <h1>Loading...</h1>
      ) : status === 'succeeded' && Array.isArray(catalogs) && catalogs?.length > 0 ? (
        catalogs.map((catalog, index) => (
          <div key={`report-${index}`} style={{ paddingBottom: '5px'}}>
            <div style={{
              marginBottom: 0,
              textAlign: 'left',
              backgroundColor: '#cbcbcb',
              display: 'flex',
              alignItems: 'center'
            }}>
              <h2 style={{padding: '0 20px 0 20px'}}>{catalog?.Catalog}</h2>
              {(isTableVisible[index] === undefined || isTableVisible[index] === 'true')  ?
                <ExpandMoreIcon onClick={() => toggleTableVisibility(index, 'false')} sx={{fontSize: '2.5rem'}}/> :
                <ExpandLessIcon onClick={() => toggleTableVisibility(index, 'true')} sx={{fontSize: '2.5rem'}}/>}
            </div>
            {(isTableVisible[index] === undefined || isTableVisible[index] === 'true') && (
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{fontWeight: 'bold'}} align="center">No</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}}>Products And Services</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}}>Last Update</TableCell>
                      <TableCell sx={{fontWeight: 'bold'}}>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(catalog?.Report) && catalog?.Report?.length > 0 &&
                      catalog?.Report?.map((item, index) => (
                        <StyledTableRow
                          key={item?.svc_name}
                          sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                          <StyledTableCell align="center" scope="row">{index + 1}</StyledTableCell>
                          <StyledTableCell scope="row">{item?.svc_name}</StyledTableCell>
                          <StyledTableCell>{item?.status}</StyledTableCell>
                          <StyledTableCell>{item?.last_update}</StyledTableCell>
                          <StyledTableCell>{item?.message}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        ))
      ) : (
        <h1>Something went wrong</h1>
      )}


    </Paper>
  );
};

export default ServiceStatusList