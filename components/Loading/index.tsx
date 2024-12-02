import { View, ActivityIndicator, StyleSheet } from 'react-native'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#cecece" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
