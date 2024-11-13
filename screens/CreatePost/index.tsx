import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../../contexts/AuthContext';
import { criarPost } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

const CreatePost = () => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const { token } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (token) {
      const novoPost = await criarPost(token, titulo, conteudo, 'draft');
      if (novoPost) {
        Alert.alert('Sucesso', 'Post criado com sucesso!');
        setTitulo('');
        setConteudo('');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao criar post.');
      }
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Text style={styles.title}>Criação de Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conteúdo"
          placeholderTextColor="#888"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Post</Text>
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
  textArea: {
    height: 80,
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

export default CreatePost;
