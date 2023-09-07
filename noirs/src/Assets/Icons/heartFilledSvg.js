import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const HeartFilledSvg = ({color, size,active}) => {

  const defaultColor =  active ? "#FFB800" : "white"


  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.51L7.695 15.3224C3.06 11.1206 0 8.34047 0 4.9485C0 2.16834 2.178 0 4.95 0C6.516 0 8.019 0.728779 9 1.87143C9.981 0.728779 11.484 0 13.05 0C15.822 0 18 2.16834 18 4.9485C18 8.34047 14.94 11.1206 10.305 15.3224L9 16.51Z" fill="#FF0000"/>
      </svg>
      `}
    />
  );
};

export default HeartFilledSvg;
