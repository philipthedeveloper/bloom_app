import {View, Text, useColorScheme, StyleSheet, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

export default function Header() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container]}>
      <Image
        source={require('../assets/adaptive_icon.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text
        style={{
          ...styles.headerText,
          color: isDarkMode ? Colors.light : Colors.dark,
        }}>
        PUB_APPLOVIN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
    paddingBottom: 15,
    backgroundColor: 'blue',
  },

  headerText: {
    fontSize: 40,
    fontWeight: '600',
  },

  logo: {
    width: 50,
    height: 50,
  },
});
