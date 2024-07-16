import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Home from './src/screens/Home';
import {s, ms, vs} from 'react-native-size-matters';
import Albums from './src/screens/Albums';
import Favourites from './src/screens/Favourites';
import MusicParty from './src/screens/MusicParty';
import {TabView, SceneMap} from 'react-native-tab-view';
import {
  faCompactDisc,
  faHeart,
  faHome,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import BottomNavigation from './src/components/BottomNavigation';

const renderScene = ({route}: {route: any}) => {
  switch (route.key) {
    case 'home':
      return <Home />;
    case 'albums':
      return <Albums />;
    case 'favourites':
      return <Favourites />;
    case 'musicParty':
      return <MusicParty />;
    default:
      return null;
  }
};

const App = () => {
  const [selectedIndex, setSlectedIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'home', title: 'Home', icon: faHome},
    {key: 'albums', title: 'Albums', icon: faMusic},
    {key: 'favourites', title: 'Favourites', icon: faHeart},
    {key: 'musicParty', title: 'Music Party', icon: faCompactDisc},
  ]);
  return (
    <SafeAreaView style={styles.app}>
      <TabView
        lazy={true}
        tabBarPosition="bottom"
        navigationState={{index: selectedIndex, routes}}
        renderScene={renderScene}
        renderTabBar={props => {
          return (
            <BottomNavigation
              navigationProps={props}
              setSlectedIndex={setSlectedIndex}
              selectedIndex={selectedIndex}
            />
          );
        }}
        onIndexChange={x => setSlectedIndex(x)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#151519ff',
    // padding: s(10),
  },
});

export default App;
