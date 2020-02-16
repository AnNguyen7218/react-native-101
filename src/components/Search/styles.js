import { StyleSheet } from 'react-native'
import Colors from 'helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  scrollView : {
    flex: 1,
    padding: 10
  },
  movieItem: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  wrapInfo: {
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  overview: {
    fontSize: 16,
    color: '#1a2330',
  },
  published: {
    color: '#768498'
  }
});

export default styles;