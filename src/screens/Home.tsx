import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s, ms, vs} from 'react-native-size-matters';
import RecentlyPlayed from '../components/RecentlyPlayed';
import SongsList from '../components/SongsList';
import useMusicStore from '../appStore/store';
import {getSongsList} from '../utlis/getSongsList';
import {addTracks, setupPlayer} from '../../musicPlayerService';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkMultiple,
  PERMISSIONS,
  type PermissionStatus,
} from 'react-native-permissions';
import MusicFetchSplashScreen from '../components/MusicFetchSplashScreen';

const Home = () => {
  const {
    setSongsData,
    setIsPlayerReady,
    setFavouriteSongs,
    songsData,
    setTrack,
  } = useMusicStore();
  const [isPermissiongranted, setIsPermissiongranted] = useState(false);
  const [lastPlayedSong, setLastPlayedSong] = useState<null | Track>(null);

  // inital setup for music players
  async function setup() {
    try {
      let isSetup = await setupPlayer();

      if (isSetup) {
        setIsPlayerReady(isSetup);

        const songs = await getSongsList();
        setSongsData(songs);
        await addTracks(songs as Track[]);
        const lastPlayedSong = await AsyncStorage.getItem('last-played');
        setLastPlayedSong(JSON.parse(lastPlayedSong!) as Track);
      }
    } catch (error: any) {
      console.log('setup', error.message);
    }
  }

  // set favourite songs
  async function getFavouritesSongs() {
    const favourites =
      JSON.parse((await AsyncStorage.getItem('favourites-songs')) as string) ||
      [];
    setFavouriteSongs(favourites);
  }

  // chack if permission granted or not
  useEffect(() => {
    checkMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      const isGranted =
        statuses['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
        statuses['android.permission.READ_EXTERNAL_STORAGE'] === 'granted';

      if (isGranted) {
        setIsPermissiongranted(true);
      }
    });
  }, []);

  // if permission granted setup player
  useEffect(() => {
    if (isPermissiongranted) {
      setup();
      getFavouritesSongs();
    }
  }, [isPermissiongranted]);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const playingTrack = await TrackPlayer.getActiveTrack();
        setTrack(playingTrack);
        await AsyncStorage.setItem(
          'last-played',
          JSON.stringify({...playingTrack, index: event.index}),
        );
        break;
    }
  });

  return (
    <ScrollView>
      {isPermissiongranted ? (
        <View style={styles.container}>
          <Text style={styles.screenHeading}>MusicX</Text>
          {lastPlayedSong && <RecentlyPlayed track={lastPlayedSong} />}
          <SongsList />
        </View>
      ) : (
        <MusicFetchSplashScreen
          setIsPermissiongranted={setIsPermissiongranted}
        />
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: s(10),
  },
  screenHeading: {
    color: '#FBFBFB',
    fontSize: vs(30),
    fontWeight: 'semibold',
  },
});
