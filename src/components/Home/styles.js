import { StyleSheet } from 'react-native';
import Colors from 'helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
  },
  scrollView : {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    maxHeight: 250,
  },
  movieItem : {
    marginLeft: 15,
    marginRight: 15,
  }
});

export default styles;
