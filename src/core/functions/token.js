import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch {
    return false;
  }
};

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token);
    return true;
  } catch (error) {
    return false;
  }
};

export const getAppCount = async () => {
  try {
    const count = await AsyncStorage.getItem('startApp');
    return count;
  } catch (error) {
    return false;
  }
};

export const setAppCount = async count => {
  try {
    await AsyncStorage.setItem('startApp', `${count}`);
    return true;
  } catch (error) {
    return false;
  }
};
