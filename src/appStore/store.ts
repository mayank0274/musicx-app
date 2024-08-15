import {Track} from 'react-native-track-player';
import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MusicStoreData {
  track: Track | null | undefined;
  isPalyerReady: boolean;
  isMusicModalOpen: boolean;
  songsData: Track[];
  favouriteSongs: Track[];
  isSongSelectedByUser: boolean;
  setSongsData: (songs: Track[]) => void;
  setTrack: (newTrack: Track | undefined) => void;
  setIsPlayerReady: (isReady: boolean) => void;
  setIsMusicModalOpen: (isOpen: boolean) => void;
  setFavouriteSongs: (songs: Track[]) => void;
  setIsSongSelectedByUser: (isSelectedByUser: boolean) => void;
  removeFromFavourites: (url: string) => void;
}

const useMusicStore = create<MusicStoreData>(set => ({
  track: null,
  isMusicModalOpen: false,
  isPalyerReady: false,
  songsData: [],
  favouriteSongs: [],
  isSongSelectedByUser: false,
  setSongsData(songs) {
    set(state => ({
      songsData: songs,
    }));
  },
  setTrack(newTrack) {
    set(state => ({
      track: newTrack,
    }));
  },
  setIsPlayerReady(isReady) {
    set(state => ({
      isPalyerReady: isReady,
    }));
  },
  setIsMusicModalOpen(isOpen) {
    set(state => ({
      isMusicModalOpen: isOpen,
    }));
  },
  setFavouriteSongs(songs) {
    set(state => ({
      favouriteSongs: [...state.favouriteSongs, ...songs],
    }));
  },
  setIsSongSelectedByUser(isSelectedByUser) {
    set(state => ({
      isSongSelectedByUser: isSelectedByUser,
    }));
  },
  removeFromFavourites(url) {
    set(state => ({
      favouriteSongs: state.favouriteSongs.filter((song: Track) => {
        return song.url != url;
      }),
    }));
  },
}));

export default useMusicStore;
