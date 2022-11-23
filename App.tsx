import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {SceneMap, TabView} from 'react-native-tab-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from 'react-native-drawer';

import Tags from './src/screens/Tags';
import Home from './src/screens/Home';
import Navigator from './src/components/Navigator';
import {IStore, updateCurrentScreen, updateOpenDrawer} from './src/store/store';
import store from './src/store';
import AppHeaderBar from './src/components/AppHeaderBar';
import {DefaultBackgroundColor} from './src/styles';
import Find from './src/screens/Find';
import Follows from './src/screens/Follows';
import Illus from './src/screens/Illus';
import DrawerPanel from './src/components/DrawerPanel';
import {Layout} from './src/utils';
import Profile from './src/screens/Profile';
import TagDetail from './src/screens/TagDetail';

const Routes = [{key: 'Home'}, {key: 'Tags'}, {key: 'Find'}, {key: 'Follows'}];
const Titles = ['Discover', 'Tags', 'Find', 'Follows'];

const Stack = createNativeStackNavigator();

function AppScreen(): React.ReactElement {
  const {currentScreen} = useSelector((state: IStore) => state.uiState);
  const dispatch = useDispatch();

  const renderScene = useMemo(
    () =>
      SceneMap({
        Home: Home,
        Tags: Tags,
        Find: Find,
        Follows: Follows,
      }),
    [],
  );

  const renderTabBar = () => {
    return <Navigator />;
  };

  return (
    <>
      <AppHeaderBar title={Titles[currentScreen]} />
      <TabView
        onIndexChange={index => dispatch(updateCurrentScreen(index))}
        navigationState={{
          index: currentScreen,
          routes: Routes,
        }}
        lazy
        tabBarPosition="bottom"
        renderTabBar={renderTabBar}
        renderScene={renderScene}
      />
    </>
  );
}

function App(): React.ReactElement {
  const {openDrawer} = useSelector((state: IStore) => state.uiState);
  const dispatch = useDispatch();
  const handleDrawerClose = useCallback(() => {
    dispatch(updateOpenDrawer(false));
  }, [dispatch]);
  return (
    <View style={styles.app}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer
            type="static"
            open={openDrawer}
            onClose={handleDrawerClose}
            content={<DrawerPanel />}
            openDrawerOffset={Layout.width / 2}>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="App">
              <Stack.Screen name={'App'} component={AppScreen} />
              <Stack.Screen name={'Illus'} component={Illus} />
              <Stack.Screen name={'Profile'} component={Profile} />
              <Stack.Screen name={'TagDetail'} component={TagDetail} />
            </Stack.Navigator>
          </Drawer>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    ...DefaultBackgroundColor,
  },
});
