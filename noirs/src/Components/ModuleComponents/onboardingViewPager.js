import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, NativeModules } from 'react-native'
import React, { useState } from 'react'
import PagerView from 'react-native-pager-view';
import { Colors, Fonts, Measures } from '../../theme';
import OnBoardingOneSvg from '../../Assets/Icons/onBoardingOneSvg';
import OnBoardingTwoSvg from '../../Assets/Icons/onBoardingTwoSvg';
import OnBoardingThreeSvg from '../../Assets/Icons/onBoardingThreeSvg';
import AbstractButton from '../AbstractComponents/abstractButton';
import AuthController from '../../Controller/authController';
import { navigate } from '../../Navigation/mainNavigation';


const DOT_SIZE = 20;
const NORMAL_DOT_WIDTH = 20
const CURRENT_DOT_WIDTH = 50
const { StatusBarManager } = NativeModules;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const data = [
    {
        _id: 0,
        key: 'first',
        title: "All Your Shopping in One Place",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius urna a urna rutrum mattis.",
        imageSvg: () => <OnBoardingOneSvg />
    },
    {
        _id: 1,
        key: 'second',
        title: "Save Big with Our Affordable Prices",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius urna a urna rutrum mattis.",
        imageSvg: () => <OnBoardingTwoSvg />

    },
    {
        _id: 2,
        key: 'third',
        title: "No Credit Card? No Problem!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius urna a urna rutrum mattis.",
        imageSvg: () => <OnBoardingThreeSvg />

    },
];




const OnBoardingContent = ({ item }) => {


    const onGetStarted = () => {
        AuthController.firstTimeOnboardingScreenShow()
            .then(() => {
                console.log("onboarding key value Stored in AsyncStorage")
                navigate("login")
            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (
        <View style={{ flex: 1, }}>

            <View style={{ ...StyleSheet.absoluteFillObject }} >
                {/* <Image source={item.imageUrl} style={{ width: '100%', height: "100%" }} /> */}
                {item.imageSvg ? item.imageSvg() : false}
            </View>
            <View style={{ ...StyleSheet.absoluteFillObject }} >
                <View style={{ height: StatusBarManager.HEIGHT }} />
                <View style={{ flex: 1, width: '90%', alignSelf: 'center' }} >
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        {item.key != "third" ?
                            <TouchableOpacity
                                style={{ padding: 5,marginTop:10 }}
                                onPress={onGetStarted}
                            >
                                <Text style={styles.textTwo}>Skip</Text>
                            </TouchableOpacity>
                            : false}
                    </View>

                    <View style={{ width: '100%', height:item.key == "third"?260: 220, }}>
                        <View>
                            <Text style={styles.textOne}>{item.title}</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.textTwo}>{item.description}</Text>
                        </View>

                        {item.key == "third" ?
                            <View style={{marginVertical:15}}>
                                <AbstractButton onPress={onGetStarted} bgcolor={Colors.primaryWhite} txtColor={Colors.primaryBlack} label={"Get Started"} />
                            </View>
                            : false}


                    </View>
                </View>

            </View>
        </View>
    )
}




const Pagination = ({
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
    currentPosition
}) => {

    return (
        <View style={[styles.paginationView]}>
            {data.map((item, index) => {

                const animatedWidth = Animated.add(
                    scrollOffsetAnimatedValue,
                    positionAnimatedValue
                ).interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [NORMAL_DOT_WIDTH, CURRENT_DOT_WIDTH, NORMAL_DOT_WIDTH],
                    extrapolate: 'clamp',
                });


                return (
                    <View key={item.key} >
                        <Animated.View
                            style={[styles.paginationDot, { backgroundColor: currentPosition == index ? Colors.primaryWhite : Colors.primaryGrayOne, width: animatedWidth }]}
                        />
                    </View>
                );
            })}
        </View>
    );
};



const OnboardingViewPager = () => {

    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const [currentPosition, setCurrentPosition] = useState(0)

    return (
        <View style={styles.pagerView} initialPage={0}>
            <AnimatedPagerView
                initialPage={0}
                style={{ width: '100%', height: '100%' }}
                onPageScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                offset: scrollOffsetAnimatedValue,
                                position: positionAnimatedValue,
                            },
                        },
                    ],
                    {
                        listener: ({ nativeEvent: { offset, position } }) => {
                            // console.log(`Position: ${position} Offset: ${offset}`);
                            setCurrentPosition(position)
                        },
                        useNativeDriver: false,
                    }
                )}
            >
                {data.map((item, index) => (
                    <OnBoardingContent key={index} item={item} />
                ))}


            </AnimatedPagerView>
            <Pagination
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                positionAnimatedValue={positionAnimatedValue}
                currentPosition={currentPosition}
            />
        </View>
    )
}

export default OnboardingViewPager

const styles = StyleSheet.create({
    pagerView: {
        width: "100%",
        flex: 1
    },
    paginationView: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationDot: {
        width: NORMAL_DOT_WIDTH,
        height: DOT_SIZE * 0.25,
        borderRadius: DOT_SIZE * 2,
        marginHorizontal: 5
    },
    textOne: {
        fontSize: 24,
        fontFamily: Fonts.extraBold,
        color: Colors.primaryWhite,
        textTransform: 'uppercase',
        // textAlign: "center"
    },
    textTwo: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.primaryWhite,
        // textTransform: 'uppercase',
        // textAlign: "center"
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: Measures.SW,
        borderTopWidth: 100,
        borderRightColor: "transparent",
        borderTopColor: Colors.primaryBackground,
        position: 'absolute',
        bottom: 0,
        transform: [{ rotate: "180deg" },
        ]
    },
    nextButtonText: {
        fontSize: 17,
        fontFamily: Fonts.semiBold,
        color: Colors.primaryBlack
    }
})