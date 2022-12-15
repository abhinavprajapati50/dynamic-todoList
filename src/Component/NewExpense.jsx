import React from 'react'
import style from './Css/NewExpense.module.css'
import { ExpenseForm } from './ExpenseForm'
export const NewExpense = (props) => {
  const onCreateNewExpense = (expenseDetails) => {
    const expenseData = {
      id: Math.random(),
      ...expenseDetails,

      //   title: expenseDetails.title,
      //   amount: expenseDetails.amount,
      //   date: expenseDetails.date,
    }
    props.onSubmit(expenseData)
    console.log('=========', expenseData)
  }
  return (
    <div className={style.newexpense}>
      <h3> New Expense</h3>
      <ExpenseForm onCreateNewExpense={onCreateNewExpense} />
    </div>
  )
}
