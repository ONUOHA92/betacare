import { COLORS } from "utils/config/colors"


export const heroHeadingWrapper = {
    pl:{md:5, lg:0,xl:0},
    pt:{xs:5, md:0,xl:0},
}

export const imgStyle = { maxHeight:"558px", maxWidth:{md:"557px"},borderRadius:"50px",   objectFit: "fill"  }

export const heroHeading = {
    fontSize:{xs:"2.5rem",sm:"3.5rem", md:"2.3rem", lg:"4.1rem", },
    fontWeight:500,
    textAlign:{xs:"center", md:"left"},
}

export const herosubHeading = {
    fontSize: '24px',
    fontWeight: 'small',
    color: 'secondary.dark',
    mb:5,
    textAlign:{xs:"center", md:"left"},
  }

  export const buttonStyle ={
    padding: '2.5% 10%',
 

    color: COLORS.whiteColor,
    borderRadius: '12px',
    textTransform: 'capitalize',
    fontWeight:800,
    fontSize:"18px",
    backgroundColor: "primary.main",

    
    '&:hover': {
      backgroundColor: "primary.light",
      color: "primary.main",
    },
  }