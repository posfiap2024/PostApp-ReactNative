import { Text, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { useEffect, useState } from "react";
import { obterUsuarioPorId } from "../../services/api";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types/User";

type Props = NativeStackScreenProps<RootStackParamList, 'User'>;

export default function User({ route }: Props) {


  const { token } = useAuth();

  useEffect(() => {
    console.log('TOKEN: ', token)
    console.log('USER: ', user)
  }, [token]);

  const { id } = route.params;
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    obterUsuarioPorId(token, id).then(
      (data) => {
        if (data) {
          setUser(data)
        }
      }
    )
  })

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return (
      <NotFound>
        Usuário não encontrado
      </NotFound>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {user.id}
      </Text>

      <Text style={styles.author}>
        {user.role}
      </Text>

      <Text style={styles.body}>
        {user.username}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  author: {
    fontSize: 16,
    color: '#666666'
  },
  body: {
    fontSize: 16,
    marginTop: 20
  }
})
