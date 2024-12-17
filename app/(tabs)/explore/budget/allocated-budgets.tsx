// // import React from "react";
// // import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
// // import { Card, Title, Paragraph } from "react-native-paper";
// // import { useNavigation } from "@react-navigation/native";
// // import { useBudget } from "./BudgetContext";

// // export default function AllocatedBudgets() {
// //   const navigation = useNavigation();
// //   const { budgets, schools } = useBudget();

// //   const schoolBudgets = schools.map((school) => {
// //     const schoolBudgets = budgets.filter((b) => b.schoolId === school.id);
// //     const totalAmount = schoolBudgets.reduce(
// //       (sum, b) => sum + b.totalAmount,
// //       0
// //     );
// //     const allocatedAmount = schoolBudgets.reduce(
// //       (sum, b) => sum + b.allocatedAmount,
// //       0
// //     );
// //     return { school, totalAmount, allocatedAmount };
// //   });

// //   return (
// //     <ScrollView style={styles.container}>
// //       {schoolBudgets.map(({ school, totalAmount, allocatedAmount }) => (
// //         // <TouchableOpacity
// //         //   key={school.id}
// //         //   onPress={() =>
// //         //     navigation.navigate("/your-budget", { schoolId: school.id })
// //         //   }
// //         // >
// //         <Card style={styles.card}>
// //           <Card.Content>
// //             <Title>{school.name}</Title>
// //             <View style={styles.budgetInfo}>
// //               <Paragraph>
// //                 Total Budget: ${totalAmount.toLocaleString()}
// //               </Paragraph>
// //               <Paragraph>
// //                 Allocated: ${allocatedAmount.toLocaleString()}
// //               </Paragraph>
// //             </View>
// //           </Card.Content>
// //         </Card>
// //         // </TouchableOpacity>
// //       ))}
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: "#f5f5f5",
// //   },
// //   card: {
// //     marginBottom: 16,
// //   },
// //   budgetInfo: {
// //     marginTop: 8,
// //   },
// // });

// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useBudget } from "./BudgetContext";
// import { useNavigation } from "@react-navigation/native";
// import { Link } from "expo-router";

// export default function BudgetListScreen() {
//   const { budgets } = useBudget();
//   const navigation = useNavigation();

//   // const handlePress = (budgetId: string) => {
//   //   navigation.navigate("BudgetDetail", { budgetId });
//   // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Budgets</Text>
//       <FlatList
//         data={budgets}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.itemContainer}>
//             <Link href={`/(tabs)/explore/budget/${[item.id]}/budget-detail`}>
//               <Text style={styles.itemTitle}>{item.description}</Text>
//               <Text style={styles.itemSubTitle}>
//                 Total: ${item.totalAmount.toLocaleString()} | Remaining: $
//                 {item.remainingAmount.toLocaleString()}
//               </Text>
//             </Link>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   itemContainer: {
//     padding: 15,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   itemSubTitle: {
//     fontSize: 14,
//     color: "#555",
//   },
// });

import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useBudget } from "./BudgetContext";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export default function BudgetListScreen() {
  const { budgets } = useBudget();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets Overview</Text>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={`/(tabs)/explore/budget/${item.id}/budget-detail`}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.itemTitle}>{item.description}</Text>
                <View
                  style={[
                    styles.statusIndicator,
                    {
                      backgroundColor:
                        item.remainingAmount > 0 ? "#4CAF50" : "#F44336",
                    },
                  ]}
                />
              </View>
              <Text style={styles.itemDetail}>
                Total Budget:{" "}
                <Text style={styles.totalAmount}>
                  ${item.totalAmount.toLocaleString()}
                </Text>
              </Text>
              <Text style={styles.itemDetail}>
                Remaining Budget:{" "}
                <Text
                  style={[
                    styles.remainingAmount,
                    {
                      color: "#333",
                    },
                  ]}
                >
                  ${item.remainingAmount.toLocaleString()}
                </Text>
              </Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    // textAlign: "center",
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // color: "#fff",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ea495c",
  },
  itemDetail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  totalAmount: {
    fontWeight: "bold",
    color: "#333",
  },
  remainingAmount: {
    fontWeight: "bold",
  },
});
