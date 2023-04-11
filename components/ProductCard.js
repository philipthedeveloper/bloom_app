import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  Pressable,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ProductCard = ({data, onPress}) => {
  const {name, imgUrl} = data;
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Pressable
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.darker : '#fff'},
      ]}
      onPress={() => onPress(data)}>
      <Image resizeMode="contain" style={styles.img} source={{uri: imgUrl}} />
      <View style={styles.header}>
        <SimpleLineIcons
          name="dislike"
          size={22}
          color={isDarkMode ? '#fff' : '#000'}
          style={{paddingRight: 10}}
        />
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          {name.substr(0, 30)}
        </Text>
        <SimpleLineIcons
          name="like"
          size={22}
          color={isDarkMode ? '#fff' : '#000'}
          style={{paddingLeft: 10}}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 400,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    elevation: 10,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: 'orange',
    width: '80%',
  },

  img: {
    width: '70%',
    // aspectRatio: 1,
    height: 250,
    borderRadius: 14,
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
    marginTop: 20,
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProductCard;
