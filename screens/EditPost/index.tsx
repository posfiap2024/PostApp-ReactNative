import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { obterPostPorId, atualizarPost } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

const EditPost = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = 'd6790e78-e5a6-42d8-8431-babf4f0e1f73'; //mockado route.params erro

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const post = await obterPostPorId(id);
        setTitulo(post.title);
        setConteudo(post.content);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdatePost = async () => {
    try {
      const updatedPost = await atualizarPost(id, { title: titulo, content: conteudo });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      console.log('Post atualizado com sucesso:', updatedPost);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar post.');
      console.error('Erro ao atualizar post:', error);
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
