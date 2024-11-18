import './gesture-handler';

import { Text, TouchableOpacity, View } from 'react-native';
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
import CreateStudent from './screens/CreateStudent';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Post from './screens/Post';
import CreateUser from './screens/CreateUser';
import EditUser from './screens/EditUser';
import { useEffect, useState } from 'react';

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
  const { logout, user } = useAuth();

  return ( 
  <Appbar.Header style={styles.header}> 
    <Appbar.Action icon="menu" color="white" onPress={() => navigation.toggleDrawer()} /> 
    <Appbar.Content title="Postagens Escolares" titleStyle={styles.title} /> 
    
  {user ? ( 
    <TouchableOpacity style={styles.actionButton} onPress={logout}> 
      <Text style={styles.actionText}>Sair</Text> 
    </TouchableOpacity> 
  ) : ( 
    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Login')}> 
      <Text style={styles.actionText}>Login</Text> 
    </TouchableOpacity> 
  )}
  </Appbar.Header> ); 
};

const DrawerNavigator = () => {  
  const { user } = useAuth();
  const [usuarioAdmin, setUsuarioAdmin] = useState(false);
  const [usuarioProfessor, setUsuarioProfessor] = useState(false);
  
  useEffect(() => {
    if (user?.role === 'admin') {
      setUsuarioAdmin(true)
    } else if (user?.role === 'professor'){
      setUsuarioProfessor(true)
    } else {
      setUsuarioAdmin(false)
      setUsuarioProfessor(false)
    }
  }, [user]);

  return (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={() => ({
      header: (props) => <CustomAppBar {...props} />,
    })}
  >
    <Drawer.Screen name="Home" component={PostList} />

    {usuarioProfessor && ( 
      <>  
        <Drawer.Screen name="Visão Administrativa" component={Admin} /> 
      </>
    )}

    {usuarioAdmin && ( 
      <>  
        <Drawer.Screen name="Visão Administrativa" component={Admin} /> 
        <Drawer.Screen name="Professores" component={Professors} />
        <Drawer.Screen name="Estudantes" component={Students} />
      </>
    )}
    
    
  </Drawer.Navigator>
)};

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
          <Stack.Screen name="Criar Postagem" component={CreatePost}  options={{ headerShown: false }} />
          <Stack.Screen name="Editar Postagem" component={EditPost}  options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
          <Stack.Screen name="Criar Estudante" component={CreateStudent} />
          <Stack.Screen name="Criar Usuário" component={CreateUser} options={{ headerShown: false }} />
          <Stack.Screen name="Editar Usuário" component={EditUser} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = { 
  header: { backgroundColor: '#433878', }, 
  title: { color: 'white', }, 
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 10, }, 
  actionText: { color: 'white', marginLeft: 5, fontWeight: 'bold', }, 
};