import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useMusicStore from '../appStore/store';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import ControlCenter from './muiscPlayer/ControlCenter';
import {s, vs} from 'react-native-size-matters';

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
  const playBackState = usePlaybackState();
  const {songsData, favouriteSongs, track, setIsMusicModalOpen} =
    useMusicStore();

  async function changeSongState(tabIndex: number) {
    if (tabIndex === 0) {
      await TrackPlayer.setQueue(songsData);
    } else if (tabIndex === 1) {
      await TrackPlayer.setQueue(favouriteSongs);
    }

    await TrackPlayer.stop();
  }

  return (
    <View style={[styles.bottomNavigationContainer]}>
      {(playBackState.state === State.Paused ||
        playBackState.state === State.Playing) && (
        <Pressable
          style={styles.bottomPlayer}
          onPress={() => setIsMusicModalOpen(true)}>
          <Text numberOfLines={1} style={styles.track}>
            {track?.title}
          </Text>
          <View style={{width: '10%'}}>
            <ControlCenter iconSize={22} />
          </View>
        </Pressable>
      )}
      <View style={styles.bottomNavigation}>
        {navigationProps.navigationState.routes.map((route: any, i: number) => {
          return (
            <Pressable
              key={i}
              style={styles.navigationItem}
              onPress={() => {
                setSlectedIndex(i);
                changeSongState(i);
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
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNavigationContainer: {
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: '#111B21',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 10,
    gap: 15,
    alignItems: 'center',
  },
  bottomNavigation: {
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: '#111B21',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  bottomPlayer: {
    display: 'flex',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(246, 40, 70, 0.4)',
    padding: vs(13),
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  track: {
    color: '#FBFBFB',
    width: '75%',
    fontSize: s(16),
  },
});
