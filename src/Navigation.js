import 'react-native-gesture-handler';
import React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {Header, Icon, MenuIcon, Title, SetFavourite} from './components';
import {colors, fonts, fontWeight} from './styles';
import {trackScreenView} from './core/utils';
import * as screen from './screens';

const primaryHeader = {
  headerStyle: {
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    backgroundColor: '#eaeaea',
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: fonts.heading,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#515151',
  },
};

const NewsStackNavigator = createStackNavigator();
const NewsStack = props => {
  return (
    <NewsStackNavigator.Navigator>
      <NewsStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Новости',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="NewsPage"
        component={screen.NewsPage}
      />
    </NewsStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createStackNavigator();
const HomeStack = props => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        options={({navigation}) => ({
          ...primaryHeader,
          title: null,
          headerLeft: () => <Header searchInput notifications />,
          headerRight: null,
        })}
        name="Home"
        component={screen.Home}
      />
      <HomeStackNavigator.Screen
        options={{headerShown: false}}
        name="CategoryStack"
        component={CategoryStack}
      />
      <HomeStackNavigator.Screen
        options={{headerShown: false}}
        name="ProductStack"
        component={ProductStack}
      />
      <HomeStackNavigator.Screen
        options={{headerShown: false}}
        name="NewsStack"
        component={NewsStack}
      />
      <HomeStackNavigator.Screen
        options={{headerShown: false}}
        name="SalesStack"
        component={SalesStack}
      />
      <HomeStackNavigator.Screen
        options={{headerShown: false}}
        name="FavoritesStack"
        component={FavoriteStack}
      />
    </HomeStackNavigator.Navigator>
  );
};

const SelectCityStackNavigator = createStackNavigator();
const SelectCityStack = props => {
  return (
    <SelectCityStackNavigator.Navigator>
      <SelectCityStackNavigator.Screen
        name="SelectCity"
        component={screen.SelectCity}
        options={{
          ...primaryHeader,
          title: 'Выберите магазин',
          headerLeft: null,
          headerRight: null,
        }}
      />
      <SelectCityStackNavigator.Screen
        name="SelectShop"
        component={screen.SelectShop}
        options={{
          ...primaryHeader,
          title: 'Выберите магазин',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: null,
        }}
      />
    </SelectCityStackNavigator.Navigator>
  );
};

const FiltersStackNavigator = createStackNavigator();
const FiltersStack = props => {
  return (
    <FiltersStackNavigator.Navigator mode="modal">
      <FiltersStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Фильтры',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => (
            <Header navigation={props.navigation} resetFilters />
          ),
        }}
        name="FiltersList"
        component={screen.Filters}
      />
      <FiltersStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Фильтры',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => (
            <Header navigation={props.navigation} resetFilters />
          ),
        }}
        name="Filters"
        component={screen.SelectedFilter}
      />
    </FiltersStackNavigator.Navigator>
  );
};

const AdressesStackNavigator = createStackNavigator();
const AdressesStack = props => {
  return (
    <AdressesStackNavigator.Navigator>
      <AdressesStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Адреса доставки',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="Adresses"
        component={screen.Adresses}
      />
      <AdressesStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Добавить адрес',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="NewAdress"
        component={screen.NewAdress}
      />
    </AdressesStackNavigator.Navigator>
  );
};

const OrdersHistoryStackNavigator = createStackNavigator();
const OrdersHistoryStack = props => {
  return (
    <OrdersHistoryStackNavigator.Navigator>
      <OrdersHistoryStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'История заказов',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="OrdersHistory"
        component={screen.OrdersHistory}
      />
      <OrdersHistoryStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Заказ',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="Order"
        component={screen.Order}
      />
    </OrdersHistoryStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();
const AuthStack = props => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Авторизация',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="Auth"
        component={screen.Auth}
      />
      <AuthStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Регистрация',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="Registration"
        component={screen.Registration}
      />
      <AuthStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Подтверждение номера',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="Verification"
        component={screen.Verification}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();
const ProfileStack = props => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Личный кабинет',
          headerLeft: () => <Header navigation={props.navigation} />,
        }}
        name="Profile"
        component={screen.Profile}
      />
      <ProfileStackNavigator.Screen
        options={{headerShown: false}}
        name="Favorite"
        component={FavoriteStack}
      />
      <ProfileStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Мой профиль',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="EditProfile"
        component={screen.EditProfile}
      />
      <ProfileStackNavigator.Screen
        options={{headerShown: false}}
        name="Adresses"
        component={AdressesStack}
      />
      <ProfileStackNavigator.Screen
        options={{headerShown: false}}
        name="OrdersHistoryStack"
        component={OrdersHistoryStack}
      />
      <ProfileStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Промокоды',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="PersonalCode"
        component={screen.PersonalCode}
      />
      <ProfileStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Уведомления',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => <Header navigation={props.navigation} checkAll />,
        }}
        name="Notifications"
        component={screen.Notifications}
      />
      <ProfileStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Настройки',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        }}
        name="Notice"
        component={screen.Notice}
      />
      <ProfileStackNavigator.Screen
        options={{headerShown: false}}
        name="LoyaltyStack"
        initialParams={{homeTab: true}}
        component={LoyaltyStack}
      />
    </ProfileStackNavigator.Navigator>
  );
};

