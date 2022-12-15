import './App.css';
import { TableData } from './Table/Table';
function App() {
  // const [expenseArr, setExpenseArr] = useState(ExcpenseArr)
  // useEffect(() => {
  //   setExpenseArr(expenseArr)

  // }, [])


  // const onSubmit = (expenses) => {
  //   console.log("🚀 ~ file: App.js:11 ~ onSubmit ~ expenses", expenses)
  //   // setExpenseArr(prev => [...prev, expenses])
  //   // const aarr = ExcpenseArr.push(expenses)
  //   // setExpenseArr(...ExcpenseArr, expenseArr)
  //   setExpenseArr(ExcpenseArr.push(expenses))
  //   // setExpenseArr(prev => [...prev, expenseArr])
  //   console.log(ExcpenseArr, "454545", expenseArr);
  //   console.log("🚀 ~ file: App.js:11 ~ onSubmit ~ expenses", expenses)
  // }


  return (
    <div className="Appss">
      <TableData />

    </div>
  );
  // return (
  //   <div className="Appss">
  //     <NewExpense onSubmit={onSubmit} />
  //     <Card>
  //       {ExcpenseArr.map(cur => <ExpenseItem expenceArray={cur} key={cur.id} />)}
  //     </Card>
  //   </div>
  // );
}

export default App;
