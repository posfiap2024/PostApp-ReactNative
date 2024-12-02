import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, KeyboardAvoidingView, Platform, Animated, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { obterPostPorId, atualizarPost } from '../../services/posts';
import { useAuth } from '../../contexts/AuthContext';

const EditPost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { token } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const carregarDadosDoPost = async () => {
    try {
      const post = await obterPostPorId(id);
      setTitulo(post.title);
      setConteudo(post.content);
    } catch (error) {
      console.error('Erro ao carregar dados do post:', error);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1100,
      useNativeDriver: true,
    }).start();

    carregarDadosDoPost();
  }, []);

  const handleUpdatePost = async () => {
    const sucesso = await atualizarPost(token, id, {
      title: titulo,
      content: conteudo,
      status: 'draft',
    });

    if (sucesso) {
      Alert.alert("Sucesso", "Post atualizado com sucesso!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Falha ao atualizar o post. Verifique os detalhes e tente novamente.");
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await carregarDadosDoPost();
    setIsRefreshing(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.title}>Edição de Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="#A9A9A9"
              value={titulo}
              onChangeText={setTitulo}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conteúdo"
              placeholderTextColor="#A9A9A9"
              value={conteudo}
              onChangeText={setConteudo}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleUpdatePost}>
              <Text style={styles.submitButtonText}>Atualizar Post</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        <StatusBar barStyle="light-content" />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modal: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#433878",
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: "#D1D1D1",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F7F7F7",
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: "#433878",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: "#433878",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 18,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
});

export default EditPost;
