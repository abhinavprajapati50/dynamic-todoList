import React, { useState } from 'react'
import style from './Css/ExpenseForm.module.css'

export const ExpenseForm = (props) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(title, amount, date)
    const expenseData = {
      expenceTitle: title,
      expencePrice: amount,
      expenceDate: date.replace('-', ','),
    }
    props.onCreateNewExpense(expenseData)
    clearHandler()
  }
  const clearHandler = () => {
    setTitle('')
    setAmount('')
    setDate('')
  }
  return (
    <div className={style}>
      <form action="" onSubmit={submitHandler}>
        <div className="new_expense__controls">
          <div className="new_expense__control">
            <label htmlFor="title"> Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="new_expense__control">
            <label htmlFor="amount"> Amount </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="new_expense__control">
            <label htmlFor="Date"> Date </label>
            <input
              type="date"
              placeholder="Date"
              name="Date"
              min="2019-03-23"
              max="2022-07-13"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={style.new_expense__actions__btn}>
            <button type="submit">Add-Expenses</button>
          </div>
        </div>
      </form>
    </div>
  )
}
