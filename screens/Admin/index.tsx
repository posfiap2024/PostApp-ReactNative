import { Button, View } from "react-native";

import { NavigationProp } from '@react-navigation/native';
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

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
      </View>
    );
  }