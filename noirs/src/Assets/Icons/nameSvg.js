import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const NameSvg = ({color, size,active}) => {

    const defColor = active ? "black" : Colors.primaryWhite
    const defaultSize = size ? size : 17

  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0365 2.41711C6.73731 2.40633 2.42778 6.69401 2.41702 11.9878C2.40625 17.2816 6.6983 21.5868 11.9975 21.5976C17.2967 21.6084 21.6062 17.3207 21.617 12.0269C21.6277 6.73306 17.3357 2.42789 12.0365 2.41711ZM12.0287 6.2532C13.8815 6.25697 15.3856 7.7657 15.3819 9.61662C15.3781 11.4675 13.8678 12.9701 12.015 12.9664C10.1623 12.9626 8.65812 11.4539 8.66188 9.60295C8.66565 7.75203 10.1759 6.24943 12.0287 6.2532ZM12.0014 19.6795C10.0526 19.6756 7.7502 18.8845 6.11262 16.9056C7.79684 15.591 9.87383 14.8789 12.0111 14.8833C14.1485 14.8876 16.2225 15.6081 17.9014 16.9295C16.2558 18.9018 13.9502 19.6835 12.0014 19.6795Z" fill="#2D2C42"/>
      </svg>
               
      `}
    />
  );
};

export default NameSvg;
