import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Buttons from "../UI/Buttons";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInput((current) => {
      return {
        ...current,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() === "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInput((current) => {
        return {
          amount: { value: current.amount.value, isValid: amountIsValid },
          date: { value: current.date.value, isValid: dateIsValid },
          description: {
            value: current.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <Input
        label="Amount"
        invalid={!input.amount.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeHandler.bind(this, "amount"),
          value: input["amount"].value,
        }}
      />
      <Input
        label="Date"
        invalid={!input.date.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: input["date"].value,
        }}
      />
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false,
          // autoCapitalize: "sentences",
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input["description"].value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid Input, Input correct data</Text>}

      <View style={styles.buttons}>
        <Buttons style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Buttons>
        <Buttons style={styles.button} onPress={submitHandler}>
          {/* {isEditing ? "Update" : "Add"} */}
          {submitButtonLabel}
        </Buttons>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign :"center",
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});
