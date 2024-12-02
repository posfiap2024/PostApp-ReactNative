
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Appbar } from 'react-native-paper';


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

  
const styles = { 
    header: { backgroundColor: '#433878', }, 
    title: { color: 'white', }, 
    actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 10, }, 
    actionText: { color: 'white', marginLeft: 5, fontWeight: 'bold', }, 
  };

export default CustomAppBar;