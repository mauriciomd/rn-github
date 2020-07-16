import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import { useButtonContex } from '../../hooks/ButtonContext';

interface ListIemProps {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  handleRemoveRepository(id: string): void;
}

const ListItem: React.FC<ListIemProps> = ({
  id,
  name,
  description,
  avatarUrl,
  handleRemoveRepository,
}) => {
  const { isRemoveButtonShown, showRemoveButton } = useButtonContex();

  return (
    <View style={styles.repositoryItem}>
      <TouchableOpacity
        style={styles.repositoryContainer}
        onLongPress={showRemoveButton}
        activeOpacity={0.7}
      >
        {isRemoveButtonShown && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveRepository(id)}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        )}

        <Image source={{ uri: avatarUrl }} style={styles.userAvatar} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  repositoryItem: {
    position: 'relative',
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
  removeButton: {
    position: 'absolute',
    backgroundColor: '#ff0000',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    color: '#ffffff',
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
