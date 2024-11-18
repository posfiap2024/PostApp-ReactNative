import './gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
import CustomAppBar from './components/CustomAppBar';
import ProfessorList from './screens/EditProfessor';
import StudentList from './screens/EditStudent';
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
          <Stack.Screen name="Criar Aluno" component={CreateStudent} />
          <Stack.Screen name="Criar Professor" component={CreateProfessor} />
          <Stack.Screen name="Lista de Professores" component={ProfessorList} />
          <Stack.Screen name="Lista de Alunos" component={StudentList} />
          <Stack.Screen name="Usuário" component={UserPage} />
          <Stack.Screen name="Criar Estudante" component={CreateStudent} />
          <Stack.Screen name="Criar Usuário" component={CreateUser} options={{ headerShown: false }} />
          <Stack.Screen name="Editar Usuário" component={EditUser} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}