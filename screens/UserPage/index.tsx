import { Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { useEffect, useState } from "react";
import { obterUsuarioPorId, atualizarUsuario } from "../../services/api"; // adicionar função de atualização
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types/User";

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

export default function UserPage({ route, navigation }: Props) {
  const { token } = useAuth();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    obterUsuarioPorId(token, id)
      .then((data) => {
        if (data) {
          setUser(data);
          setUsername(data.username); // Preencher o campo de nome de usuário
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem.');
      return;
    }

    const updatedUser = await atualizarUsuario(token, id, { username, password });
    if (updatedUser) {
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      navigation.goBack(); // Retorna para a tela anterior após a atualização
    } else {
      Alert.alert('Erro', 'Erro ao atualizar usuário.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <NotFound>
        Usuário não encontrado
      </NotFound>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>ID</Text>
      <Text style={styles.value}>{user.id}</Text>

      <Text style={styles.label}>Função</Text>
      <Text style={styles.value}>{user.role}</Text>

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome de usuário"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Nova Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirme a Nova Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme a nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    color: '#666666',
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: "#433878",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
