import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {s, ms, vs} from 'react-native-size-matters';
import RecentlyPlayed from '../components/RecentlyPlayed';
import SongsList from '../components/SongsList';

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.screenHeading}>Home</Text>
        <RecentlyPlayed />
        <SongsList />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: s(10),
  },
  screenHeading: {
    color: '#FBFBFB',
    fontSize: vs(30),
    fontWeight: 'semibold',
  },
});
