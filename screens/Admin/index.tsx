import React, { useEffect, useMemo, useState } from "react";
import { Text, SectionList, StyleSheet, ActivityIndicator, View, TouchableOpacity, RefreshControl } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from "../../contexts/AuthContext";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { obterPostsAdmin } from "../../services/api";
import { Ionicons } from '@expo/vector-icons';
import AdminPostCard from "../../components/AdminPostCard";

type Props = {
  navigation: NavigationProp<any>;
};

export default function Admin({ navigation }: Props) {
  type Post = {
    id: string;
    title: string;
    content: string;
    author: string;
    status: string;
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    carregarPosts
  }, []);

  const sections = useMemo(
    () => [
      {
        title: "Painel Administrativo",
        data: posts,
      },
    ],
    [posts]
  );

  const carregarPosts = async () => {
    setLoading(true);
    const postsCarregados = await obterPostsAdmin(token);
    setPosts(postsCarregados);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregarPosts();
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarPosts();
    }, [])
  );

  if (loading) { 
    return ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> 
      </View> 
    );
  }

  return (
    <LinearGradient style={styles.lista} colors={["#433878", "#7E60BF"]}>
      {/* Título e Botão Criar Postagem */}
      {/* <Text style={styles.title}>Painel Administrativo</Text>
      
      <TouchableOpacity style={styles.createButtonContainer} onPress={() => navigation.navigate("Criar Postagem")}>
        <LinearGradient
          colors={['#7E60BF', '#433878']}
          style={styles.createButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.createButtonText}>Criar Post</Text>
        </LinearGradient>
      </TouchableOpacity> */}

      {/* Lista de Cards de Post */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => "" + item.id}
        renderItem={({ item }) => <AdminPostCard carregarPosts={carregarPosts} navigation={navigation} post={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("Criar Postagem")} > 
          <Ionicons name="add" size={30} color="white" /> 
          <Text style={styles.fabText}>Adicionar Post</Text> 
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  lista: {
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
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  createButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  createButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
