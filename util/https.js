const url = "https://react-native-tutorial-3722b-default-rtdb.firebaseio.com"

export async function storeExpense(expenseData) {
   const response = await fetch(`${url}/expenses.json`, {
        method: "POST",
        body: expenseData
    });
    const id = response.data.name;
    return id;
}

export async function getExpenses() {
    const response = await fetch(`${url}/expenses.json`, {
        method: "GET",
    })

    const expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj)
    }
    return expenses;
}

export function updatedExpense(id, expenseData) {
      fetch(`${url}/expenses/${id}.json`, {
        method: "PUT",
        body: expenseData
    })
}

export function deleteExpense(id) {
    fetch(`${url}/expenses/${id}.json`, {
        method: "DELETE",
    })
}