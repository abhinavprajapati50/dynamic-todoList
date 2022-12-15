import React, { useState } from 'react'
import style from './Css/ExpenseItem.module.css'
import { ExpenseDate } from './ExpenseDate'
export const ExpenseItem = ({ expenceArray }) => {
  const [title, setTitle] = useState(expenceArray.expenceTitle)

  const changeTitleHandler = () => {
    setTitle('updated')
  }
  return (
    <>
      <div className={style.expense__item}>
        {/* March 28<sup>th</sup> 2021 */}
        <ExpenseDate expenceArray={expenceArray} />
        <div className={style.expense_item__description}>
          <h2>{title}</h2>
          {/* <h2>{expenceArray.expenceTitle}</h2> */}
          <div className={style.expense_item__price}>
            ${expenceArray.expencePrice}
          </div>
        </div>
        <button onClick={changeTitleHandler}>Change Title !</button>
      </div>
    </>
  )
}
