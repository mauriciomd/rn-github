import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  Keyboard,
} from 'react-native';

import { gql } from '@apollo/client';
import apolloClient from '../../services/api';

interface GithubRepository {
  repository: {
    id: string;
    description: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
    user: string;
  };
}

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);

  async function handleSubmitt() {
    Keyboard.dismiss();

    try {
      if (inputValue === '') {
        throw new Error();
      }

      const [owner, name] = inputValue.split('/');
      const GET_REPOSITORY_INFO = gql`
      {
        repository(name: "${name}", owner: "${owner}") {
          id
          description
          owner {
            login
            avatarUrl
          }
        }
      }
    `;

      setIsLoading(true);
      const response = await apolloClient.query<GithubRepository>({
        query: GET_REPOSITORY_INFO,
      });

      if (response.data) {
        setRepositories([...repositories, response.data]);
      }
    } catch (error) {
      Alert.alert('Error', 'Repository not found');
    } finally {
      setInputValue('');
      setIsLoading(false);
    }
  }

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
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          onSubmitEditing={handleSubmitt}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSubmitt}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#232129" />
          ) : (
            <Text style={styles.searchButtonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.repositoryList}
        data={repositories}
        keyExtractor={item => item.repository.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.repositoryContainer}>
            <Image
              source={{
                uri: item.repository.owner.avatarUrl,
              }}
              style={styles.userAvatar}
            />

            <View style={styles.descriptionContainer}>
              <Text style={styles.titleText}>
                {item.repository.owner.login}
              </Text>
              <Text style={styles.descriptionText}>
                {item.repository.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  repositoryList: {
    marginTop: 30,
  },
  repositoryContainer: {
    backgroundColor: '#ffffff',
    height: 120,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 24,
    color: '#ff9000',
    fontWeight: 'bold',
  },
  descriptionText: {
    marginTop: 5,
    color: '#232129',
    fontSize: 18,
  },
});
