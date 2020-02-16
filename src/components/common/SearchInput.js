import React, {useRef} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

import TextField from '../common/TextField';
import strings from 'localization';

const styles = StyleSheet.create({
  searchInpWrapper: {
    position: 'relative',
    justifyContent: 'flex-start',
    maxHeight: 150,
  },
  clearBtn: {
    position: 'absolute',
    top: 12.5,
    right: 10,
    marginVertical: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
});

const SearchInput = (props) => {
  const {text, setText} = props
  const inputRef = useRef(null);

  const clearText = () => {
    setText('');
  };

  return (
    <View style={styles.searchInpWrapper}>
      <TextField
        placeholder={strings.searchPlaceHolder}
        onChangeText={setText}
        value={text}
      />
      {text !== '' && 
        <Text style={styles.clearBtn} onPress={clearText}>
          ✕
        </Text>
      }
    </View>
  );
};

export default SearchInput;