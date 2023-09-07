import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const HeartNotFilledSvg = ({color, size,active}) => {

  const defaultColor =  active ? "#FFB800" : "white"


  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.09 13.9908L9 14.0807L8.901 13.9908C4.626 10.1129 1.8 7.54871 1.8 4.9485C1.8 3.14905 3.15 1.79946 4.95 1.79946C6.336 1.79946 7.686 2.69918 8.163 3.92281H9.837C10.314 2.69918 11.664 1.79946 13.05 1.79946C14.85 1.79946 16.2 3.14905 16.2 4.9485C16.2 7.54871 13.374 10.1129 9.09 13.9908ZM13.05 0C11.484 0 9.981 0.728779 9 1.87143C8.019 0.728779 6.516 0 4.95 0C2.178 0 0 2.16834 0 4.9485C0 8.34047 3.06 11.1206 7.695 15.3224L9 16.51L10.305 15.3224C14.94 11.1206 18 8.34047 18 4.9485C18 2.16834 15.822 0 13.05 0Z" fill="#FF0000"/>
      </svg>      
      `}
    />
  );
};

export default HeartNotFilledSvg;
