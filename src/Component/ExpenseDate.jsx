import React from 'react'
import style from './Css/ExpenseDate.module.css'
export const ExpenseDate = ({ expenceArray }) => {
  //   const expenceDay = expenceDate
  console.log(
    '🚀 ~ file: ExpenseDate.jsx:5 ~ ExpenseDate ~ expenceDay',
    new Date(expenceArray.expenceDate).toLocaleString('en-US', {
      day: '2-digit',
    }),
  )
  const expenseYear = new Date(expenceArray.expenceDate).getFullYear()
  const expenceMonth = new Date(expenceArray.expenceDate).toLocaleString(
    'en-US',
    {
      month: 'long',
    },
  )

  const expenseDay = new Date(expenceArray.expenceDate).toLocaleString(
    'en-US',
    {
      day: '2-digit',
    },
  )
  //   const expenceYear = expenceDate.getFullYear()
  return (
    <div className={style.expenseDate}>
      <div className={style.expenseMonth}>{expenceMonth}</div>
      <div className={style.expenseYear}>{expenseYear}</div>
      <div className={style.expenseDay}>{expenseDay}</div>
    </div>
  )
}
