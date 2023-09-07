import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const ArrowUpSvg = ({color, size,active}) => {

    const defColor = active ? "black" : Colors.primaryWhite
    const defaultSize = size ? size : 17

  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.740499 7.62863C0.530036 7.41817 0.424805 7.15031 0.424805 6.82505C0.424805 6.49979 0.530036 6.23192 0.740499 6.02146L6.02122 0.740743C6.13602 0.625945 6.26038 0.544821 6.39431 0.497371C6.52824 0.449921 6.67174 0.425814 6.8248 0.425049C6.97787 0.425049 7.12634 0.453748 7.27022 0.511147C7.4141 0.568546 7.53349 0.645078 7.62839 0.740743L12.9091 6.02146C13.1196 6.23192 13.2248 6.49979 13.2248 6.82505C13.2248 7.15031 13.1196 7.41817 12.9091 7.62863C12.6986 7.8391 12.4308 7.94433 12.1055 7.94433C11.7803 7.94433 11.5124 7.8391 11.3019 7.62863L6.8248 3.15151L2.34767 7.62863C2.13721 7.8391 1.86935 7.94433 1.54409 7.94433C1.21883 7.94433 0.950963 7.8391 0.740499 7.62863Z" fill="#2D2C42"/>
      </svg>                    
      `}
    />
  );
};

export default ArrowUpSvg;
