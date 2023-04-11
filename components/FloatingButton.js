import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const FloatingButton = ({onPress}) => {
  return (
    <Pressable
      style={styles.pressable}
      android_ripple={{color: '#9156ff'}}
      onPress={onPress}>
      <Text style={styles.signupText}>AD</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#7C37FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    transform: [{translateX: -25}],
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: 'orange',
    elevation: 10,
  },

  signupText: {
    color: '#fff',
    fontFamily: 'bold',
    fontSize: 16,
  },
});

export default FloatingButton;
