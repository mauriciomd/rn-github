import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { gql } from '@apollo/client';

import { useButtonContex } from '../../hooks/ButtonContext';

import apolloClient from '../../services/api';
import ListItem from '../../components/ListItem';

interface GithubRepository {
  repository: {
    id: string;
    description: string;
    url: string;
    owner: {
      avatarUrl: string;
    };
    name: string;
  };
}

const Home: React.FC = () => {
  const { hideRemoveButton } = useButtonContex();

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
          name
          description
          owner {
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

  function handleRemoveRepository(repositoryId: string): void {
    const rep = repositories.filter(
      item => item.repository.id !== repositoryId,
    );

    setRepositories(rep);

    if (rep.length === 0) {
      hideRemoveButton();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={hideRemoveButton}>
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
            <ListItem
              key={item.repository.id}
              id={item.repository.id}
              name={item.repository.name}
              avatarUrl={item.repository.owner.avatarUrl}
              description={item.repository.description}
              handleRemoveRepository={handleRemoveRepository}
            />
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    borderRadius: 5,
  },
  searchButtonText: {
    fontSize: 18,
    color: '#232129',
    fontWeight: '500',
  },
  repositoryList: {
    marginTop: 30,
  },
});
