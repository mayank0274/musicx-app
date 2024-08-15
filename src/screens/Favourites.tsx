import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SongCard} from '../components/SongsList';
import {ms, s, vs} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import useMusicStore from '../appStore/store';
import {addTracks} from '../../musicPlayerService';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

const Favourites = () => {
  const {
    isPalyerReady,
    setTrack,
    setIsMusicModalOpen,
    favouriteSongs,
    setIsSongSelectedByUser,
  } = useMusicStore();
  const playBackState = usePlaybackState();

  // play specific song
  const playSong = useCallback(
    async (songIndex: number) => {
      if (isPalyerReady) {
        await TrackPlayer.setQueue(favouriteSongs);
        setIsSongSelectedByUser(true);
        const targetedTrack = await TrackPlayer.getTrack(songIndex);

        if (
          playBackState.state === State.Playing ||
          playBackState.state === State.Ready
        ) {
          TrackPlayer.pause();
        }

        setIsMusicModalOpen(true);
        setTrack(targetedTrack);
        TrackPlayer.skip(songIndex);
      }
    },
    [isPalyerReady],
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Favourites Songs</Text>
        {favouriteSongs.length === 0 && (
          <Text style={[styles.heading, {fontSize: s(20)}]}>
            No songs found
          </Text>
        )}
        <FlatList
          contentContainerStyle={{width: '100%'}}
          data={favouriteSongs}
          renderItem={({item, index}) => (
            <SongCard
              key={index}
              song={item}
              songIndex={index}
              playSong={playSong}
            />
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '100%',
    padding: s(10),
  },
  heading: {
    fontSize: s(25),
    color: '#FBFBFB',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  banner: {
    display: 'flex',
    height: vs(80),
    padding: s(10),
    borderRadius: 4,
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'center',
  },
  bannerBtn: {
    backgroundColor: '#F62846ff',
    width: '49%',
    padding: ms(9),
    borderRadius: 5,
    display: 'flex',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FBFBFB',
    fontSize: ms(17),
  },
});
