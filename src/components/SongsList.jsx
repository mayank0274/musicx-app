import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s, ms, vs} from 'react-native-size-matters';
var RNFS = require('react-native-fs');
import {
  getAll,
  getAlbums,
  searchSongs,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
var RNFS = require('react-native-fs');

const SongCard = () => {
  return (
    <View style={styles.songCard}>
      <Image
        source={{
          uri: 'https://wallpaperaccess.com/full/6852770.jpg',
        }}
        style={styles.songImg}
      />
      <View style={{width: '40%'}}>
        <Text style={[styles.songName]} numberOfLines={1}>
          Rattan Lambiyan
        </Text>
        <Text style={[styles.songArtist]} numberOfLines={1}>
          {' '}
          by Tanishk Bagchi , Javed Mohsinhhhjjjjjjjjjjjjjjjjj
        </Text>
      </View>

      <FontAwesomeIcon icon={faEllipsisVertical} color="#8B8B8Bff" size={20} />
    </View>
  );
};

const SongsList = () => {
  const [songs, setSongs] = useState([1, 2, 3, 4, 5, 6]);
  // (async () => {
  //   const files = await RNFS.readDir(RNFS.DownloadDirectoryPath);

  //   files.forEach(file => {
  //     if (file.name.includes('.mp3')) {
  //       console.log(file.name);
  //       setSongs([...songs, file]);
  //     }
  //   });
  // })();

  (async () => {
    try {
      // const songsOrError = await getAlbums({artist: 'akhil'});
      // console.log(songsOrError);
      // // error
      // if (typeof songsOrError === 'string') {
      //   // do something with the error
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  })();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Songs</Text>
      <FlatList
        contentContainerStyle={{width: '100%'}}
        data={songs}
        renderItem={({item, index}) => <SongCard key={index} />}
        scrollEnabled={false}
      />
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
    justifyContent: 'space-around',
  },
  songImg: {
    width: s(100),
    height: s(90),
    borderRadius: 2,
  },
  songName: {
    color: '#FBFBFB',
    fontSize: ms(18),
    width: '100%',
  },
  songArtist: {
    color: '#8B8B8Bff',
    fontSize: ms(14),
    width: '100%',
  },
});
