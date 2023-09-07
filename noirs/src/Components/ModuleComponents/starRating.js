import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StarSvg from '../../Assets/Icons/starSvg'
import EmptyStarSvg from '../../Assets/Icons/emptyStarSvg'

const StarRating = ({ rating, size }) => {

    const [rate, setRate] = useState([])

    useEffect(() => {
        if (rating) {
            let tempArray = []
            for (let i = 0; i < 5; i++) {
                if (rating > i) {
                    tempArray.push({ star: i, value: true })
                }
                else {
                    tempArray.push({ star: i, value: false })
                }
            }
            setRate(tempArray)
        }
    }, [])


    return (
        <View style={{ flexDirection: 'row' }}>
            {rate.map((item, index) => {
                return (
                    // <View style={{ marginRight: 2 }}>
                        item?.value ?
                            <StarSvg key={index} size={size} />
                            :
                            <EmptyStarSvg key={index} size={size} />
                        
                    // </View>
                )
            })}
        </View>
    )
}

StarRating.defaultProps = {
    rating: 3
}

export default StarRating

const styles = StyleSheet.create({})