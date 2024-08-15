import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {s, ms} from 'react-native-size-matters';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical, faL} from '@fortawesome/free-solid-svg-icons';
import useMusicStore from '../appStore/store';
import TrackPlayer, {
  usePlaybackState,
  State,
  Track,
} from 'react-native-track-player';
import Player from '../screens/Player';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import SongOptions from './SongOptions';
import RBSheet, {RBSheetRef} from 'react-native-raw-bottom-sheet';
import {getSongsList} from '../utlis/getSongsList';

interface SongCardProps {
  song: Track;
  songIndex: number;
  playSong: (songIndex: number) => Promise<void>;
  handleOpenSongOptions?: () => void;
}

export const SongCard = ({
  song,
  songIndex,
  playSong,
  handleOpenSongOptions,
}: SongCardProps) => {
  const refRBSheet = useRef<RBSheetRef>(null);
  return (
    <View style={styles.songCard}>
      <Pressable onPress={() => playSong(songIndex)} style={styles.songInfo}>
        <Image
          source={{
            uri: song.artwork,
          }}
          style={styles.songImg}
        />
        <View style={{width: '55%'}}>
          <Text style={[styles.songName]} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={[styles.songArtist]} numberOfLines={1}>
            {song?.artist ? song?.artist : 'Unknown artist'}
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => refRBSheet.current?.open()}>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          color="#8B8B8Bff"
          size={20}
        />
      </Pressable>
      <SongOptions refRBSheet={refRBSheet} fileUrl={song.url} />
    </View>
  );
};

const SongsList = () => {
  const {
    isPalyerReady,
    setTrack,
    setIsMusicModalOpen,
    songsData,
    isMusicModalOpen,
    setIsSongSelectedByUser,
    setSongsData,
  } = useMusicStore();
  const playBackState = usePlaybackState();
  const [isRefreshingSongs, setIsRefreshingSongs] = useState<boolean>(false);

  // play specific song
  const playSong = useCallback(
    async (songIndex: number) => {
      try {
        if (isPalyerReady) {
          const targetedTrack = await TrackPlayer.getTrack(songIndex);
          setIsSongSelectedByUser(true);
          if (
            playBackState.state === State.Playing ||
            playBackState.state === State.Ready
          ) {
            TrackPlayer.stop();
          }

          setIsMusicModalOpen(true);
          setTrack(targetedTrack);
          await TrackPlayer.skip(songIndex);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [isPalyerReady],
  );

  // refrsh songlist
  const refreshSongList = async () => {
    try {
      setIsRefreshingSongs(true);
      // invalidateCache = true
      const songs = await getSongsList(true);
      setSongsData(songs);
      await TrackPlayer.setQueue(songs);
    } catch (error: any) {
      console.log(`refrshing song list : ` + error.message);
    } finally {
      setIsRefreshingSongs(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>Songs</Text>
        <Text
          onPress={refreshSongList}
          style={[styles.heading, {fontSize: s(14)}]}>
          {isRefreshingSongs ? 'Loading songs...' : 'Refresh list'}
        </Text>
      </View>
      {songsData?.length === 0 ? (
        <Text style={{color: '#fff'}}>Songs not found!!</Text>
      ) : (
        <FlatList
          contentContainerStyle={{width: '100%'}}
          data={songsData}
          renderItem={({item, index}) => {
            return (
              <SongCard
                key={item.path}
                song={{...item}}
                songIndex={index}
                playSong={playSong}
              />
            );
          }}
          scrollEnabled={false}
        />
      )}
      {isMusicModalOpen && <Player />}
    </View>
  );
};

export default SongsList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '100%',
  },
  heading: {
    fontSize: s(20),
    color: '#FBFBFB',
  },
  songCard: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    marginVertical: ms(10),
    // justifyContent: 'space-around',
  },
  songInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  songImg: {
    width: s(90),
    height: s(80),
    borderRadius: 2,
  },
  songName: {
    color: '#FBFBFB',
    fontSize: ms(20),
    width: '100%',
  },
  songArtist: {
    color: '#8B8B8Bff',
    fontSize: ms(17),
    width: '100%',
  },
});
