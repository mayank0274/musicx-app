import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {
  usePlaybackState,
  State,
  PlaybackState,
} from 'react-native-track-player';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import {s} from 'react-native-size-matters';

interface Props {
  iconSize?: number;
}

const ControlCenter = ({iconSize}: Props) => {
  const playBackState = usePlaybackState();

  // next btn
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // previous btn
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // toggle play/pause
  const togglePlayPause = async (
    playBackState:
      | PlaybackState
      | {
          state: undefined;
        },
  ) => {
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (currentTrack !== null) {
      if (
        playBackState.state === State.Paused ||
        playBackState.state === State.Ready
      ) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={skipToPrevious}
        style={{display: iconSize ? 'none' : 'flex'}}>
        <FontAwesomeIcon
          icon={faBackwardStep}
          size={iconSize ? iconSize : 30}
          color="#FBFBFB"
        />
      </Pressable>

      <Pressable onPress={() => togglePlayPause(playBackState)}>
        <FontAwesomeIcon
          icon={playBackState.state === State.Playing ? faPause : faPlay}
          size={iconSize ? iconSize : 50}
          color="#FBFBFB"
        />
      </Pressable>

      <Pressable
        onPress={skipToNext}
        style={{display: iconSize ? 'none' : 'flex'}}>
        <FontAwesomeIcon
          icon={faForwardStep}
          size={iconSize ? iconSize : 30}
          color="#FBFBFB"
        />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
