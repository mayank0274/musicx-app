import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {s, ms, vs} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {Track} from 'react-native-track-player';

const RecentlyPlayed = ({track}: {track: Track}) => {
  const playSong = async () => {
    await TrackPlayer.skip(track?.index);
    await TrackPlayer.play();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: track.artwork,
        }}
        style={styles.coverImg}
      />
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.0)',
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.9)',
        ]}
        style={styles.btnContainer}>
        <Text style={styles.songName} numberOfLines={1}>
          {track.title}
        </Text>
        <TouchableOpacity style={styles.playBtn} onPress={playSong}>
          <FontAwesomeIcon icon={faPlay} color="#FBFBFB" size={ms(15)} />
          <Text style={styles.btnText}>Listen now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default RecentlyPlayed;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: s(300),
  },
  coverImg: {
    width: s(300),
    height: s(300),
    borderRadius: 10,
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0.1,
    height: vs(150),
    display: 'flex',
    justifyContent: 'flex-end',
    paddingHorizontal: ms(15),
    flexDirection: 'column',
    gap: 10,
    borderRadius: 10,
  },
  playBtn: {
    backgroundColor: '#F62846ff',
    width: '45%',
    padding: ms(8),
    borderRadius: 5,
    display: 'flex',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  btnText: {
    color: '#FBFBFB',
    fontSize: ms(17),
  },
  songName: {
    color: '#FBFBFB',
    fontSize: vs(25),
    width: s(280),
  },
});
