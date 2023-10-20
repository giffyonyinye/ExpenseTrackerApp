import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinuDays } from "../util/date";
import { getExpenses } from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinuDays(today, 7);
    return expense.date >= date7daysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpense() {
      setIsLoading(true);
      try{
        const expenses = await getExpenses();
        expenseCtx.setExpenses(expenses)

      } catch(error) {
        setError('Could  not fetch expenses');
      }
      setIsLoading(false);
    }
    getExpense();
  }, []);



  if(error && isLoading) {
    return <ErrorOverlay message={error} />
  }

  if(isLoading) {
    return <LoadingOverlay/>
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 days"
      fallbackText="No Expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});