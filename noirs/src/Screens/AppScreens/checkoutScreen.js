import { StyleSheet, FlatList, View, NativeModules, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors, Fonts } from '../../theme';
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import { goBack } from '../../Navigation/mainNavigation';
import BackArrowSvg from "../../Assets/Icons/backArrowSvg"
import ArrowDownSvg from "../../Assets/Icons/arrowDownSvg"
import ArrowUpSvg from "../../Assets/Icons/arrowUpSvg"
import CartSvg from "../../Assets/Icons/cartSvg"
import AbstractIconButton from '../../Components/AbstractComponents/abstractIconButton';
import CategoryDetailItem from '../../Components/ModuleComponents/categoryDetailItem';
import AbstractTextInput from '../../Components/AbstractComponents/abstractTextInput';
import NameSvg from '../../Assets/Icons/nameSvg';
import EmailSvg from '../../Assets/Icons/emailSvg';

const { StatusBarManager } = NativeModules;

const CheckoutScreen = ({ }) => {

    const [deliveryInfoHide, setDeliveryInfoHide] = useState(false)
    const [fullName, setFullName] = useState("")
    const [fullNameError, setFullNameError] = useState("")
    const [paymentInfoHide, setPaymentInfoHide] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")



    const onPressDeliveryInformation = () => {
        setDeliveryInfoHide((prev) => !prev)
        setPaymentInfoHide(false)
    }

    const onPressPaymentInformation = () => {
        setPaymentInfoHide((prev) => !prev)
        setDeliveryInfoHide(false)
    }



    return (
        <View style={styles.mainContainer}>
            <View style={{ height: StatusBarManager.HEIGHT }} />
            <AbstractContentContainer>
                <AbstractHeader
                    leftChild={() => (
                        <TouchableOpacity
                            style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "flex-start" }}
                            activeOpacity={0.9}
                            onPress={() => goBack()}
                        >
                            <BackArrowSvg />
                        </TouchableOpacity>
                    )}
                    middleChild={() => (
                        <View
                            style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}
                        >
                            <Text style={styles.textOne}>{`CheckOut`}</Text>
                        </View>
                    )}

                />


                <View>
                    <TouchableOpacity
                        onPress={onPressDeliveryInformation}
                        activeOpacity={0.9}
                        style={{ width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                        <Text style={styles.textTwo}>Delivery Information</Text>
                        {deliveryInfoHide ?
                            <ArrowDownSvg />
                            :
                            <ArrowUpSvg />
                        }
                    </TouchableOpacity>
                    {deliveryInfoHide ?
                        <View />
                        :
                        <View style={{ width: "100%", backgroundColor: 'green' }} >

                            <View style={{ marginTop: 20 }}>
                                <AbstractTextInput
                                    styleMode={"two"}
                                    label={"Name"}
                                    placeholder={"enter your name"}
                                    icon={() => <NameSvg />}
                                    value={fullName}
                                    onChangeText={(txt) => {
                                        setFullName(txt)
                                        if (txt.length < 6) {
                                            setFullNameError("fullname must be 6 letters long")
                                        }
                                        else {
                                            setFullNameError("")
                                        }
                                    }}
                                    error={fullNameError}
                                />
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <AbstractTextInput
                                    label={"Email"}
                                    placeholder={"enter your email"}
                                    icon={() => <EmailSvg />}
                                    value={email}
                                    onChangeText={(txt) => {
                                        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                                        setEmail(txt)
                                        if (reg.test(txt) === false) {
                                            setEmailError("please enter a valid email")
                                        }
                                        else {
                                            setEmailError("")
                                        }
                                    }}
                                    error={emailError}
                                    keyboardType={"email-address"}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <AbstractTextInput
                                    styleMode={"two"}
                                    label={"Name"}
                                    placeholder={"enter your name"}
                                    icon={() => <NameSvg />}
                                    value={fullName}
                                    onChangeText={(txt) => {
                                        setFullName(txt)
                                        if (txt.length < 6) {
                                            setFullNameError("fullname must be 6 letters long")
                                        }
                                        else {
                                            setFullNameError("")
                                        }
                                    }}
                                    error={fullNameError}
                                />
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <AbstractTextInput
                                    styleMode={"two"}
                                    label={"Name"}
                                    placeholder={"enter your name"}
                                    icon={() => <NameSvg />}
                                    value={fullName}
                                    onChangeText={(txt) => {
                                        setFullName(txt)
                                        if (txt.length < 6) {
                                            setFullNameError("fullname must be 6 letters long")
                                        }
                                        else {
                                            setFullNameError("")
                                        }
                                    }}
                                    error={fullNameError}
                                />
                            </View>


                        </View>
                    }
                </View>



                <View>
                    <TouchableOpacity
                        onPress={onPressPaymentInformation}
                        activeOpacity={0.9}
                        style={{ width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                        <Text style={styles.textTwo}>Payment Information</Text>
                        {paymentInfoHide ?
                            <ArrowDownSvg />
                            :
                            <ArrowUpSvg />
                        }
                    </TouchableOpacity>

                </View>


            </AbstractContentContainer>
        </View>
    )
}

export default CheckoutScreen


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBackground
    },
    textOne: {
        fontFamily: Fonts.bold,
        fontSize: 19,
        color: Colors.primaryBlue
    },
    textTwo: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: Colors.primaryBlue
    },
})