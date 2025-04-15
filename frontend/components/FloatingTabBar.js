import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const tabs = [
  { name: 'Home', label: '🏠' },
  { name: 'Profile', label: '👤' },
  { name: 'Settings', label: '⚙️' },
];

const FloatingTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => navigation.navigate(tab.name)}
          style={[
            styles.tabButton,
            route.name === tab.name && styles.activeTab,
          ]}
        >
          <Text style={styles.icon}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FloatingTabBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'space-around',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#eee',
  },
  icon: {
    fontSize: 18,
  },
});
