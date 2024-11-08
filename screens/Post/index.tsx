import { Text, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { useEffect, useState } from "react";
import { obterPostPorId } from "../../services/api";
import { Loading } from "../../components/Loading";
import type { Post } from "../../types/Post";
import { NotFound } from "../../components/NotFound";

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

export default function Post({ route }: Props) {
  const { id } = route.params;
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<Post | undefined>()

  useEffect(() => {
    obterPostPorId(id)
      .then(
        (data) => {
          if (data) {
            setPost(data)
          }
        }
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!post) {
    return (
      <NotFound>
        Post não encontrado
      </NotFound>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {post.title}
      </Text>

      <Text style={styles.author}>
        {post.author}
      </Text>

      <Text style={styles.body}>
        {post.content}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  author: {
    fontSize: 16,
    color: '#666666'
  },
  body: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 24
  }
})
