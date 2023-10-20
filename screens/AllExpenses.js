import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

const AllExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);
  return (
   <ExpensesOutput expenses={expenseCtx.expenses} periodName="Total" fallbackText="No Expenses created"/>
  )
}

export default AllExpenses

const styles = StyleSheet.create({})