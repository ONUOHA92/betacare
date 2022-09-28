import styled from '@emotion/styled'
import { COLORS } from 'utils/config/colors'



export const buttonStyle ={
  padding: '2.5% 10%',


  color: "warning.light",
  borderRadius: '12px',
  textTransform: 'capitalize',
  fontWeight:800,
  fontSize:"18px",
  backgroundColor: "secondary.main",
   
  
  '&:hover': {
    backgroundColor: "primary.light",
    color: "primary.main",
  },
}

export const MainContainer = styled.div`
  width: 100%;
  // height: 500px;
  background: #1f56c3;
  border-radius: 40.1639px;
  padding: 50px;
  padding-bottom: 150px;
  position: relative;
`

export const Paragraph = styled.p`
  font-style: normal;
  font-weight: 800;
  padding-top: 60px;
  font-size: 32.1311px;
  line-height: 44px;
  color: secondary.main;
  @media (max-width: 800px) {
    font-size: 25px;
  }
  @media (max-width: 600px) {
    font-size: 25px;
  }

  @media (max-width: 400px) {
    font-size: 20px;
    padding-top: 20px;
  }
`

export const ImageCover = styled.div`
  position: absolute;
  top: -0px;
  right: 45px;
  @media (max-width: 950px) {
    display: none;
  }
  @media (max-width: 800px) {
    display: none;
  }
  @media (max-width: 600px) {
    display: none;
  }
`

export const ImageCoverSecond = styled.div`
  position: absolute;
  bottom: -6px;
  right: 45px;
  @media (max-width: 950px) {
    display: none;
  }
  @media (max-width: 800px) {
    display: none;
  }
  @media (max-width: 600px) {
    display: none;
  }
`
export const ButtonContainer = styled.div`
  @media (max-width: 400px) {
    margin-left: -40px;
    width: 200px;
  }
  @media (max-width: 600px) {
    margin-left: -40px;
    width: 200px;
  }
`


