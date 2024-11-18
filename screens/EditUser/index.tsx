import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { obterUsuarioPorId, atualizarUsuario } from '../../services/api';  // Assumindo que esses métodos estão implementados
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const EditUser = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { token } = useAuth();

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarDadosDoUsuario = async () => {
      try {
        const usuario = await obterUsuarioPorId(token, id);
        setUsername(usuario.username);
        setRole(usuario.role);  // role não pode ser editado
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    carregarDadosDoUsuario();
  }, [id, token]);

  const handleUpdateUser = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (token) {
      const sucesso = await atualizarUsuario(
        token, 
        id, 
        username,
        password,
        role,
      );

      if (sucesso) {
        Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao atualizar o usuário. Verifique os detalhes e tente novamente.");
      }
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Text style={styles.title}>Edição de Usuário</Text>

        {/* Campo de Role com seleção */}
        <Text style={styles.label}>Função</Text>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Administrador" value="admin" />
          <Picker.Item label="Professor" value="professor" />
          <Picker.Item label="Estudante" value="student" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <TouchableOpacity style={styles.submitButton} onPress={handleUpdateUser}>
          <Text style={styles.submitButtonText}>Atualizar Usuário</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  modal: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#433878",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#433878',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: "#F5F5F5",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#433878",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditUser;
