import './gesture-handler';

import { StyleSheet, Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import PostList from './screens/PostList';
import Admin from './screens/Admin';
import Professors from './screens/Professors';
import Students from './screens/Students';
import CreatePost from './screens/CreatePost';
import Login from './screens/Login';
import CreateProfessor from './screens/CreateProfessor';
import CreateStudent from './screens/CreateStudent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomAppBar = ({ navigation }) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content title="PostApp" />
      <Appbar.Action icon="login" onPress={() => navigation.navigate('Login')} />
    </Appbar.Header>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={({ navigation }) => ({
      header: (props) => <CustomAppBar {...props} />,
    })}
  >
    <Drawer.Screen name="Home" component={PostList} />
    <Drawer.Screen name="Visão Administrativa" component={Admin} />
    <Drawer.Screen name="Professores" component={Professors} />
    <Drawer.Screen name="Estudantes" component={Students} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Criar Postagem" component={CreatePost} />
        <Stack.Screen name="Login" component={Login} 
          options={{ headerShown: false }}/>
        <Stack.Screen name="Criar Professor" component={CreateProfessor} />
        <Stack.Screen name="Criar Estudante" component={CreateStudent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}