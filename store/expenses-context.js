import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 8.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 9.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 29.99,
    date: new Date("2022-02-18"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state]
      // return [{ ...action.payload, id: id }, ...state];
    case "SET": 
    const inverted = action.payload.reverse();
    return inverted;
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpenses = state[updateExpenseIndex];
      const updatedItem = { ...updateExpenses, ...action.payload.data };
      const updatedExpenses = [...state];
      updateExpenses[updateExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({type: "SET", payload: expenses})
  }

  function deleteExpense(id, expenseData) {
    dispatch({ type: "DELETE", payload: { id: id, data: expenseData } });
  }

  function updateExpense(id) {
    dispatch({ type: "UPDATE", payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
