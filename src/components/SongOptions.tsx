import {faShare, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import RBSheet, {RBSheetRef} from 'react-native-raw-bottom-sheet';
import {ms} from 'react-native-size-matters';
import Share from 'react-native-share';

export default function SongOptions({
  refRBSheet,
  fileUrl,
}: {
  refRBSheet: React.RefObject<RBSheetRef>;
  fileUrl: string;
}) {
  // share dong
  function shareSong() {
    Share.open({
      message: 'audio file',
      url: `file://${fileUrl}`,
      type: 'audio/*',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  return (
    <View style={{flex: 1}}>
      <RBSheet
        ref={refRBSheet}
        height={100}
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
        draggable>
        <View style={styles.optionsContainer}>
          <Pressable style={styles.btn} onPress={shareSong}>
            <FontAwesomeIcon icon={faShareAlt} size={20} />
            <Text style={styles.optionName}>Share file</Text>
          </Pressable>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  optionName: {
    color: '#000',
    fontSize: ms(20),
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
});
