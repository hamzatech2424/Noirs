import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../theme';


const SW = Dimensions.get("window").width

const Placeholder = ({ height, width, borderRadius, customStyle }) => {

  const defaultHeight = height ? height : 20
  const defaultWidth = width ? width : 100
  const defaultBorderRadius = borderRadius ? borderRadius : 10

  return (
    <SkeletonPlaceholder speed={1000} borderRadius={defaultBorderRadius} backgroundColor={Colors.primaryGray} highlightColor={Colors.primaryGrayOne}>
      <SkeletonPlaceholder.Item width={defaultWidth} height={defaultHeight} flexDirection="row" alignItems="center" style={{...customStyle}} />
    </SkeletonPlaceholder>
  )
}

export default Placeholder

const styles = StyleSheet.create({})