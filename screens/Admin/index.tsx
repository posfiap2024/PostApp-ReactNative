import { Button, View } from "react-native";

import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
  };
  

export default function Admin({ navigation }: Props) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Criar Postagem')}
          title="Criar post"
        />
      </View>
    );
  }