import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';

interface SongInfoProps {
  track: any | null | undefined;
}

const SongInfo = ({track}: SongInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.songName} numberOfLines={1}>
        {track?.title}
      </Text>
      <Text style={styles.songArtist} numberOfLines={1}>
        {track?.artist || 'Unknown artist'} {track?.album && `-${track?.album}`}
      </Text>
    </View>
  );
};

export default SongInfo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  songName: {
    color: '#FBFBFB',
    fontSize: ms(19),
    width: '80%',
    textAlign: 'center',
  },
  songArtist: {
    color: '#8B8B8Bff',
    fontSize: ms(14),
    width: '80%',
    textAlign: 'center',
  },
});
