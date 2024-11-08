import React, { useEffect, useMemo, useState } from "react";
import { Text, SectionList, StyleSheet, ActivityIndicator, View, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { NavigationProp } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones
import { obterPostsAdmin } from "../../services/api";
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

  const { token } = useAuth();

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

  useEffect(() => {
    carregarPosts();
  }, [token]);

  if (loading) { 
    return ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> 
      </View> 
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => "" + item.id}
        renderItem={({ item }) => <AdminPostCard carregarPosts={carregarPosts} navigation={navigation} post={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Criar Postagem')}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.fabText}>Criar Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  }, 
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 16,
    elevation: 5,
  },
  fabText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
