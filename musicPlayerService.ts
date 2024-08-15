import TrackPlayer, {
  Event,
  RepeatMode,
  AppKilledPlaybackBehavior,
  Capability,
  Track,
} from 'react-native-track-player';

export async function playBackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}

export async function setupPlayer() {
  let isSetup = false;
  try {
    let activeTrack = await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch (error: any) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
    console.log('setupPlayer : ', error.message);
  } finally {
    if (isSetup) {
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
          alwaysPauseOnInterruption: true,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    }
    return isSetup;
  }
}

export async function addTracks(songs: Track[]) {
  try {
    await TrackPlayer.add(songs);

    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (error: any) {
    console.log('add', error?.message);
  }
}
