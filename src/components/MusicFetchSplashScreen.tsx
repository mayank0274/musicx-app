import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCompactDisc, faMusic} from '@fortawesome/free-solid-svg-icons';
import {getSongsList} from '../utlis/getSongsList';
import {ms, s, vs} from 'react-native-size-matters';
import useMusicStore from '../appStore/store';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import LOGO from '../assets/logo2.png';

interface Props {
  setIsPermissiongranted: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicFetchSplashScreen = ({setIsPermissiongranted}: Props) => {
  const [loading, setLoading] = useState(false);
  const {setSongsData} = useMusicStore();

  async function initialize() {
    try {
      let permission = await requestMultiple([
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ]);

      if (
        permission['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        permission['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        setLoading(true);
        let songs = await getSongsList();
        setIsPermissiongranted(true);
      }
    } catch (error: any) {
      console.log('initializing : ', error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.heading}>MusicX</Text>
        <Image source={LOGO} style={styles.logo} />
        <Text style={styles.infoText}>
          Welcome , to musicX to get started we need to scan your device for
          music files . Click below button to get started
        </Text>
        <TouchableOpacity style={styles.btn} onPress={initialize}>
          <Text style={{fontSize: 20, color: '#fff'}}>
            {' '}
            {loading ? 'Loading...' : 'Scan'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MusicFetchSplashScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    backgroundColor: '#000',
  },
  heading: {
    color: '#FBFBFB',
    fontSize: ms(40),
    position: 'absolute',
    top: 20,
  },
  infoText: {
    fontSize: ms(20),
    textAlign: 'center',
    color: '#fff',
    width: '94%',
  },
  btn: {
    padding: 12,
    color: '#FBFBFB',
    backgroundColor: 'rgba(246, 40, 70, 1)',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    width: s(150),
    height: vs(150),
    objectFit: 'contain',
  },
});
