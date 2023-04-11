import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import ProductCard from '../components/ProductCard';
import FloatingButton from '../components/FloatingButton';
import {Database} from '../components/Context';

const Home = ({navigation}) => {
  const {
    showRewardedAd,
    AppLovinMAX,
    BANNER_AD_UNIT_ID,
    initialized,
    backgroundStyle,
    isDarkMode,
  } = useContext(Database);
  const [newsData, setnewsData] = useState([]);
  const [productData, setproductData] = useState([]);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    fetchNews();
    fetchProducts();
    setTimeout(() => setAnimating(false), 3000);
  }, []);

  const goToDetails = data => {
    const lucky = 1;
    navigation.navigate('Details', {...data, lucky});
  };
  const goToProduct = data => {
    const lucky = 1;
    navigation.navigate('Product', {...data, lucky});
  };

  const fetchNews = async () => {
    console.log('Called again news....');
    fetch('https://bloom-admin-panel.herokuapp.com/api/v1/tasks')
      .then(res => res.json())
      .then(tasks => {
        setnewsData(tasks.data);
        console.log('done in news');
      });
  };

  const fetchProducts = async () => {
    console.log('Called again product...');
    fetch('https://bloom-admin-panel.herokuapp.com/api/v1/products')
      .then(res => res.json())
      .then(products => {
        setproductData(products.data);
        console.log('Dont in product...');
      });
  };

  return (
    <SafeAreaView
      style={{
        ...backgroundStyle,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'blue'}
        translucent={true}
      />
      <Header />
      {animating ? (
        <View style={{...backgroundStyle, flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
            color={'#00ff00'}
            animating={animating}
          />
        </View>
      ) : (
        <>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{...backgroundStyle, flex: 1}}>
            <View
              style={{marginVertical: 10, flexGrow: 0, alignItems: 'center'}}>
              {[...newsData, ...productData].map((item, index) => {
                return item.title ? (
                  <React.Fragment key={item.title}>
                    <NewsCard data={item} key={item} onPress={goToDetails} />
                    {initialized && index % 8 == 0 ? (
                      <AppLovinMAX.AdView
                        adUnitId={BANNER_AD_UNIT_ID}
                        adFormat={AppLovinMAX.AdFormat.BANNER}
                        style={{
                          ...styles.banner,
                          backgroundColor: isDarkMode ? Colors.darker : '#fff',
                          height: AppLovinMAX.isTablet() ? 90 : 50,
                        }}
                        key={`${BANNER_AD_UNIT_ID}${index}`}
                      />
                    ) : null}
                  </React.Fragment>
                ) : (
                  <React.Fragment key={item.name}>
                    <ProductCard data={item} key={item} onPress={goToProduct} />
                    {initialized && index % 3 == 0 ? (
                      <AppLovinMAX.AdView
                        adUnitId={BANNER_AD_UNIT_ID}
                        adFormat={AppLovinMAX.AdFormat.BANNER}
                        style={{
                          ...styles.banner,
                          backgroundColor: isDarkMode ? Colors.darker : '#fff',
                          height: AppLovinMAX.isTablet() ? 90 : 50,
                        }}
                        key={`${BANNER_AD_UNIT_ID}${index}{index}`}
                      />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
      <FloatingButton onPress={showRewardedAd} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#000000',
    width: '100%',
  },
});

export default Home;
