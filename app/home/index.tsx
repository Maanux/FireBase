// app/index.tsx
import { faker } from "@faker-js/faker";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";
import { useCallback } from "react";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewPet from "../../components/ViewPet";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Pet from "../../types/Pet";

export default function Home() {
  const router = useRouter();
  const { data, create, remove, refreshData, loading } =
    useCollection<Pet>("pets");

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [])
  );

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Lista de Pets",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Adicionar um Novo Pet?</Text>

      <StyledButton
        title="Ir para o formulário de novo pet"
        onPress={() => router.push("./FormPet")}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewPet
              pet={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
