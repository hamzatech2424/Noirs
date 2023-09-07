import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../../theme';

const HomeSvg = ({color, size,isFocused}) => {

    const defaultColor = isFocused ? "#2D2C42" : "#2D2C42"

  return (
    <SvgXml
      width={size}
      height={size}
      xml={`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.302 18.19V15.19M10.372 3.01003L3.44202 8.56003C2.66202 9.18003 2.16202 10.49 2.33202 11.47L3.66202 19.43C3.90202 20.85 5.26202 22 6.70202 22H17.902C19.332 22 20.702 20.84 20.942 19.43L22.272 11.47C22.432 10.49 21.932 9.18003 21.162 8.56003L14.232 3.02003C13.162 2.16003 11.432 2.16003 10.372 3.01003Z" stroke="${defaultColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
           
      `}
    />
  );
};

export default HomeSvg;
