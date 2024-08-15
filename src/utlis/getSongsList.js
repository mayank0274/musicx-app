var RNFS = require('react-native-fs');
import MediaMeta from 'react-native-media-meta';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSongsList = async (invalidateCache = false) => {
  try {
    const cachedSongs = JSON.parse(await AsyncStorage.getItem('songs-data'));

    if (cachedSongs && !invalidateCache) {
      return cachedSongs;
    }

    const files = await RNFS.readDir(`${RNFS.DownloadDirectoryPath}/music`);
    const songs = [];
    const cacheDir = RNFS.CachesDirectoryPath;

    for (let i = 0; i < files.length; i++) {
      const filePath = files[i].path;
      const info = await MediaMeta.get(filePath);
      const imageFilePath = `file://${cacheDir}/${info?.title}.png`;
      let imageUrl = '';

      if (info?.thumb && !(await RNFS.exists(imageFilePath))) {
        await RNFS.writeFile(imageFilePath, info.thumb, 'base64');
      } else {
        imageUrl =
          'https://cdn.saleminteractivemedia.com/shared/images/default-cover-art.png';
      }

      const song = {
        artist: info?.artist || '',
        album: info?.album || '',
        title: info?.title || files[i].name,
        url: filePath,
        id: filePath,
        artwork: info?.thumb ? imageFilePath : imageUrl,
        duration: info?.duration,
      };

      songs.push(song);
    }

    await AsyncStorage.setItem('songs-data', JSON.stringify(songs));
    return songs;
  } catch (error) {
    console.log('reading song files', error?.message);
  }
};
