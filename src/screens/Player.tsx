import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s, vs} from 'react-native-size-matters';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  Track,
} from 'react-native-track-player';
import SongInfo from '../components/muiscPlayer/SongInfo';
import SongSlider from '../components/muiscPlayer/SongSlider';
import ControlCenter from '../components/muiscPlayer/ControlCenter';
import {setupPlayer, addTracks} from '../../musicPlayerService';
import PlayerHeader from '../components/muiscPlayer/PlayerHeader';
import useMusicStore from '../appStore/store';
import LinearGradient from 'react-native-linear-gradient';

const Player = () => {
  const {
    setIsMusicModalOpen,
    isMusicModalOpen,
    isPalyerReady,
    track,
    setTrack,
  } = useMusicStore();

  // play song
  useEffect(() => {
    if (track && isPalyerReady) {
      TrackPlayer.play();
    }
  }, [track]);

  const toggleMusicModal = () => {
    setIsMusicModalOpen(!isMusicModalOpen);
  };

  if (!track?.artwork || !isPalyerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isMusicModalOpen}
      onRequestClose={() => {
        toggleMusicModal();
      }}>
      <LinearGradient
        // colors={['#09555c', '#0a192f']}
        colors={['#001d23', '#001d23']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <PlayerHeader toggleMusicModal={toggleMusicModal} track={track} />
        <Image
          style={styles.songCover}
          source={{
            uri: track?.artwork.startsWith('/data/user/')
              ? `file://${track.artwork}`
              : track.artwork,
          }}
        />
        <SongInfo track={track} />
        <SongSlider />
        <ControlCenter />
      </LinearGradient>
    </Modal>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 30,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: vs(30),
  },
  songCover: {
    width: '80%',
    height: '45%',
    borderRadius: 5,
  },
});
