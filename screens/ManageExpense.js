import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Buttons from "../components/UI/Buttons";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updatedExpense, deleteExpense } from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch(error) {
      setError("Could not delete  expense - please try again later")
      setLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    isLoading(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updatedExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }

    } catch(error) {
      setError("Could not save data, try again")
      setLoading(false)
    }
    navigation.goBack();
  }


  if(error && isLoading) {
    return <ErrorOverlay message={error} />
  }

  if(isLoading) {
    return <LoadingOverlay/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
