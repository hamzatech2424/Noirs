import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const SearchIcon = ({color, size,active}) => {

    const defColor = active ? "black" : Colors.primaryWhite
    const defaultSize = size ? size : 17

  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8004 6V7H14.8004H18.4004C18.4534 7 18.5043 7.02107 18.5418 7.05858C18.5793 7.09609 18.6004 7.14695 18.6004 7.2V20.4C18.6004 21.0896 18.3265 21.7509 17.8389 22.2385C17.3513 22.7261 16.69 23 16.0004 23H4.00039C3.31083 23 2.64951 22.7261 2.16191 22.2385C1.67432 21.7509 1.40039 21.0896 1.40039 20.4V7.2C1.40039 7.14696 1.42146 7.09609 1.45897 7.05858C1.49648 7.02107 1.54735 7 1.60039 7H5.20039H6.20039V6V4.8C6.20039 3.79218 6.60075 2.82563 7.31338 2.11299C8.02602 1.40036 8.99257 1 10.0004 1C11.0082 1 11.9748 1.40036 12.6874 2.11299C13.4 2.82563 13.8004 3.79218 13.8004 4.8V6ZM12.4004 7H13.4004V6V4.8C13.4004 3.89826 13.0422 3.03346 12.4046 2.39584C11.7669 1.75821 10.9021 1.4 10.0004 1.4C9.09865 1.4 8.23385 1.75821 7.59623 2.39584C6.9586 3.03346 6.60039 3.89826 6.60039 4.8V6V7H7.60039H12.4004ZM2.80039 7.4H1.80039V8.4V20.4C1.80039 20.9835 2.03217 21.5431 2.44475 21.9556C2.85734 22.3682 3.41692 22.6 4.00039 22.6H16.0004C16.5839 22.6 17.1434 22.3682 17.556 21.9556C17.9686 21.5431 18.2004 20.9835 18.2004 20.4V8.4V7.4H17.2004H14.8004H13.8004V8.4V9.6C13.8004 9.65304 13.7793 9.70391 13.7418 9.74142C13.7043 9.77893 13.6534 9.8 13.6004 9.8C13.5473 9.8 13.4965 9.77893 13.459 9.74142C13.4215 9.70391 13.4004 9.65304 13.4004 9.6V8.4V7.4H12.4004H7.60039H6.60039V8.4V9.6C6.60039 9.65304 6.57932 9.70391 6.54181 9.74142C6.5043 9.77893 6.45343 9.8 6.40039 9.8C6.34735 9.8 6.29648 9.77893 6.25897 9.74142C6.22146 9.70391 6.20039 9.65304 6.20039 9.6V8.4V7.4H5.20039H2.80039Z" stroke="#5C5C5C" stroke-width="2"/>
      </svg>               
      `}
    />
  );
};

export default SearchIcon;