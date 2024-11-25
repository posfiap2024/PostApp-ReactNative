import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from '../../contexts/AuthContext';
import { criarUsuario } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

const rolePtBr = {
  student: 'estudante',
  professor: 'professor',
  admin: 'administrador',
};

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const navigation = useNavigation();
  const route = useRoute();
  const role = route.params;

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (token) {
      const novoUsuario = await criarUsuario(token, role, username, password);
      if (novoUsuario) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao criar usuário.');
      }
    }
    else {
        Alert.alert('Erro', 'Usuário não logado.');
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Text style={styles.title}>Criação de Usuário</Text>
        
        <Text style={styles.readOnlyField}>Função: {rolePtBr[role] || role}</Text>

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
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(''); // Limpa o erro ao alterar a senha
          }}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError(''); // Limpa o erro ao alterar a confirmação da senha
          }}
          secureTextEntry
        />
        
        {/* Exibe a mensagem de erro se as senhas não coincidirem */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Criar Usuário</Text>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  readOnlyInput: {
    backgroundColor: "#E0E0E0",
  },
  readOnlyField: {
    textAlign: "left", // Centraliza o texto horizontalmente
    fontSize: 16, // Um tamanho de fonte confortável para leitura
    color: "#6D6D6D", // Um cinza escuro para indicar que o campo é somente leitura
    backgroundColor: "transparent", // Remove qualquer fundo
    paddingVertical: 10, // Adiciona espaçamento vertical
  },
  errorText: {
    color: "red",
    textAlign: "center",
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

export default CreateUser;
