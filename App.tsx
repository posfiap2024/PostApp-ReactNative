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
import { AuthProvider } from './contexts/AuthContext';
import Post from './screens/Post';
import EditProfessor from './screens/EditProfessor';
import UserPage from './screens/UserPage';

export type RootStackParamList = {
  Drawer: undefined;
  Login: undefined;
  CreatePost: undefined;
  CreateProfessor: undefined;
  CreateStudent: undefined;
  Post: { id: number };
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const CustomAppBar = ({ navigation }: any) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content title="Aplicativo de Postagens Escolares" />
      <Appbar.Action icon="login" onPress={() => navigation.navigate('Login')} />
    </Appbar.Header>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={() => ({
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
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="CreateStudent" component={CreateStudent} />
          <Stack.Screen name="CreateProfessor" component={CreateProfessor} />
          <Stack.Screen name="EditProfessor" component={EditProfessor} />
          <Stack.Screen name="UserPage" component={UserPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
