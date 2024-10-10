import React, {useEffect} from 'react';
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
  const serviceStatus = useSelector(state => state?.serverStatus?.data)
  const status = useSelector(state => state?.serverStatus?.status)

  useEffect(() => {
    dispatch(getServerStatus())
  }, [dispatch])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Products And Services</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Last Update</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { status === 'loading' ? (
              <StyledTableRow>
                <StyledTableCell sx={{ fontWeight: 'bold', color: 'blue' }} align="center" colSpan={5}>
                  Loading...
                </StyledTableCell>
              </StyledTableRow>
            ) : (status === 'succeeded' && Array.isArray(serviceStatus) && serviceStatus?.length > 0) ? (
              serviceStatus?.map((item, index) => (
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
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell sx={{ fontWeight: 'bold', color: 'red' }} align="center" colSpan={5}>
                  Something went wrong
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ServiceStatusList