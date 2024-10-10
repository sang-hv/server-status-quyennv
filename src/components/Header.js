import {Box, Container} from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Box component="section" sx={{
      p: 2,
      bgcolor: '#243a5e',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container sx={{textAlign: 'left', marginLeft: '20px'}}>
        <h1 style={{color: 'white', marginTop: 0}}>Service Status List</h1>
        <div style={{color: 'white'}}>
          Updated 58 seconds ago
        </div>
      </Container>
    </Box>
  )
}