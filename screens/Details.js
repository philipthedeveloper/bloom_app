import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Database} from '../components/Context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Details = ({navigation, route}) => {
  const data = route.params;
  const {createdAt, title, description, imgUrl, lucky} = data;
  const {isDarkMode, showInterstitialAd} = useContext(Database);

  const views = Math.floor(Math.random() * 300);
  const comments = Math.floor(Math.random() * 500);

  useEffect(() => {
    if (lucky === 1) {
      showInterstitialAd();
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={{position: 'relative'}}>
        <Image source={{uri: imgUrl}} style={styles.img} resizeMode="cover" />
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
      </View>
      <View
        style={[
          styles.newDetails,
          {backgroundColor: isDarkMode ? Colors.darker : '#fff'},
        ]}>
        <View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            {
              backgroundColor: 'blue',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              top: -35,
              height: 100,
            },
          ]}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={require('../assets/jpegs/user.png')}
              resizeMode="contain"
              style={styles.authorImg}
            />
          </View>
          <View style={styles.pubInfo}>
            <Text style={[styles.authorName, {color: '#fff'}]}>
              {'Philip Maxwell'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.pubDate, {color: '#fff'}]}>
                {new Date(createdAt).toLocaleString()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="eye" size={15} color="#fff" />
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 5,
                    // fontFamily: 'regular',
                    fontSize: 10,
                  }}>
                  {views}
                </Text>
              </View>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 8,
                }}
                onPress={() => setSheetIndex(0)}>
                <FontAwesome name="commenting-o" size={15} color="#fff" />
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 5,
                    // fontFamily: 'regular',
                    fontSize: 10,
                  }}>
                  {comments.length}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          {title}
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{padding: 10, marginBottom: 20, flex: 1}}>
          <Image
            source={{uri: imgUrl}}
            resizeMode="cover"
            style={styles.newImg}
          />
          <Text
            style={[styles.newsDesc, {color: isDarkMode ? '#fff' : '#000'}]}>
            {`\t\t${description.split('.').join('.\n\n\t\t')}`}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 220,
  },

  newDetails: {
    padding: 20,
    paddingTop: 0,
    // height: 100,
    flex: 1,
  },

  newsDesc: {
    fontSize: 16,
    // fontFamily: 'abel',
    lineHeight: 32,
    textAlign: 'justify',
    marginVertical: 10,
  },

  title: {
    fontSize: 20,
    // fontFamily: 'osBold',
    marginVertical: 10,
    marginTop: 20,
    fontWeight: '600',
  },

  authorImg: {
    width: 60,
    height: 60,
  },

  pubInfo: {
    marginLeft: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flex: 1,
  },

  authorName: {
    // fontFamily: 'medium',
    fontSize: 13,
  },

  pubDate: {
    // fontFamily: 'regular',
    fontSize: 11,
  },

  pressIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  newImg: {
    width: '100%',
    height: 200,
  },
  bottomSheetText: {
    // fontFamily: 'regular',
    fontSize: 14,
  },

  bottomSheetStyle: {
    flex: 1,
    elevation: 20,
    shadowColor: '#000',
    backgroundColor: 'red',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    paddingHorizontal: 14,
  },

  commentHeader: {
    // fontFamily: 'osBold',
  },
});

export default Details;
