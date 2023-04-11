import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Database} from '../components/Context';

const Product = ({navigation, route}) => {
  const data = route.params;
  const {imgUrl, name, description, lucky} = data;
  const {isDarkMode, showInterstitialAd, AppLovinMAX, BANNER_AD_UNIT_ID} =
    useContext(Database);

  useEffect(() => {
    if (lucky === 1) {
      showInterstitialAd();
    }
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.darker : '#fff'},
      ]}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? Colors.darker : '#fff',
            alignItems: 'center',
            position: 'relative',
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: StatusBar.currentHeight + 10,
            paddingHorizontal: 14,
            right: 0,
            left: 0,
          }}>
          <Pressable
            style={[styles.pressIcon, {flexDirection: 'row'}]}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color={'#fff'} size={20} />
          </Pressable>

          <Pressable
            style={styles.pressIcon}
            onPress={() => console.log('Saved')}>
            <Ionicons name={'bookmark-outline'} size={18} color={'#fff'} />
          </Pressable>
        </View>
        <Image resizeMode="contain" style={styles.img} source={{uri: imgUrl}} />
        <View style={styles.header}>
          <SimpleLineIcons
            name="dislike"
            size={22}
            color={isDarkMode ? '#fff' : '#000'}
            style={{paddingRight: 10}}
          />
          <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
            {name}
          </Text>
          <SimpleLineIcons
            name="like"
            size={22}
            color={isDarkMode ? '#fff' : '#000'}
            style={{paddingLeft: 10}}
          />
        </View>
        <View style={styles.descriptionCont}>
          <Text
            style={[styles.description, {color: isDarkMode ? '#fff' : '#000'}]}>
            {`\t\t\t${description}`}
          </Text>
        </View>
      </View>
      <AppLovinMAX.AdView
        adUnitId={BANNER_AD_UNIT_ID}
        adFormat={AppLovinMAX.AdFormat.BANNER}
        style={{
          ...styles.banner,
          backgroundColor: isDarkMode ? Colors.darker : '#fff',
          height: AppLovinMAX.isTablet() ? 90 : 50,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  img: {
    width: '70%',
    // aspectRatio: 1,
    height: 250,
    borderRadius: 14,
    marginTop: StatusBar.currentHeight + 30,
  },

  header: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },

  title: {
    fontWeight: '600',
    fontSize: 20,
    flexBasis: '65%',
    textAlign: 'center',
  },

  descriptionCont: {
    width: '70%',
    marginTop: 30,
  },
  description: {
    lineHeight: 25,
    fontSize: 17,
    textAlign: 'justify',
  },
  banner: {
    backgroundColor: '#000000',
    width: '100%',
  },
  pressIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product;
