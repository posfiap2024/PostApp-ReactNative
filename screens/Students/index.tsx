import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  navigation: NavigationProp<any>;
};

export default function Students({ navigation }: Props) {
  const { token, user } = useAuth();
  
  useEffect(() => {
    console.log('TOKEN: ', token);
    console.log('USER: ', user);
  }, [token]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Criar Aluno')}
      >
        <Text style={styles.buttonText}>Criar aluno</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Lista de Alunos')}
      >
        <Text style={styles.buttonText}>Lista de Alunos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#0056b3',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});