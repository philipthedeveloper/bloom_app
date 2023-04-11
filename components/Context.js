import React, {createContext, useState, useEffect} from 'react';
import AppLovinMAX from 'react-native-applovin-max';
import {useColorScheme, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Database = createContext();
export {Database};

const adLoadState = {
  notLoaded: 'NOT_LOADED',
  loading: 'LOADING',
  loaded: 'LOADED',
};

const Context = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const SDK_KEY =
    'VirrFkoTWvaopQTzfrGgT2ucy3KoCvTTgcl7vMZGkT_QZtz2DDB-Ly5PAeRyIxOk-xcWtSIVRVLverke5IQI2S';
  const INTERSTITIAL_AD_UNIT_ID = Platform.select({
    android: '43473eaf4d1de9ed',
  });
  const BANNER_AD_UNIT_ID = Platform.select({
    android: 'aa9b5ba91d81770c',
  });
  const REWARDED_AD_UNIT_ID = Platform.select({
    android: '7a3fbb260e16c455',
  });
  const [interstitialAdLoadState, setInterstitialAdLoadState] = useState(
    adLoadState.notLoaded,
  );
  const [interstitialRetryAttempt, setInterstitialRetryAttempt] = useState(0);
  const [rewardedAdLoadState, setRewardedAdLoadState] = useState(
    adLoadState.notLoaded,
  );
  const [rewardedAdRetryAttempt, setRewardedAdRetryAttempt] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [statusText, setStatusText] = useState('Initializing SDK...');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };
  const [allData, setAllData] = useState([]);
  // Run once after mounting
  useEffect(() => {
    initAppLovinMax();
  }, []);

  // Run when statusText has changed
  useEffect(() => {
    console.log(statusText);
  }, [statusText]);

  const initAppLovinMax = () => {
    if (AppLovinMAX.isInitialized()) return;

    AppLovinMAX.initialize(SDK_KEY, () => {
      setStatusText('SDK Initialized');
      setInitialized(true);
      attachAdListeners();
    });
  };
  const attachAdListeners = () => {
    // Interstitial Listeners
    AppLovinMAX.addEventListener('OnInterstitialLoadedEvent', adInfo => {
      setInterstitialAdLoadState(adLoadState.loaded);

      // Interstitial ad is ready to be shown. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) will now return 'true'
      setStatusText('Interstitial ad loaded from ' + adInfo.networkName);

      // Reset retry attempt
      setInterstitialRetryAttempt(0);
    });
    AppLovinMAX.addEventListener('OnInterstitialLoadFailedEvent', errorInfo => {
      // Interstitial ad failed to load
      // We recommend retrying with exponentially higher delays up to a maximum delay (in this case 64 seconds)
      setInterstitialRetryAttempt(interstitialRetryAttempt + 1);

      let retryDelay = Math.pow(2, 3);
      setStatusText(
        'Interstitial ad failed to load with code ' +
          errorInfo.code +
          ' - retrying in ' +
          retryDelay +
          's',
      );

      setTimeout(() => {
        AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
      }, retryDelay * 1000);
    });
    AppLovinMAX.addEventListener('OnInterstitialClickedEvent', adInfo => {
      setStatusText('Interstitial ad clicked');
    });
    AppLovinMAX.addEventListener('OnInterstitialDisplayedEvent', adInfo => {
      setStatusText('Interstitial ad displayed');
    });
    AppLovinMAX.addEventListener(
      'OnInterstitialAdFailedToDisplayEvent',
      adInfo => {
        setInterstitialAdLoadState(adLoadState.notLoaded);
        setStatusText('Interstitial ad failed to display');
        AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
      },
    );
    AppLovinMAX.addEventListener('OnInterstitialHiddenEvent', adInfo => {
      setInterstitialAdLoadState(adLoadState.notLoaded);
      setStatusText('Interstitial ad hidden');
      AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    });
    AppLovinMAX.addEventListener('OnInterstitialAdRevenuePaid', adInfo => {
      setStatusText('Interstitial ad revenue paid: ' + adInfo.revenue);
    });

    // Rewarded Ad Listeners
    AppLovinMAX.addEventListener('OnRewardedAdLoadedEvent', adInfo => {
      setRewardedAdLoadState(adLoadState.loaded);

      // Rewarded ad is ready to be shown. AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID) will now return 'true'
      setStatusText('Rewarded ad loaded from ' + adInfo.networkName);

      // Reset retry attempt
      setRewardedAdRetryAttempt(0);
    });
    AppLovinMAX.addEventListener('OnRewardedAdLoadFailedEvent', errorInfo => {
      setRewardedAdLoadState(adLoadState.notLoaded);

      // Rewarded ad failed to load
      // We recommend retrying with exponentially higher delays up to a maximum delay (in this case 64 seconds)
      setRewardedAdRetryAttempt(rewardedAdRetryAttempt + 1);

      let retryDelay = Math.pow(2, 3);
      setStatusText(
        'Rewarded ad failed to load with code ' +
          errorInfo.code +
          ' - retrying in ' +
          retryDelay +
          's',
      );

      setTimeout(() => {
        AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
      }, retryDelay * 1000);
    });
    AppLovinMAX.addEventListener('OnRewardedAdClickedEvent', adInfo => {
      setStatusText('Rewarded ad clicked');
    });
    AppLovinMAX.addEventListener('OnRewardedAdDisplayedEvent', adInfo => {
      setStatusText('Rewarded ad displayed');
    });
    AppLovinMAX.addEventListener('OnRewardedAdFailedToDisplayEvent', adInfo => {
      setRewardedAdLoadState(adLoadState.notLoaded);
      setStatusText('Rewarded ad failed to display');
    });
    AppLovinMAX.addEventListener('OnRewardedAdHiddenEvent', adInfo => {
      setRewardedAdLoadState(adLoadState.notLoaded);
      setStatusText('Rewarded ad hidden');
      AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
    });
    AppLovinMAX.addEventListener('OnRewardedAdReceivedRewardEvent', adInfo => {
      setStatusText('Rewarded ad granted reward');
    });
    AppLovinMAX.addEventListener('OnRewardedAdRevenuePaid', adInfo => {
      setStatusText('Rewarded ad revenue paid: ' + adInfo.revenue);
    });

    // Load the first interstitial ad
    AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    // Load the first rewarded ad
    AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  };

  const showInterstitialAd = () => {
    if (AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID)) {
      AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
    } else {
      setStatusText('Loading interstitial ad...');
      setInterstitialAdLoadState(adLoadState.loading);
      AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    }
  };

  const showRewardedAd = () => {
    if (AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID)) {
      AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
    } else {
      setStatusText('Loading rewarded ad...');
      setRewardedAdLoadState(adLoadState.loading);
      AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
    }
  };

  return (
    <Database.Provider
      value={{
        allData,
        isDarkMode,
        backgroundStyle,
        statusText,
        showInterstitialAd,
        showRewardedAd,
        AppLovinMAX,
        INTERSTITIAL_AD_UNIT_ID,
        REWARDED_AD_UNIT_ID,
        BANNER_AD_UNIT_ID,
        initialized,
        backgroundStyle,
      }}>
      {children}
    </Database.Provider>
  );
};

export default Context;
