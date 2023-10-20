import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ExpenseItem from './ExpenseItem'

function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item}/>
}

const ExpensesList = ({expenses}) => {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id}/>
  )
}

export default ExpensesList

const styles = StyleSheet.create({})