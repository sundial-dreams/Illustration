import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {SceneMap, TabView} from 'react-native-tab-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from 'react-native-drawer';
import * as Keychain from 'react-native-keychain';

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
import Illust from './src/screens/Illust';
import DrawerPanel from './src/components/DrawerPanel/DrawerPanel';
import {Layout} from './src/utils';
import Profile from './src/screens/Profile';
import {MainSceneRoutes} from './src/utils/config';
import Test from './src/screens/Test';
import TagList from './src/screens/TagList';
import FindList from './src/screens/FindList';
import Following from './src/screens/Following';
import Explore from './src/screens/Explore';
import IllustViewer from './src/screens/Illust/IllustViewer';
import Follows from './src/screens/Follows';

import Login from './src/screens/Login';
import {useCheckLoginState, useLoadJWTToken} from './src/hooks';
import useToast, {ToastProvider} from './src/components/common/Toast';

const RootStack = createNativeStackNavigator();

const scenes = SceneMap({
  Home,
  Tags,
  Find,
  Follows,
});

function Screens(): React.ReactElement {
  const {currentScreenIndex} = useSelector((state: IStore) => state.uiState);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const routes = MainSceneRoutes;

  useCheckLoginState(navigation);

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

  useLoadJWTToken(dispatch);

  return (
    <View style={styles.app}>
      <SafeAreaProvider>
        <ToastProvider>
          <NavigationContainer>
            <Drawer
              type="static"
              open={openDrawer}
              onClose={handleDrawerClose}
              content={<DrawerPanel />}
              openDrawerOffset={Layout.width / 2}>
              <RootStack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName="App">
                <RootStack.Group>
                  <RootStack.Screen name={'App'} component={Screens} />
                  <RootStack.Screen name={'Illust'} component={Illust} />
                  <RootStack.Screen name={'Profile'} component={Profile} />
                  <RootStack.Screen name={'TagDetail'} component={TagList} />
                  <RootStack.Screen name={'FindList'} component={FindList} />
                  <RootStack.Screen name={'Following'} component={Following} />
                  <RootStack.Screen name={'Explore'} component={Explore} />
                  <RootStack.Screen
                    name={'IllustViewer'}
                    component={IllustViewer}
                  />
                  <RootStack.Screen name={'Test'} component={Test} />
                </RootStack.Group>
                <RootStack.Group
                  screenOptions={{
                    presentation: 'modal',
                    // gestureEnabled: false,
                  }}>
                  <RootStack.Screen name={'Login'} component={Login} />
                </RootStack.Group>
              </RootStack.Navigator>
            </Drawer>
          </NavigationContainer>
        </ToastProvider>
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
