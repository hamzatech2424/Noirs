import { StyleSheet, Text, View, NativeModules, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigate, closeDrawer } from './mainNavigation'
import AbstractContentContainer from '../Components/AbstractComponents/abstractContentContainer';
import AbstractButton from '../Components/AbstractComponents/abstractButton';
import AbstractDropDown from '../Components/AbstractComponents/abstractDropDown';
import { Colors, Fonts } from '../theme';
import RadioButton from '../Components/ModuleComponents/radioButton';
import { budgetFilter, categoryFilter, colorFilter, ratingFilter, sizeFilter, sortFilter } from '../MocData';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductsController from '../Controller/productsController';
import { setAllProducts } from '../Store/Slices/productsSlice';

const { StatusBarManager } = NativeModules;



const CustomDrawer = () => {

    const filterMeta = useSelector((state) => state.products.filterMeta)
    const dispatch = useDispatch()
    const [sortFilterData, setSortFilterData] = useState(sortFilter)
    const [categoryData, setCategoryData] = useState([])
    const [sortRatingData, setRatingData] = useState(ratingFilter)
    const [filterLoading, setFilterLoading] = useState(false)
    const [sizeAndColorData, setSizeAndColorData] = useState({})
    const [selectedColor, setSelectedColor] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [selectedBudget, setSelectedBudget] = useState({ min: 0, max: 0 })
    const [selectedRating, setSelectedRating] = useState({})
    const [selectedSorting, setSelectedSorting] = useState({})
    const [selectedCategory, setSelectedCategory] = useState({})
    const [buttonActive, setButtonActive] = useState(true)
    const [loading, setLoading] = useState(false)


    const onPressSort = (it) => {
        const newArr = [...sortFilterData]
        const finalArray = newArr.map((item) => item._id == it._id ? { ...item, active: true } : { ...item, active: false })
        setSortFilterData(finalArray)
        setSelectedSorting(it)
    }


    const onPressColor = (it) => {
        const newObject = { ...sizeAndColorData }
        const finalArray = newObject.color.map((item) => {
            if (item._id == it._id) {
                if (it.active == true) {
                    const newArr = [...selectedColor]
                    setSelectedColor(newArr.filter((i) => i._id != it._id))
                    return { ...item, active: false }
                }
                else {
                    setSelectedColor([...selectedColor, { ...item, active: true }])
                    return { ...item, active: true }
                }
            }
            else {
                return { ...item }
            }
        })
        setSizeAndColorData({ ...newObject, color: finalArray })
    }

    const onPressSize = (it) => {
        const newObject = { ...sizeAndColorData }
        const finalArray = newObject.size.map((item) => {
            if (item._id == it._id) {
                if (it.active == true) {
                    const newArr = [...selectedSize]
                    setSelectedSize(newArr.filter((i) => i._id != it._id))
                    return { ...item, active: false }
                }
                else {
                    setSelectedSize([...selectedSize, { ...item, active: true }])
                    return { ...item, active: true }
                }
            }
            else {
                return { ...item }
            }
        })
        setSizeAndColorData({ ...newObject, size: finalArray })
    }

    const onPressBudget = (it) => {
        const newObject = { ...sizeAndColorData }
        const finalArray = newObject.price.map((item) => {
            if (item._id == it._id) {
                if (it.active == true) {
                    const newArr = [...selectedBudget]
                    setSelectedBudget(newArr.filter((i) => i._id != it._id))
                    return { ...item, active: false }
                }
                else {
                    setSelectedBudget([...selectedBudget, { ...item, active: true }])
                    return { ...item, active: true }
                }
            }
            else {
                return { ...item }
            }
        })
        setSizeAndColorData({ ...newObject, price: finalArray })
    }

    const onPressRating = (it) => {
        const newArr = [...sortRatingData]
        const finalArray = newArr.map((item) => item._id == it._id ? { ...item, active: true } : { ...item, active: false })
        setRatingData(finalArray)
        setSelectedRating(it)
    }


    const onPressCategory = (it) => {
        setSelectedSize([])
        setSelectedColor([])
        const categoryObject = { ...categoryData }
        // console.log(categoryObject.category[0].active)
        const newArray = categoryObject?.category.map((item) => item._id == it._id ? { ...item, active: true } : { ...item, active: false })
        setCategoryData({ ...categoryData, category: newArray })
    }

    const onSelectValue = (item, value) => {
        // console.log(item, 'item')
        // console.log(value, 'value')
        setButtonActive(false)
        setSelectedCategory(item)
        setFilterLoading(true)
        ProductsController.fetchSizeAndColorFromSubCategoryForFilters(item._id)
            .then((result) => {
                setFilterLoading(false)
                if (Object.keys(result).length > 0) {
                    const colorsModifiedObj = result.color.map((item) => ({ _id: Math.floor(Math.random() * 12345), title: item, value: item, active: false }))
                    const sizeModifiedObj = result.size.map((item) => ({ _id: Math.floor(Math.random() * 12345), title: item, value: item, active: false }))
                    const prizeModifiedObj = result.price.map((item) => ({ _id: Math.floor(Math.random() * 12345), title: item, value: item, active: false }))
                    const prizeFirstObj = { _id: Math.floor(Math.random() * 12345), title: "All", value: undefined, active: false }
                    prizeModifiedObj.unshift(prizeFirstObj)
                    setSizeAndColorData({ color: colorsModifiedObj, size: sizeModifiedObj, price: prizeModifiedObj })
                }
                else {
                    setSizeAndColorData({})
                }
            })
            .catch((error) => {
                setFilterLoading(false)
                console.log(error, 'fetchSizeAndColorFromSubCategory')
            })
    }


    useEffect(() => {
        if (filterMeta) {
            const allCategoriesModified = filterMeta?.category?.map((item) => ({ ...item, active: false }))
            setCategoryData({ ...filterMeta, category: allCategoriesModified })
        }
    }, [filterMeta])


    const valuePrepareForFilter = (array) => {
        return array.map((item) => item.value)
    }



    const onPressApply = () => {

        const prepareObj = {
            subCategoryId: selectedCategory?._id,
            size: valuePrepareForFilter(selectedSize),
            color: valuePrepareForFilter(selectedColor),
            // price:{min:200,max:500},
            price: undefined,
            rating: selectedRating?.value,
            sort: selectedSorting.value
        }
        console.log(prepareObj, '===>prepareObj')
        setLoading(true)
        ProductsController.filterProducts(prepareObj)
            .then((result) => {
                console.log(result.length, 'resultresult')
                dispatch(setAllProducts(result))
                setLoading(false)
                closeDrawer()
            })
            .catch((error) => {
                console.log(error, 'error in filterProducts')
                setLoading(false)
            })

    }



    return (
        <View style={styles.mainContainer}>
            <View style={{ height: StatusBarManager.HEIGHT }} />


            <View style={{ width: '90%', alignSelf: 'center' }}>
                <Text style={styles.textOne}>Filters</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <AbstractContentContainer>

                    <View style={{ marginTop: 20 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.textTwo}>Sort by</Text>
                        </View>
                        {sortFilterData.map((item, index) => {
                            return (
                                <RadioButton key={item._id} data={item} onPress={() => onPressSort(item)} />
                            )
                        })}
                    </View>

                    <View style={{ marginTop: 20 }}>
                        {/* <View style={{ marginBottom: 5 }}>
                            <Text style={styles.textTwo}>Categories</Text>
                        </View>
                        {sortCategoryData.map((item, index) => {
                            return (
                                <RadioButton key={item._id} data={item} onPress={() => onPressCategory(item)} />
                            )
                        })} */}
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.textTwo}>Categories</Text>
                        </View>
                        {Object.keys(categoryData).length > 0 ?
                            categoryData?.category?.map((item, index) => {
                                return (<AbstractDropDown item={item} key={item._id} onPress={() => onPressCategory(item)} onSelectValue={onSelectValue} />)
                            })
                            : false}
                    </View>


                    {filterLoading ?
                        <View style={{ width: '100%', height: 160, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={"large"} color={Colors.primaryBlue} />
                        </View>
                        :
                        Object.keys(sizeAndColorData).length > 0 ?
                            <>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={styles.textTwo}>Color</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        {sizeAndColorData.color.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={item._id}
                                                    onPress={() => onPressColor(item)}
                                                    style={{ marginRight: 10 }}
                                                >
                                                    <View style={{ width: 32, height: 32, borderRadius: 35, backgroundColor: item.title, borderWidth: item.active ? 1.3 : 0, borderColor: item.active ? Colors.primaryBlue : "transparent", justifyContent: "center", alignItems: 'center' }} >
                                                        {item.active ?
                                                            <View style={{ width: 10, height: 10, backgroundColor: Colors.primaryBlue, borderRadius: 15 }} />
                                                            : false}
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>


                                <View style={{ marginTop: 20 }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={styles.textTwo}>Size</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        {sizeAndColorData.size.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={item._id}
                                                    onPress={() => onPressSize(item)}
                                                    style={{ marginRight: 10 }}
                                                >
                                                    <View style={{ width: 32, height: 32, borderRadius: 35, backgroundColor: Colors.primaryGray, borderWidth: item.active ? 1.3 : 0, borderColor: item.active ? Colors.primaryBlack : "transparent", justifyContent: 'center', alignItems: 'center' }} >
                                                        <Text style={[styles.textTwo, { fontFamily: Fonts.semiBold, fontSize: 13 }]}>{item.title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>

                                {/* <View style={{ marginTop: 20 }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={styles.textTwo}>Budget</Text>
                                    </View>
                                    {sizeAndColorData.price.map((item, index) => {
                                        return (
                                            <RadioButton key={item._id} data={item} onPress={() => onPressBudget(item)} />
                                        )
                                    })}
                                </View> */}
                            </>
                            : false
                    }





                    <View style={{ marginTop: 20 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.textTwo}>Rating</Text>
                        </View>
                        {sortRatingData.map((item, index) => {
                            return (
                                <RadioButton stars key={item._id} data={item} onPress={() => onPressRating(item)} />
                            )
                        })}
                    </View>


                    <View style={{ width: '100%', height: 120 }} />
                </AbstractContentContainer>
            </ScrollView>

            <View style={{ position: "absolute", bottom: 0, right: 0, left: 0, paddingBottom: 30, backgroundColor: Colors.primaryWhite }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <AbstractButton onPress={onPressApply} disabled={buttonActive} loaderColor={Colors.primaryWhite} processing={loading} width={"100%"} label={"Apply"} txtColor={Colors.primaryWhite} />
                </View>

            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    textOne: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: Colors.primaryBlue
    },
    textTwo: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: Colors.primaryGrayOne
    },
})