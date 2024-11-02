import { Button, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../../App";

type Props = DrawerScreenProps<RootStackParamList, any>;

export default function Professors({ navigation }: Props) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('CreateProfessor')}
          title="Criar professor"
        />
      </View>
    );
  }
