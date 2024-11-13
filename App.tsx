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
import EditPost from './screens/EditPost';
import Login from './screens/Login';
import CreateProfessor from './screens/CreateProfessor';
import CreateStudent from './screens/CreateStudent';
import { AuthProvider } from './contexts/AuthContext';
import Post from './screens/Post';
import ProfessorList from './screens/EditProfessor';
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
  <Appbar.Header style={styles.header}> 
    <Appbar.Action icon="menu" color="white" onPress={() => navigation.toggleDrawer()} /> 
    <Appbar.Content title="Postagens Escolares" titleStyle={styles.title} /> 
    <Appbar.Action icon="login" color="white" onPress={() => navigation.navigate('Login')} /> 
  </Appbar.Header> ); 
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
          <Stack.Screen name="Criar Postagem" component={CreatePost}  options={{ headerShown: false }}/>
          <Stack.Screen name="Editar Postagem" component={EditPost}  options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
          <Stack.Screen name="Criar Estudante" component={CreateStudent} />
          <Stack.Screen name="Criar Professor" component={CreateProfessor} />
          <Stack.Screen name="Lista de Professores" component={ProfessorList} />
          <Stack.Screen name="Usuário" component={UserPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = { header: { backgroundColor: '#433878', }, title: { color: 'white', } };