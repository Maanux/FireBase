import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import Pet from "../types/Pet";
import StyledButton from "./StyledButton";

interface ViewPetProps {
  pet: Pet;
  onDelete: Function;
}

export default function ViewPet({ pet, onDelete }: ViewPetProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: "darkblue", borderTopWidth: 1, marginTop: 12 }}
    >
      <Text>id: {pet.id}</Text>
      <Text>Tipo: {pet.type}</Text>
      <Text>Nome: {pet.name}</Text>
      <Text>Idade: {pet.age}</Text>

      <View style={{ flexDirection: "row" }}>
        <StyledButton
          title="Ver Detalhes do Pet"
          onPress={() => {
            if (pet.id) {
              router.push(`/home/${pet.id}`);
            } else {
              Alert.alert(
                "Erro ao visualizar",
                "Não é possível acessar os detalhes do pet porque ele não tem um id!"
              );
            }
          }}
          style={{ width: "50%" }}
        />

        <StyledButton
          title="Excluir"
          onPress={() => {
            if (pet.id) {
              Alert.alert("Excluir o Pet?", "Você tem certeza?", [
                {
                  text: "Sim",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "Não",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "Erro ao excluir",
                "Não é possível excluir o pet porque ele não tem um id!"
              );
            }
          }}
          style={{ width: "50%", backgroundColor: "darkred" }}
        />
      </View>
    </View>
  );
}
