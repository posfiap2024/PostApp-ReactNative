import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet,Text,TouchableOpacity, StatusBar, Modal, Pressable,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones

export default function Login() {
  
  const [screenUser, setScreenUser] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigation = useNavigation();

  const { token, user, login, logout } = useAuth();

  const handleButtonPress = async () => {
    await login(screenUser, password);
    
    if (token) {
      navigation.goBack();
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.modal}>
        <Text style={styles.title}>Post App</Text>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#888"
          onChangeText={(inputText) => setScreenUser(inputText)}
          value={user}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText={(inputText) => setPassword(inputText)}
          value={password}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleButtonPress}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showErrorModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.errorModal}>
            <Text style={styles.errorText}>Login ou senha inválidos</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative', // Adicionado para controle absoluto do botão
  },
  backButton: {
    position: 'absolute',
    top: 20, // Ajuste conforme necessário
    left: 20, // Ajuste conforme necessário
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
    marginBottom: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  errorModal: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#FF0000",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#433878",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
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
