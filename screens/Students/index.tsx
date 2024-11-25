import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, SectionList, RefreshControl, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { excluirUsuario, obterUsuariosPorFuncao } from "../../services/api";
import { UserCard } from "../../components/UserCard";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { Ionicons } from '@expo/vector-icons';
import { User } from "../../types/User";

type Props = {
  navigation: NavigationProp<any>;
};

export default function Alunos({ navigation }: Props) {

  
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const sections = useMemo(
    () => [
      { 
        title: 'Alunos', 
        data: users 
      }
    ],
    [users]
  );

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    setLoading(true);
    const data = await obterUsuariosPorFuncao(token, 'student');
    if (data.length > 0) setUsers(data);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregarAlunos();
    setRefreshing(false);
  };

  const handleEditUser = (id: number) => {
    navigation.navigate('Editar Usuário', { id });
  };

  const handleDeleteUser = async (id: number) => {
    await excluirUsuario(token, id);
    carregarAlunos(); 
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarAlunos();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  if (!users.length) {
    return <NotFound>Nenhum aluno encontrado</NotFound>;
  }

  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => '' + item.id}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            username={item.username}
            role={item.role}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("Criar Usuário", "student")}

      >
        <Ionicons name="add" size={30} color="white" />
        <Text style={styles.fabText}>Adicionar Aluno</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  fab: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    right: 16, 
    bottom: 16, 
    backgroundColor: '#E6A569', 
    borderRadius: 30, 
    padding: 16, 
    elevation: 5, 
  }, 
  fabText: { 
    color: 'white', 
    marginLeft: 8, 
    fontSize: 18, 
    fontWeight: 'bold',
  },
});