import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  Pressable,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const NewsCard = ({data, onPress}) => {
  const {title, description, imgUrl} = data;
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Pressable style={styles.container} onPress={() => onPress(data)}>
      <Image resizeMode="contain" style={styles.img} source={{uri: imgUrl}} />
      <View style={styles.header}>
        <SimpleLineIcons
          name="dislike"
          size={22}
          color={isDarkMode ? '#fff' : '#000'}
          style={{paddingRight: 10}}
        />
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          {title.substr(0, 30)}...
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
          {description.replace(/\\t/g, '').substr(0, 200)}...
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 450,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
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

export default NewsCard;
