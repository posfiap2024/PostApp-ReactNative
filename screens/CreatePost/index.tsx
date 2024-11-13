import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, KeyboardAvoidingView, Platform, Animated } from 'react-native';
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
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        
        <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Nova postagem</Text>
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
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Publicar</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <StatusBar style="light" />
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
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default CreatePost;
