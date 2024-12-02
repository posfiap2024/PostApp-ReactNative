import { ReactNode } from "react"
import { StyleSheet, View, Text } from "react-native"

type Props = {
  children: ReactNode
}

export function NotFound({ children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '#2e2e2e'
  }
})
