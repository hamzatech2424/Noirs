import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const ArrowDownSvg = ({color, size,active}) => {

    const defColor = active ? "black" : Colors.primaryWhite
    const defaultSize = size ? size : 17

  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2595 0.371365C13.47 0.581829 13.5752 0.84969 13.5752 1.17495C13.5752 1.50021 13.47 1.76808 13.2595 1.97854L7.97878 7.25926C7.86398 7.37405 7.73962 7.45518 7.60569 7.50263C7.47176 7.55008 7.32826 7.57419 7.1752 7.57495C7.02213 7.57495 6.87366 7.54625 6.72978 7.48885C6.5859 7.43145 6.46651 7.35492 6.37161 7.25926L1.09089 1.97854C0.880429 1.76807 0.775196 1.50021 0.775196 1.17495C0.775196 0.849689 0.880429 0.581827 1.09089 0.371364C1.30136 0.160901 1.56922 0.0556683 1.89448 0.0556683C2.21974 0.0556683 2.4876 0.160901 2.69807 0.371364L7.1752 4.84849L11.6523 0.371365C11.8628 0.160902 12.1307 0.0556692 12.4559 0.0556692C12.7812 0.0556692 13.049 0.160902 13.2595 0.371365Z" fill="#2D2C42"/>
      </svg>                    
      `}
    />
  );
};

export default ArrowDownSvg;
