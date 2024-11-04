import React, { useEffect, useMemo, useState } from "react";
import { Text, SectionList, StyleSheet } from "react-native";
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

  useEffect(() => {
    const carregarPosts = async () => {
      const postsCarregados = await obterPostsAdmin(token);
      setPosts(postsCarregados);
      console.log(postsCarregados);
    };
    carregarPosts();
  }, [token]);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => "" + item.id}
      renderItem={({ item }) => <AdminPostCard post={item} />}
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
});
