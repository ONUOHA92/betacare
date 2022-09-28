import React from "react"
import { CardMedia, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { chooseUsTitleStyle } from "./style";


interface IContent {
        title: string
        description: string
        icon: any
        key?:any
}

const Content = ({title,description,icon,key}:IContent) => {
        return(
                <Grid container item xs={12} sm={12} md={4} lg={4} xl={4}
                key={key}
                >
                <Typography
                sx={{textAlign:{xs:'center',md:"left"}}}
                component={'section'}
                >
                  <Image 
                  width={"86.59px"}
                  height={"86.59px"}
                  src={icon} alt={`icon`}/>
                  <Typography 
                  component="h3" variant="h5"
                  sx={chooseUsTitleStyle}>{title}</Typography>
                  <Typography
                
                  >
                   {description}
                  </Typography>
                </Typography>
              </Grid>
        )
}

export default Content;