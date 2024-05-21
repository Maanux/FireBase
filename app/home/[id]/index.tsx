import { faker } from "@faker-js/faker";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Pet from "../../../types/Pet"; // Correção aqui

export default function PetDetails() {
  // Correção aqui
  const { id } = useGlobalSearchParams();

  // for convenience, you can extract data and rename it to "pet" by typing data:your_alias_for_data
  const {
    data: pet, // Correção aqui
    loading,
    upsert,
  } = useDocument<Pet>("pets", id as string); // Correção aqui

  // important: always check for loading state since firestore is async!
  // Also, you can check for existence of pet object so your type Pet | undefined becomes a Pet for sure
  if (loading || !pet) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Pet", // Correção aqui
          headerRight: () => <HeaderRight />,
        }}
      />
      <Text style={globalStyles.title}>Pet Details</Text> // Correção aqui
      <Text>id: {id}</Text>
      <Text>Type: {pet.type}</Text> // Correção aqui
      <Text>Name: {pet.name}</Text> // Correção aqui
      <Text>Age: {pet.age}</Text> // Correção aqui
      <StyledButton
        title="Random Update"
        onPress={async () => {
          try {
            await upsert({
              ...pet, // Correção aqui
              type: faker.animal.type(), // Atualizando type
              name: faker.name.fullName(), // Atualizando name
              age: faker.datatype.number({ max: 20 }), // Atualizando age
            });
          } catch (error: any) {
            Alert.alert("Update Pet error", error.toString()); // Correção aqui
          }
        }}
      />
    </View>
  );
}
