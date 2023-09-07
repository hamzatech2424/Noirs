import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const EmptyStarSvg = ({color, size,active}) => {

  const defaultSize =  size ? size : 14

  return (
    <SvgXml
      width={defaultSize}
      height={defaultSize}
      xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.20011 4.09605L9.30878 4.29097L9.52643 4.34024L13.2194 5.17629C13.2194 5.17629 13.2194 5.1763 13.2194 5.1763C13.2757 5.18908 13.3302 5.21757 13.3766 5.26146C13.4232 5.3055 13.46 5.36357 13.4809 5.43106L13.9584 5.28268L13.4809 5.43106C13.5019 5.49863 13.5057 5.5714 13.4916 5.64148C13.4775 5.71151 13.4465 5.77432 13.4038 5.82427L10.8864 8.76833L10.7482 8.92992L10.7687 9.14154L11.1498 13.0698L11.1498 13.0698C11.1567 13.1415 11.1455 13.2132 11.118 13.2774C11.0906 13.3415 11.0487 13.3942 10.9989 13.432C10.9492 13.4697 10.893 13.4917 10.8362 13.4981C10.7794 13.5044 10.7214 13.4952 10.6674 13.4703L10.6673 13.4703L7.20942 11.8777L7.00025 11.7813L6.79108 11.8777L3.33325 13.4703L3.33315 13.4703C3.27912 13.4952 3.22111 13.5044 3.16433 13.4981C3.10749 13.4917 3.0513 13.4697 3.00165 13.432C2.95182 13.3942 2.90993 13.3415 2.88251 13.2774C2.85504 13.2132 2.84376 13.1415 2.85072 13.0698L2.85073 13.0698L3.23176 9.14154L3.25229 8.92989L3.11407 8.76828L0.596562 5.8248L0.596431 5.82464C0.553681 5.7747 0.522581 5.71188 0.508431 5.6418C0.494272 5.57168 0.498038 5.49885 0.519041 5.43123C0.54002 5.36369 0.576836 5.30558 0.623467 5.26151C0.669946 5.2176 0.724485 5.18912 0.780821 5.17636L4.47407 4.34024L4.69173 4.29097L4.80039 4.09605L6.7021 0.684795C6.70211 0.684772 6.70212 0.68475 6.70213 0.684727C6.73544 0.625039 6.7816 0.578227 6.83389 0.546826C6.88601 0.515525 6.9433 0.5 7.00025 0.5C7.05721 0.5 7.11449 0.515525 7.16662 0.546826C7.21891 0.578227 7.26507 0.625039 7.29837 0.684727C7.29839 0.68475 7.2984 0.684772 7.29841 0.684795L9.20011 4.09605Z" stroke="#FFB800"/>
      </svg>
            `}
    />
  );
};

export default EmptyStarSvg;
