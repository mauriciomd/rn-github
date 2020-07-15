import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.userInput}
          placeholder="user/repository"
          placeholderTextColor="#b9b9b9"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.repositoryContainer}>
        <Image
          source={{
            uri: 'https://api.adorable.io/avatars/110/abott@adorable.png',
          }}
          style={styles.userAvatar}
        />

        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>Title</Text>
          <Text style={styles.descriptionText}>Description</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9e9e9',
    flex: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  userInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    fontSize: 18,
  },
  searchButton: {
    marginLeft: 10,
    height: 45,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9000',
    borderRadius: 10,
  },
  searchButtonText: {
    fontSize: 18,
    color: '#232129',
    fontWeight: '500',
  },
  repositoryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 15,
  },
  titleText: {
    fontSize: 20,
    color: '#ff9000',
    fontWeight: 'bold',
  },
  descriptionText: {
    marginTop: 5,
  },
});
