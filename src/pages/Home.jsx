// import React from 'react'
// import AppLayout from '../components/layout/AppLayout'
// import { Box, Typography } from '@mui/material';
// import { grayColor } from '../constants/color';

// const Home = () => {
//   return (
//     <Box bgcolor={grayColor} height={"100%"}>
//       <Typography p={"2rem"} variant='h5' textAlign={"center"}>
//           Select a friend to chat
//       </Typography>
//     </Box>
//   )
// }

// export default AppLayout()(Home);




import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color';

const Home = () => {
  return (
    <Box 
      bgcolor={grayColor} 
      height={"100%"}
      display="flex"
      flexDirection="column"
    >
      {/* <Typography p={"2rem"} variant='h5' textAlign={"center"}>
          Select a friend to chat
      </Typography> */}
      
      <Box flex={1} position="relative">
        <iframe
          src="https://manishinc-chat.onrender.com/" // Replace with your desired website URL
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="Website Preview"
        />
      </Box>
    </Box>
  )
}

export default AppLayout()(Home);