const ProductStackNavigator = createStackNavigator();
const ProductStack = props => {
  return (
    <ProductStackNavigator.Navigator>
      <ProductStackNavigator.Screen
        options={({route}) => ({
          ...primaryHeader,
          headerTitle: () => <SetFavourite />,
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => <Header navigation={props.navigation} />,
        })}
        name="Product"
        component={screen.Product}
      />
      <ProductStackNavigator.Screen
        options={({route}) => ({
          ...primaryHeader,
          headerTitle: () => <Title screenName="" />,
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => <Header navigation={props.navigation} />,
        })}
        name="BuyShop"
        component={screen.BuyShop}
      />
    </ProductStackNavigator.Navigator>
  );
};

const CategoryStackNavigator = createStackNavigator();
const CategoryStack = props => {
  const {user} = useSelector(state => state);
  return (
    <CategoryStackNavigator.Navigator>
      <CategoryStackNavigator.Screen
        options={{
          ...primaryHeader,
          headerTitle: () => <Title screenName={'Каталог'} />,
          headerLeft: null,
          headerRight: () => (
            <Header navigation={props.navigation} user={user} />
          ),
        }}
        name="Categories"
        component={screen.CategoriesList}
      />
      {/* <CategoryStackNavigator.Screen
        options={({ route }) => ({
          ...primaryHeader,
          headerTitle: () => <Title screenName={route.params.categoryName} />,
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => (
            <Header navigation={props.navigation} user={user} />
          ),
        })}
        name="SubCategories"
        component={screen.SubCategoriesList}
      /> */}
      <CategoryStackNavigator.Screen
        options={({route}) => ({
          ...primaryHeader,
          headerTitle: () => <Title screenName={route.params?.categoryName} />,
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: () => <Header navigation={props.navigation} filters />,
        })}
        name="ProductList"
        component={screen.ProductCategories}
      />
      <CategoryStackNavigator.Screen
        options={{headerShown: false}}
        component={ProductStack}
        name="ProductStack"
      />
    </CategoryStackNavigator.Navigator>
  );
};

const CheckoutStackNavigator = createStackNavigator();
const CheckoutStack = props => {
  return (
    <CheckoutStackNavigator.Navigator>
      <CheckoutStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Оформление заказа',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: null,
        }}
        name="Checkout"
        component={screen.Checkout}
      />
    </CheckoutStackNavigator.Navigator>
  );
};

const CartStackNavigator = createStackNavigator();
const CartStack = props => {
  const {user} = useSelector(state => state);
  return (
    <CartStackNavigator.Navigator>
      <CartStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Корзина',
          headerLeft: null,
          headerRight: () => (
            <Header navigation={props.navigation} user={user} basketTrash />
          ),
        }}
        name="Cart"
        component={screen.Cart}
      />
      <CartStackNavigator.Screen
        name="CheckoutStack"
        component={CheckoutStack}
        options={{headerShown: false}}
      />
      <CartStackNavigator.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
    </CartStackNavigator.Navigator>
  );
};

const FavoriteStackNavigator = createStackNavigator();
const FavoriteStack = props => {
  const {user} = useSelector(state => state);
  return (
    <FavoriteStackNavigator.Navigator>
      <FavoriteStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Избранное',
          headerLeft: () => (
            <Header navigation={props.navigation} user={user} backButton />
          ),
          headerRight: () => (
            <Header navigation={props.navigation} user={user} />
          ),
        }}
        name="Favorite"
        component={screen.Favorite}
      />
      <FavoriteStackNavigator.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
    </FavoriteStackNavigator.Navigator>
  );
};

const LoyaltyStackNavigator = createStackNavigator();
const LoyaltyStack = props => {
  return (
    <LoyaltyStackNavigator.Navigator>
      <LoyaltyStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Карта лояльности',
          headerLeft: () => (
            <Header
              navigation={props.navigation}
              backButton={props.route?.params?.homeTab}
            />
          ),
          headerRight: null,
        }}
        name="LoyaltyCard"
        component={screen.LoyaltyCard}
      />
      <LoyaltyStackNavigator.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
    </LoyaltyStackNavigator.Navigator>
  );
};

