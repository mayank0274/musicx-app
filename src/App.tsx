import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Home from './screens/Home';
import Favourites from './screens/Favourites';
import {TabView} from 'react-native-tab-view';
import {
  faCompactDisc,
  faHeart,
  faHome,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import BottomNavigation from './components/BottomNavigation';

const renderScene = ({route}: {route: any}) => {
  switch (route.key) {
    case 'home':
      return <Home />;
    case 'favourites':
      return <Favourites />;
    default:
      return null;
  }
};

const App = () => {
  const [selectedIndex, setSlectedIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'home', title: 'Home', icon: faHome},
    {key: 'favourites', title: 'Favourites', icon: faHeart},
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
