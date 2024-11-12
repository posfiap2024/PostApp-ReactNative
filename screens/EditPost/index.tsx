import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { obterPostPorId, atualizarPost } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const EditPost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { token } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const carregarDadosDoPost = async () => {
      try {
        const post = await obterPostPorId(id, token);
        setTitulo(post.title);
        setConteudo(post.content);
        setStatus(post.status);
      } catch (error) {
        console.error('Erro ao carregar dados do post:', error);
      }
    };

    carregarDadosDoPost();
  }, [id, token]);

  const handleUpdatePost = async () => {
    const sucesso = await atualizarPost(token, id, {
      title: titulo,
      content: conteudo,
      status,
    });
  
    if (sucesso) {
      Alert.alert("Sucesso", "Post atualizado com sucesso!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Falha ao atualizar o post. Verifique os detalhes e tente novamente.");
    }
  };
  
  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Text style={styles.title}>Edição de Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conteúdo"
          placeholderTextColor="#888"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleUpdatePost}>
          <Text style={styles.submitButtonText}>Atualizar Post</Text>
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

export default EditPost;
