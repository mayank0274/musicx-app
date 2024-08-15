import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDown, faHeart} from '@fortawesome/free-solid-svg-icons';
import useMusicStore from '../../appStore/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Track} from 'react-native-track-player';
var RNFS = require('react-native-fs');

interface Props {
  toggleMusicModal: () => void;
  track: Track;
}

const PlayerHeader = ({toggleMusicModal, track}: Props) => {
  const {favouriteSongs, setFavouriteSongs, removeFromFavourites} =
    useMusicStore();

  const isFavourite = favouriteSongs.filter((song: Track) => {
    return song.url === track.url;
  });

  const addToFavourites = useCallback(async () => {
    try {
      if (isFavourite.length > 0) {
        removeFromFavourites(track.url);
        return;
      }
      // Create the cache directory path
      const cacheDir = RNFS.CachesDirectoryPath;
      const filePath = track.artwork?.startsWith('https')
        ? track.artwork
        : `file://${cacheDir}/${track.title}.png`;

      setFavouriteSongs([{...track, artwork: filePath}]);
      await AsyncStorage.setItem(
        'favourites-songs',
        JSON.stringify([...favouriteSongs, {...track, artwork: filePath}]),
      );

      if (!filePath.startsWith('https') && !(await RNFS.exists(filePath))) {
        const data = track.artwork!.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          '',
        );

        RNFS.writeFile(filePath, data, 'base64')
          .then(() => {
            console.log('Image saved successfully');
          })
          .catch((error: any) => {
            console.error('Error saving image:', error);
            throw error;
          });
      }
    } catch (error: any) {
      console.log('add to favourites : ', error?.message);
    }
  }, [track]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={toggleMusicModal}>
        <FontAwesomeIcon icon={faAngleDown} color="#FFF" size={20} />
      </Pressable>

      <Pressable style={styles.btn} onPress={addToFavourites}>
        <FontAwesomeIcon
          icon={faHeart}
          color={isFavourite.length > 0 ? 'red' : '#fff'}
          size={19}
        />
      </Pressable>
    </View>
  );
};

export default PlayerHeader;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
  },
});
