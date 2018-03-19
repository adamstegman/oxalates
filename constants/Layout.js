import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  header: {
    fontSize: 38,
    height: 64,
  },
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
