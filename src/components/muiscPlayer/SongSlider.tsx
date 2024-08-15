import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {ms} from 'react-native-size-matters';

const SongSlider = () => {
  const {position, duration} = useProgress();

  async function seekSong(position: number) {
    await TrackPlayer.seekTo(position);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.songTimeInfo}>
        {new Date(position * 1000).toISOString().substring(15, 19)}
      </Text>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#F62846ff"
        maximumTrackTintColor="#fff"
        minimumTrackTintColor={'#F62846ff'}
        style={{width: '70%'}}
        onSlidingComplete={(value: number) => {
          seekSong(value);
        }}
      />
      <Text style={styles.songTimeInfo}>
        {new Date((duration - position) * 1000).toISOString().substring(15, 19)}
      </Text>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songTimeInfo: {
    color: '#8B8B8Bff',
    fontSize: ms(15),
  },
});
