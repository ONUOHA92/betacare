import React from 'react';
import { Typography } from '@mui/material';
import { Wrapper, firstContentStyle, secondContentStyle } from './style'

function index() {
   return (
      <>
         <Wrapper>
            <Typography
               component="h2"
               sx={firstContentStyle}
               gutterBottom
            >
               In effect, we leverage technology
               in providing a digital space whereby
               telehealth services, drug prescription (purchase and delivery),
               diagnostic services, and medical records can be
               provided seamlessly from the use of any computer or mobile device.
            </Typography>

            <Typography
               sx={secondContentStyle}
            >
               BetaCare collaborates with pharmacies,
               research, and medical facilities to deliver
               high-quality healthcare to everyone, everywhere.
               BetaCare is also in partnership with MTN and other
               telecommunications companies in Africa to improve
               saccessibility and affordability of premium healthcare
               for all their citizens in each country operating with BetaCare.

            </Typography>
         </Wrapper>

      </>
   );
}

export default index;