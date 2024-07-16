import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

interface Props {
  navigationProps: any;
  selectedIndex: number;
  setSlectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const BottomNavigation: React.FC<Props> = ({
  navigationProps,
  selectedIndex,
  setSlectedIndex,
}) => {
  // console.log(navigationProps);
  return (
    <View style={[styles.bottomNavigation]}>
      {navigationProps.navigationState.routes.map((route: any, i: number) => {
        return (
          <Pressable
            key={i}
            style={styles.navigationItem}
            onPress={() => {
              setSlectedIndex(i);
            }}>
            <View
              style={[
                styles.tabIcon,
                {
                  backgroundColor:
                    selectedIndex != i ? 'transparent' : '#F62846ff',
                },
              ]}>
              <FontAwesomeIcon icon={route.icon} color="#E9EDE3" size={22} />
            </View>
            <Text style={styles.navigationText}>{route.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNavigation: {
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: '#111B21',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  navigationItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationText: {
    color: '#E9EDE3',
    fontSize: 15,
  },
  tabIcon: {
    backgroundColor: '#52CD60',
    paddingHorizontal: 15,
    borderRadius: 18,
    paddingVertical: 5,
  },
});