const SalesStackNavigator = createStackNavigator();
const SalesStack = props => {
  const {user} = useSelector(state => state);
  return (
    <SalesStackNavigator.Navigator>
      <SalesStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Акции',
          headerLeft: () => <Header backButton />,
          headerRight: null,
        }}
        name="Sale"
        component={screen.Sale}
      />
      <SalesStackNavigator.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
    </SalesStackNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabsStack = () => {
  const {user} = useSelector(state => state);
  return (
    <Tab.Navigator
      initialRouteName={!user.shop ? 'TabShops' : 'TabHome'}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.darkGray,
        keyboardHidesTabBar: true,
        labelStyle: {
          fontFamily: fonts.textSemibold,
          fontWeight: '500',
          fontSize: 12,
        },
        style: {
          backgroundColor: colors.gray,
          paddingVertical: 8,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'point'} fill={focused ? color : colors.darkGray} />
            );
          },
          tabBarLabel: 'Магазины',
          headerShown: false,
        }}
        name="TabShops"
        component={SelectCityStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'catalog'} fill={focused ? color : colors.darkGray} />
            );
          },
          tabBarLabel: 'Каталог',
          headerShown: false,
        }}
        name="TabHome"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'sale'} fill={focused ? color : colors.darkGray} />
            );
          },
          tabBarLabel: 'Карта',
          headerShown: false,
        }}
        name="TabLoyalty"
        component={LoyaltyStack}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (!user.hash) {
              e.preventDefault();
              Alert.alert(
                'Для оформления заказа необходимо авторизоваться',
                '',
                [
                  {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Авторизоваться',
                    onPress: () => navigation.navigate('Auth'),
                  },
                ],
              );
            }
          },
        })}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return <MenuIcon route="Basket" focused={focused} color={color} />;
          },
          tabBarLabel: 'Корзина',
          headerShown: false,
        }}
        name="TabCart"
        component={CartStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'user'} fill={focused ? color : colors.darkGray} />
            );
          },
          tabBarLabel: 'Профиль',
          headerShown: false,
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            if (!user.hash) {
              e.preventDefault();
              Alert.alert(
                'Для оформления заказа необходимо авторизоваться',
                '',
                [
                  {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Авторизоваться',
                    onPress: () => navigation.navigate('Auth'),
                  },
                ],
              );
            }
          },
        })}
        name="TabProfile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

const SearchStackNavigator = createStackNavigator();
const SearchStack = props => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen
        options={{
          ...primaryHeader,
          title: 'Поиск',
          headerLeft: () => <Header navigation={props.navigation} backButton />,
          headerRight: null,
        }}
        name="Search"
        component={screen.Search}
      />
      <SearchStackNavigator.Screen
        name="ProductStack"
        component={ProductStack}
        options={{headerShown: false}}
      />
    </SearchStackNavigator.Navigator>
  );
};

const RootStackNav = createStackNavigator();
const RootStack = props => {
  const {user} = useSelector(state => state);

  return (
    <RootStackNav.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{
        ...TransitionPresets.ScaleFromCenterAndroid,
        //...TransitionPresets.ModalPresentationIOS,
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
      }}>
      <RootStackNav.Screen
        name="SplashScreen"
        component={screen.LaunchFirst}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <RootStackNav.Screen
        name="ForceUpdate"
        component={screen.ForceUpdate}
        options={{headerShown: false}}
      />
      <RootStackNav.Screen
        name="MainStack"
        component={TabsStack}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <RootStackNav.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{headerShown: false}}
      />
      {!user.data && (
        <RootStackNav.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
      )}
      <RootStackNav.Screen
        name="FiltersStack"
        component={FiltersStack}
        options={{headerShown: false}}
      />
      <RootStackNav.Screen
        name="SelectCity"
        component={SelectCityStack}
        options={{headerShown: false}}
      />
      <RootStackNav.Screen
        options={{headerShown: false}}
        name="Search"
        component={SearchStack}
      />
      <RootStackNav.Screen
        options={({route}) => ({
          ...primaryHeader,
          title: route.params.name,
          headerLeft: () => <Header navigation={props.navigation} backButton />,
        })}
        name="InfoPage"
        component={screen.InfoPage}
      />
      <RootStackNav.Screen
        options={{headerShown: false}}
        name="OrdersHistoryStack"
        component={OrdersHistoryStack}
      />
    </RootStackNav.Navigator>
  );
};

const NavContainer = props => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        props.routingInstrumentation.registerNavigationContainer(navigationRef);
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await trackScreenView(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
        props.routingInstrumentation.onRouteWillChange({
          name: currentRouteName,
          op: 'navigation',
        });
      }}>
      <RootStack {...props} />
    </NavigationContainer>
  );
};

export default NavContainer;
