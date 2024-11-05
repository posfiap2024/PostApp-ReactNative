import { StyleSheet, Text, View, SectionList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PostCard } from "../../components/PostCard";
import { useEffect, useMemo, useState } from "react";
import { obterPosts } from "../../services/api";
import { RootStackParamList } from "../../App";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import { Post } from "../../types/Post";

type Props = DrawerScreenProps<RootStackParamList, any>;

export default function PostList({ navigation }: Props) {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  const sections = useMemo(() => ([
    {
      title: 'Últimas postagens',
      data: posts.map(post => ({
        ...post,
        content: post.content
          .slice(0, 100)
          .concat('...'),
      })),
    }
  ]), [posts])

  useEffect(() => {
    obterPosts().then((data) => {
      if (data.length > 0) {
        setPosts(data)
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!posts.length) {
    return (
      <NotFound>
        Nenhum post encontrado
      </NotFound>
    )
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => ''+item.id!}
      renderItem={
        ({ item }) => (
          <PostCard
            {...item}
            onPress={() => navigation.navigate('Post', { id: item.id! })}
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
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8
  }
})
