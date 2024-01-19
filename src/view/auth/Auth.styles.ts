import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: wp(8),
    color: 'orange',
  },
  containerTouchable: {
    width: wp(30),
    height: hp(5),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(5),
  }
});
