import * as React from 'react';
import styles from "./style.module.css"
import Image from "next/image"
import Button from "../../components/Button";
import smallDoctor from "public/images/mock/small_doctor.jpg"
import smallFamily from "public/images/mock/mother_and_daughter.jpg"
import Avatar from '@mui/material/Avatar';

interface Props {
  containerWidth?: string
  containerHeight?: string
  imageWidth?: string
  imageHeight?: string
  video?: boolean
  moveTop?: boolean
  toggleChatWhileOnCall?: Function
  startVoiceCall?: boolean
  endSession?: Function
}


const VisualComponent = ({ containerWidth, containerHeight, imageWidth, imageHeight, video, moveTop, toggleChatWhileOnCall, startVoiceCall, endSession }: React.PropsWithChildren<Props>) => {
  return (
    <div className={`${styles.container} ${moveTop ? styles.vidCallContainer : ""} ${startVoiceCall ? styles.adjustContainer : ""}`} style={{ width: containerWidth }}>
      <div className={styles.smallD}>
        <Image src={smallDoctor} alt="receivers's image" width={imageWidth} height={imageHeight} className={`${styles.smallDImg} ${startVoiceCall ? styles.roundAvatar : ""}`} />
        {video &&
          <div className={`${styles.smallF} ${styles.makeFResponsive} ${moveTop ? styles.moveImageTop : ""}`}>
            <Image src={smallFamily} alt="sender's image" width={`${moveTop ? "145" : "170"}`} height={`${moveTop ? "102" : "127"}`} className={styles.smallDFImg} />
          </div>
        }
      </div>
      <div className={`${styles.icons} ${moveTop ? styles.adjustPadd : ""}`} >
        <div className={`${styles.svg} ${moveTop ? styles.svgAdjust : ""}`}>
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 0C13.1025 0 14.8263 1.62245 14.9877 3.68354L13 5.6712V4C13 2.897 12.103 2 11 2C9.897 2 9 2.897 9 4V9.6712L7.25716 11.414C7.09096 10.9744 7 10.4978 7 10V4C7 1.791 8.791 0 11 0ZM9.85825 11.6414L13 8.49963L15 6.49963L20.6712 0.828426L22 2.15722L15 9.15722L10.2311 13.9262L8.64049 15.5167L7.14547 17.0117L1.3288 22.8284L0 21.4996L5.59855 15.9011L7.01624 14.4834L8.43243 13.0672L9.85825 11.6414ZM5 10C5 11.0572 5.27469 12.0513 5.75645 12.9148L4.29931 14.3719C3.47768 13.1152 3 11.6134 3 10V8H5V10ZM10 17.9381C9.7258 17.9039 9.45591 17.8558 9.19106 17.7946L10.9857 16L11 16C14.309 16 17 13.309 17 10V9.98565L18.9856 8H19V10C19 14.0793 15.9461 17.4459 12 17.9381V21H10V17.9381Z" fill="#333333" />
          </svg>
        </div>
        <div className={`${styles.svg} ${moveTop ? styles.svgAdjust : ""}`}>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 2H14C15.1046 2 16 2.89543 16 4V5.223V8.777V10C16 11.1046 15.1046 12 14 12H4C2.89543 12 2 11.1046 2 10V4C2 2.89543 2.89543 2 4 2ZM17.9959 10.1818C17.9009 12.3066 16.1482 14 14 14H4C1.79086 14 0 12.2091 0 10V4C0 1.79086 1.79086 0 4 0H14C16.1482 0 17.9009 1.69343 17.9959 3.81819L22 1V13L17.9959 10.1818ZM18 7.739L20 9.147V4.854L18 6.261V7.739Z" fill="#333333" />
          </svg>
        </div>
        <div className={`${styles.svg} ${moveTop ? styles.svgAdjust : ""}`} onClick={() => toggleChatWhileOnCall()}>
          <svg width="30" height="30" viewBox="0 0 30 30" style={{ width: "21.61px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9C17.514 9 22 12.685 22 17.213C22 22.253 16.854 25.372 12.087 25.372C10.06 25.372 8.539 24.933 7.539 24.66L3.535 25.856L4.787 22.956C3.835 21.956 2 20.368 2 17.213C2 12.685 6.486 9 12 9ZM12 7C5.372 7 0 11.573 0 17.213C0 19.603 0.932 21.804 2.427 23.377L0 29L7.563 26.74C9.148 27.174 10.664 27.372 12.086 27.372C19.184 27.373 24 22.441 24 17.213C24 11.573 18.628 7 12 7Z" fill="#333333" />
            <g filter="url(#filter0_b_0_1)">
              <rect x="24" width="6" height="6" rx="3" fill="#E82121" />
            </g>
            <defs>
              <filter id="filter0_b_0_1" x="-16" y="-40" width="86" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImage" stdDeviation="20" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className={`${styles.svg} ${moveTop ? styles.svgAdjust : ""} ${styles.red}`} onClick={() => endSession()}>
          <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5521 6.12791L19.3613 7.12391C19.1849 8.05511 18.3125 8.68151 17.3249 8.58551L15.3605 8.39591C14.5037 8.31311 13.8689 7.68791 13.6001 6.79991C13.2353 5.59391 13.0001 4.69991 13.0001 4.69991C12.0526 4.29384 11.0309 4.0895 10.0001 4.09991C8.7833 4.09991 7.9145 4.35791 7.0001 4.69991C7.0001 4.69991 6.7553 5.59511 6.4001 6.79991C6.1625 7.60391 5.7953 8.30831 4.9565 8.39231L3.0029 8.58911C2.52717 8.63479 2.0502 8.51541 1.65208 8.25101C1.25396 7.98662 0.958923 7.59331 0.816496 7.13711L0.518896 6.14231C0.3714 5.6667 0.357996 5.15962 0.480161 4.67689C0.602326 4.19416 0.855322 3.7545 1.2113 3.40631C2.9213 1.74551 5.9993 0.809506 9.9905 0.804706C13.9889 0.799906 16.7033 1.73111 18.5849 3.39191C19.3769 4.09031 19.7393 5.14151 19.5509 6.12791H19.5521Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default VisualComponent
