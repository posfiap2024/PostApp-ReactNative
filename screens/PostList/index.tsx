import { StyleSheet, Text, View, SectionList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PostCard } from "../../components/PostCard";
import { useEffect, useMemo, useState } from "react";
import { obterPosts } from "../../services/api";
import { RootStackParamList } from "../../App";

type Props = DrawerScreenProps<RootStackParamList, any>;

export default function PostList({ navigation }: Props) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Author 1',
      title: 'Post 1',
      content: 'Conteúdo do post 1',
    },
    {
      id: 2,
      author: 'Author 2',
      title: 'Post 2',
      content: 'Conteúdo do post 2',
    },
    {
      id: 3,
      author: 'Author 3',
      title: 'Post 3',
      content: 'Conteúdo do post 3',
    },
    {
      id: 4,
      author: 'Author 4',
      title: 'Post 4',
      content: 'Conteúdo do post 4',
    },
    {
      id: 5,
      author: 'Author 5',
      title: 'Post 5',
      content: 'Conteúdo do post 5',
    },
    {
      id: 6,
      author: 'Author 6',
      title: 'Post 6',
      content: 'Conteúdo do post 6',
    },
  ])

  const sections = useMemo(() => ([
    {
      title: 'Últimas postagens',
      data: posts,
    }
  ]), [posts])

  useEffect(() => {
    obterPosts().then((data) => {
      if (data.length > 0) {
        setPosts(data)
      }
    })
  }, [])

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => String(item.id)}
      renderItem={
        ({ item }) => (
          <PostCard
            {...item}
            onPress={() => navigation.navigate('Post', { id: item.id })}
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
