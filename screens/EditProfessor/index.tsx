import { StyleSheet, Text, View, SectionList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PostCard } from "../../components/PostCard";
import { useEffect, useMemo, useState } from "react";
import { obterUsuarios } from "../../services/api";
import { RootStackParamList } from "../../App";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { Post } from "../../types/Post";
import { User } from "../../types/User";
import { UserCard } from "../../components/UserCard";
import { useAuth } from "../../contexts/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

type Props = DrawerScreenProps<RootStackParamList, any>;

export default function EditProfessor({ navigation }: Props) {

    const { token, user } = useAuth();

    useEffect(() => {
        console.log('TOKEN: ', token)
        console.log('USER: ', user)
    }, [token]);


  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])

  const sections = useMemo(() => ([
    {
      title: 'Usuários',
      data: users,
    }
  ]), [users])

  useEffect(() => {
    obterUsuarios(token).then((data) => {
      if (data.length > 0) {
        setUsers(data)
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!users.length) {
    return (
      <NotFound>
        Nenhum professor encontrado
      </NotFound>
    )
  }

  return (
    <View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <SectionList
        sections={sections}
        keyExtractor={item => ''+item.id!}
        renderItem={
            ({ item }) => (
            <UserCard
                {...item}
                onPress={() => navigation.navigate('UserPage', { id: item.id! })}
            />
            )
        }
        renderSectionHeader={
            ({ section: { title } }) => (
            <Text style={styles.title}>
                {title}
            </Text>
            )
        }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
})
