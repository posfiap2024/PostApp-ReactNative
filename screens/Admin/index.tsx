import { Button, View } from "react-native";
import { useEffect } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../../App";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
    navigation: NavigationProp<any>;
};

export default function Admin({ navigation }: Props) {
  const { token, user } = useAuth();

  useEffect(() => {
    console.log('TOKEN: ', token)
    console.log('USER: ', user)
  }, [token]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Criar Postagem')}
        title="Criar post"
      />
      <Button
        onPress={() => navigation.navigate('Editar Postagem')}
        title="Editar post"
      />
    </View>
  );
}