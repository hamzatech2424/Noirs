import React from 'react';
import { View } from 'react-native';
import AbstractBottomTabButton from '../Components/AbstractComponents/abstractBottomTabButton';
import HomeSvg from '../Assets/Icons/BottomTabSvgs/homeSvg'
import CategorySvg from '../Assets/Icons/BottomTabSvgs/categorySvg'
import NotificationSvg from '../Assets/Icons/BottomTabSvgs/notificationSvg'
import WishListSvg from '../Assets/Icons/BottomTabSvgs/wishListSvg'
import SettingSvg from '../Assets/Icons/BottomTabSvgs/settingSvg'
import { Colors } from '../theme';

const ICONS_SIZE = 25

const CustomBottomTabBar = ({ state, descriptors, navigation }) => {

  return (
    <View
      style={{
        height: 95,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        style={{
          flex: 1,
          height: '100%',
          flexDirection: 'row',
          backgroundColor: Colors.primaryWhite,
          zIndex: 1,
          borderTopColor: Colors.primaryGray,
          borderTopWidth: 0.5,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          switch (route.name) {
            case 'Home':
              return (
                <AbstractBottomTabButton
                  svg={() => <HomeSvg size={ICONS_SIZE} isFocused={isFocused} />}
                  onPress={onPress}
                  key={route.key}
                  isFocused={isFocused}
                  label={"Home"}
                />
              );
            case 'Category':
              return (
                <AbstractBottomTabButton
                  svg={() => <CategorySvg size={ICONS_SIZE} isFocused={isFocused} />}
                  onPress={onPress}
                  key={route.key}
                  isFocused={isFocused}
                  label={"Categories"}
                />
              );
            case 'WishList':
              return (
                <AbstractBottomTabButton
                  svg={() => <WishListSvg size={ICONS_SIZE} isFocused={isFocused} />}
                  onPress={onPress}
                  key={route.key}
                  isFocused={isFocused}
                  label={"Wishlist"}
                />
              );
            case 'Notification':
              return (
                <AbstractBottomTabButton
                  svg={() => <NotificationSvg size={ICONS_SIZE} isFocused={isFocused} />}
                  onPress={onPress}
                  key={route.key}
                  isFocused={isFocused}
                  label={"Notification"}
                />
              );
            case 'Settings':
              return (
                <AbstractBottomTabButton
                  svg={() => <SettingSvg size={ICONS_SIZE} isFocused={isFocused} />}
                  onPress={onPress}
                  key={route.key}
                  isFocused={isFocused}
                  label={"Settings"}
                />
              );
            default:
              return false;
          }
        })}
      </View>
    </View>
  );
};

export default CustomBottomTabBar;