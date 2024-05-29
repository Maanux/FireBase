import { useState, useEffect } from "react";
import { Alert, TextInput, View } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";

import StyledButton from "../../components/StyledButton";
import useDocument from "../../firebase/hooks/useDocument";
import globalStyles from "../../styles/globalStyles";
import Pet from "../../types/Pet";
import Loading from "../../components/Loading";

export default function EditPet() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { data: pet, loading, upsert } = useDocument<Pet>("pets", id as string);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (pet) {
      setType(pet.type);
      setName(pet.name);
      setAge(pet.age.toString());
    }
  }, [pet]);

  const handleSave = async () => {
    if (!type || !name || !age) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      await upsert({
        type,
        name,
        age: parseInt(age, 10),
      });

      router.back();
    } catch (error: any) {
      Alert.alert("Erro ao editar pet", error.toString());
    }
  };

  if (loading) {
    return <Loading />;
  }

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
