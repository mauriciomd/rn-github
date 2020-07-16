import React, { useRef, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  Dimensions,
} from 'react-native';

import { useButtonContex } from '../../hooks/ButtonContext';

interface ListIemProps {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  handleRemoveRepository(id: string): void;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListItem: React.FC<ListIemProps> = ({
  id,
  name,
  description,
  avatarUrl,
  handleRemoveRepository,
}) => {
  const { isRemoveButtonShown, showRemoveButton } = useButtonContex();
  const removeButtonAnimation = useRef(new Animated.Value(0)).current;
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const createRemoveButtonAnimation = useMemo(() => {
    return Animated.timing(removeButtonAnimation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    });
  }, [removeButtonAnimation]);

  function removeItem(): void {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => {
      handleRemoveRepository(id);
    });
    setIsAnimationStarted(true);
  }

  if (isRemoveButtonShown) {
    createRemoveButtonAnimation.start();
  }

  return (
    <Animated.View
      style={[
        styles.repositoryItem,
        isAnimationStarted ? styles.removeAnimation : null,
      ]}
    >
      <TouchableOpacity
        style={styles.repositoryContainer}
        onLongPress={showRemoveButton}
        activeOpacity={0.7}
      >
        {isRemoveButtonShown && (
          <Animated.View
            style={[styles.removeButton, { opacity: removeButtonAnimation }]}
          >
            <TouchableOpacity onPress={removeItem}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Image source={{ uri: avatarUrl }} style={styles.userAvatar} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  repositoryItem: {
    position: 'relative',
  },
  removeAnimation: {
    left: -Dimensions.get('window').width,
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
    width: 30,
    height: 30,
    borderRadius: 15,
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
