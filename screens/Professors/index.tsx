import { Button, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../../App";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  navigation: NavigationProp<any>;
};

export default function Professors({ navigation }: Props) {

    const { token, user } = useAuth();

    useEffect(() => {
      console.log('TOKEN: ', token)
      console.log('USER: ', user)
    }, [token]);

    return (
      <View style={{ flex: 1, alignItems: 'center',  justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Criar Professor')}
          title="Criar professor"
        />

      <Button
          onPress={() => navigation.navigate('Lista de Professores')}
          title="Lista de Professores"
        />
      </View>
    );
  }