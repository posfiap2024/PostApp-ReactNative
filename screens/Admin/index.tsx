import React, { useEffect, useMemo, useState } from "react";
import { Text, SectionList, StyleSheet, ActivityIndicator, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { NavigationProp } from "@react-navigation/native";
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
    <SectionList
      sections={sections}
      keyExtractor={(item) => "" + item.id}
      renderItem={({ item }) => <AdminPostCard carregarPosts={carregarPosts} navigation={navigation} post={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.title}>{title}</Text>
      )}
    />
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
});
