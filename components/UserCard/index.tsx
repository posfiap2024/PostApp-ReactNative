import { StyleSheet, Text, View, Pressable } from "react-native";

type Props = {
  username: string
  role: string,
  onPress?: () => void
}

export function UserCard({ username, role, onPress }: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.1)',
          borderless: false,
          foreground: true
        }}
        style={styles.press}
        onPress={onPress}
      >
        {/* <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {author &&
            <Text style={styles.author}>
              {author}
            </Text>
          }
        </View> */}
        <Text>
          Nome: {username}
        </Text>
        <Text>
          Função: {role}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  press: {
    gap: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  author: {
    fontSize: 12,
    color: '#666666'
  }
})
