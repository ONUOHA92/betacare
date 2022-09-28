import styled from '@emotion/styled'


export const  headingStyle = {
   textAlign: 'center',
   color:"info.main",
   fontWeight:800,
}

export const carouselHeading = {
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "1.7rem",
  lineGeight: "49px",
}

export const carouselContent = {
  fontStyle: "normal",
}

export const HeadingText = styled.div`
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  font-size: 45px;

  line-height: 140%;
  margin-left: 30%;
  width: 551px;
  height: 141px;

  @media (max-width: 1000px) {
    margin-left: 32%;
    font-size: 30px;
    width: 350px;
  }
  @media (max-width: 800px) {
    margin-left: 29%;
    font-size: 30px;
    width: 350px;
  }
  @media (max-width: 600px) {
    margin-left: 4%;
    font-size: 25px;
    width: 100%;
  }
  @media (max-width: 400px) {
    margin-left: 0%;
    font-size: 25px;
    width: 100%;
  }
`



export const Card = styled.div`
  box-sizing: border-box;
  width: 360.61px;
  height: 424px;
  padding: 20px;
  padding-bottom: 10px;
  background: #f2f6ff;
  border: 1.36621px solid #e5e5e5;
  border-radius: 12.1722px;
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
`

