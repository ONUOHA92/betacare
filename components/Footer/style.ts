import styled from '@emotion/styled'
import { COLORS } from 'utils/config/colors'

export const headingInfoStyle = {
  width: '18rem',
  height: '5.9rem',
  paddingLeft: '20px',
  paddingTop: '5%',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '1.2rem',
  lineHeight: '2rem',
  color: 'info.light',
}

export const linkStyle = {
  marginTop: '10px',
  color: 'info.light',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '1.2rem',
  lineHeight: '2.5rem',
}

export const HeaderFooterStyle = {
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '1.1rem',
  lineHeight: '1rem',
  lineSpacing: '0.1rem',
  textTransform: 'uppercase',
  color: 'primary.main',
}

export const copyRight = {
  paddingTop: '2%',
  paddingBottom: '0%',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1rem',
  textAlign: 'center',
  color: 'info.light',
}

export const iconStyle = {
  color: 'info.light',
  fontSize: 32,
}

export const logofooterStyle = {
  width: { xs: '150px', sm: '200px' },
  height: { xs: '40px', sm: '50px' },
  mt: -2,
}

export const Wrapper = styled.section`
  background: background.default;
  max-width: 100%;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${COLORS.grey50};
  padding-top: '1rem';
`

export const Main = styled.main`
  padding: 7rem 0 2rem;
  width: 95%;
  margin: 0 auto;
`

export const BorderLine = styled.hr`
  width: 100%;
  margin-top: 5%;
  border: 1px solid ${COLORS.grey50};
`
export const LogoContainer = styled.div`
  padding-top: 0%;
`

export const SocialContainer = styled.div`
  padding: 0 1.2rem;
`

export const SocialMediaIcon = styled.div`
  flex-direction: row;
  padding: 1.1rem;
  width: 150px;
  margin-left: 30px;
  align-items: flex-start;
  padding: 0px;
  padding-top: 17%;
  @media (max-width: 360px) {
    padding-top: 35%;
  }
  @media (max-width: 450px) {
    padding-top: 35%;
  }
  @media (max-width: 360px) {
    padding-top: 35%;
  }
`
