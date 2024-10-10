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
  // const serviceStatus = useSelector(state => state?.serverStatus?.data)
  const status = useSelector(state => state?.serverStatus?.status)
  const catalogs = dataFake
  const [isTableVisible, setIsTableVisible] = useState([]);

  const toggleTableVisibility = (index, value) => {
    console.log(index);
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


const dataFake = [
  {
    "Catalog": "System API Global System",
    "Report": [
      {
        "svc_name": "api-au-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:14.679528+00:00"
      },
      {
        "svc_name": "api-br-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:15.907007+00:00"
      },
      {
        "svc_name": "api-ca-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:16.944630+00:00"
      },
      {
        "svc_name": "api-eu-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:17.832879+00:00"
      },
      {
        "svc_name": "api-hk-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:18.276059+00:00"
      },
      {
        "svc_name": "api-sgp-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:18.654097+00:00"
      },
      {
        "svc_name": "api-sw-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:19.606360+00:00"
      },
      {
        "svc_name": "api-uk-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:20.476254+00:00"
      },
      {
        "svc_name": "api-us-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:21.477979+00:00"
      },
      {
        "svc_name": "app-report",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:22.363796+00:00"
      }
    ]
  },
  {
    "Catalog": "System Report Global Service",
    "Report": [
      {
        "svc_name": "api-report-au-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:23.245495+00:00"
      },
      {
        "svc_name": "api-report-br-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:23.613449+00:00"
      },
      {
        "svc_name": "api-report-ca-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:24.487622+00:00"
      },
      {
        "svc_name": "api-report-ge-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:25.367168+00:00"
      },
      {
        "svc_name": "api-report-hk-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:26.254101+00:00"
      },
      {
        "svc_name": "api-report-sgp-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:27.199021+00:00"
      },
      {
        "svc_name": "api-report-sz-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:28.070636+00:00"
      },
      {
        "svc_name": "api-report-uk-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:28.960952+00:00"
      },
      {
        "svc_name": "api-report-us-azure",
        "status": "Online",
        "message": "System is currently Up",
        "last_update": "2024-10-10T08:31:29.833874+00:00"
      }
    ]
  }
]

export default ServiceStatusList