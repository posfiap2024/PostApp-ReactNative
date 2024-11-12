import { StyleSheet, Text, View, SectionList, RefreshControl } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PostCard } from "../../components/PostCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { obterPosts } from "../../services/api";
import { RootStackParamList } from "../../App";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { Post } from "../../types/Post";
import { useFocusEffect } from "@react-navigation/native";

type Props = DrawerScreenProps<RootStackParamList, any>;

export default function PostList({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const sections = useMemo(
    () => [
      {
        title: "Últimas postagens",
        data: posts.map(post => ({
          ...post,
          content: post.content
            .slice(0, 100)
            .concat('...'),
        })),
      },
    ],
    [posts]
  );

  const carregarPosts = async () => {
    setLoading(true);
    const data = await obterPosts();
    if (data.length > 0) {
      setPosts(data);
    }
    setLoading(false);
  };

  // Função para atualizar ao arrastar para baixo
  const handleRefresh = async () => {
    setRefreshing(true);
    await carregarPosts();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      carregarPosts();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  if (!posts.length) {
    return <NotFound>Nenhum post encontrado</NotFound>;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => "" + item.id!}
      renderItem={({ item }) => (
        <PostCard
          {...item}
          onPress={() => navigation.navigate("Post", { id: item.id! })}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.title}>{title}</Text>
      )}
      // Configuração para atualização ao arrastar para baixo
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
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
