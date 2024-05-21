// app/FormPet.tsx
import { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import StyledButton from "../../components/StyledButton";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Pet from "../../types/Pet";

export default function FormPet() {
  const router = useRouter();
  const { create, refreshData } = useCollection<Pet>("pets");

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSave = async () => {
    if (!type || !name || !age) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      await create({
        type,
        name,
        age: parseInt(age, 10),
      });

      await refreshData();
      router.back();
    } catch (error: any) {
      Alert.alert("Erro ao criar pet", error.toString());
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={globalStyles.input}
      />
      <StyledButton title="Salvar Pet" onPress={handleSave} />
    </View>
  );
}
