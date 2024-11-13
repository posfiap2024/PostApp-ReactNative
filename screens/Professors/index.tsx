import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, SectionList, ActivityIndicator, TouchableOpacity, RefreshControl } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useAuth } from "../../contexts/AuthContext";
import { obterUsuarios } from "../../services/api";
import { RootStackParamList } from "../../App";
import { UserCard } from "../../components/UserCard";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { Ionicons } from '@expo/vector-icons';
import { User } from "../../types/User";

type Props = DrawerScreenProps<RootStackParamList, "Professors">;

export default function Professors({ navigation }: Props) {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const sections = useMemo(
    () => [{ title: 'Usuários', data: users }],
    [users]
  );

  useEffect(() => {
    carregarUsuarios
  }, []);

  const carregarUsuarios = async () => {
    setLoading(true);
    const data = await obterUsuarios(token);
    if (data.length > 0) setUsers(data);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregarUsuarios();
    setRefreshing(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (!users.length) {
    return (
      <NotFound>
        Nenhum professor encontrado
      </NotFound>
    );
  }

  return (
    <LinearGradient style={styles.container} colors={["#433878", "#7E60BF"]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => '' + item.id!}
        renderItem={({ item }) => (
          <UserCard
            {...item}
            onPress={() => navigation.navigate('Usuário', { id: item.id! })}
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
        onPress={() => navigation.navigate("Adicionar Professor")} 
      >
        <Ionicons name="add" size={30} color="white" />
        <Text style={styles.fabText}>Adicionar Professor</Text>
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
