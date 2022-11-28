import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {SceneMap, TabView} from 'react-native-tab-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from 'react-native-drawer';

import Tags from './src/screens/Tags';
import Home from './src/screens/Home';
import AppTabBar from './src/components/common/AppTabBar';
import {
  IStore,
  updateCurrentScreenIndex,
  updateOpenDrawer,
} from './src/store/store';
import store from './src/store';
import AppHeaderBar from './src/components/HeaderBar/AppHeaderBar';
import {DefaultBackgroundColor} from './src/styles';
import Find from './src/screens/Find';
import Follows from './src/screens/Follows';
import Illus from './src/screens/Illus';
import DrawerPanel from './src/components/DrawerPanel/DrawerPanel';
import {Layout} from './src/utils';
import Profile from './src/screens/Profile';
import {MainSceneRoutes} from './src/utils/config';
import Test from './src/screens/Test';
import TagList from './src/screens/TagList';
import FindList from './src/screens/FindList';
import Following from './src/screens/Following';
import Explore from './src/screens/Explore';
import IllusViewer from './src/screens/Illus/IllusViewer';
import ImageTransformer from './src/screens/Test/ImageTransformer';

const Stack = createNativeStackNavigator();

const scenes = SceneMap({
  Home,
  Tags,
  Find,
  Follows,
});

function Screens(): React.ReactElement {
  const {currentScreenIndex} = useSelector((state: IStore) => state.uiState);
  const dispatch = useDispatch();
  const routes = MainSceneRoutes;

  return (
    <>
      <AppHeaderBar title={routes[currentScreenIndex].title} />
      <TabView
        onIndexChange={index => dispatch(updateCurrentScreenIndex(index))}
        navigationState={{
          index: currentScreenIndex,
          routes: routes,
        }}
        lazy
        tabBarPosition="bottom"
        renderTabBar={AppTabBar}
        renderScene={scenes}
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
              <Stack.Screen name={'App'} component={Screens} />
              <Stack.Screen name={'Illus'} component={Illus} />
              <Stack.Screen name={'Profile'} component={Profile} />
              <Stack.Screen name={'TagDetail'} component={TagList} />
              <Stack.Screen name={'FindList'} component={FindList} />
              <Stack.Screen name={'Following'} component={Following} />
              <Stack.Screen name={'Explore'} component={Explore} />
              <Stack.Screen name={'IllusViewer'} component={IllusViewer} />
              <Stack.Screen name={'Test'} component={Test} />
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
