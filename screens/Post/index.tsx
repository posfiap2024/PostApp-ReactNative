import { Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

export default function Post({ route, navigation }: Props) {
  const { id } = route.params;

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
