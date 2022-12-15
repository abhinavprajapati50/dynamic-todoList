import DeleteIcon from '@mui/icons-material/Delete'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import SendIcon from '@mui/icons-material/Send'
import { Button, TableCell, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import style from '../Component/Css/table.module.css'
import { CustomTableCell } from './CustomTableCell'
import { undoHnadler, validate } from './validation'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

function createData(id, name, calories, fat, isEdit) {
  return { id, name, calories, fat, isEdit }
}

const colName = [
  { id: 1, colaName: 'name' },
  { id: 2, colaName: 'sname' },
  { id: 3, colaName: 'branch' },
]
export const TableData = () => {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      branch: 'computer',
      name: 'Jelly Bean',
      sname: 'Jelly',
      prevBranch: 'computer',
      prevName: 'Jelly Bean',
      prevsName: 'Jelly',
      isEditMode: false,
      // isError: false,
      // errorMessage: {},
    },
    {
      id: 2,
      branch: 'Mechenical',
      name: 'Abhinav',
      sname: 'Tak',
      prevBranch: 'Mechenical',
      prevName: 'Abhinav',
      prevsName: 'Tak',
      isEditMode: false,
      // isError: false,
      // errorMessage: {},
    },
    {
      id: 3,
      branch: 'Chemical',
      name: 'Tak',
      sname: 'prajapati',
      prevBranch: 'Chemical',
      prevName: 'Tak',
      prevsName: 'prajapati',
      isEditMode: false,
      // isError: false,
      // errorMessage: {},
    },
    {
      id: 4,
      branch: 'civil',
      name: 'niraj',
      sname: 'soni',
      prevBranch: 'civil',
      prevName: 'niraj',
      prevsName: 'soni',
      isEditMode: false,
    },
  ])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [previous, setPrevious] = useState({})
  const [counter, setCounter] = useState(0)
  const [nameError, setNameError] = useState({
    error: false,
    helperText: '',
  })
  const [schedule, setSchedule] = useState([])

  const [loads, setLoads] = useState([])
  const [undo, setUndo] = useState([])
  const [redo, setRedo] = useState([])
  const [mementos, setMementos] = useState()
  const [cellChangesIndex, setCellChangesIndex] = React.useState(() => -1)
  const [name, setName] = useState('')
  const [branch, setBranch] = useState('')
  const [sname, setSname] = useState('')

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row, i) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
  }
  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }))
    }
    const { name, value } = e.target

    const { id } = row
    console.log('🚀 ~ file: Table.jsx:157 ~ onChange ~ row', { [name]: value })
    const names = { [name]: value }

    console.log('🚀 ~ file: Table.jsx:160---- ~ onChange ~ names', {
      [name]: value,
    })
    setMementos(names)
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [name]: value,
          errorMessage: '',
          isError: false,
        }
        // }
      }
      return row
    })

    setRows(newRows)
  }

  const submithalClick = () => {
    const data = rows.map((row, i) => {
      if (validate(row.name) || validate(row.branch) || validate(row.sname)) {
        alert('FAILED TO SUBMIT THE DATA !!')
        setRows(...row)
        return
      }
      if (row.id) {
        return { ...row, isEditMode: false }
      }
      return row
    })

    console.log('🚀 ~ file: Table.jsx:216 ~ submithalClick ~ data', data)
    // setMementos(data)
    setRows(data)
    setUndo(data)
    // updateData(data)
    alert('SUCCESSFULLY SAVED')
  }
  undoHnadler(mementos)

  console.log('🚀 ~ file: Table.jsx:193 ~ submithalClick ~ mementos', mementos)
  // console.log('=============>', undo)

  const undoChanges = (row) => {
    const InitialData = rows.map((row) => {
      return {
        ...row,
        name: row.prevName,
        branch: row.prevBranch,
        sname: row.prevsName,
      }
    })
    setRows(InitialData)
  }
  const SingleundoChanges = (rowData) => {
    const newRows = rows.map((row) => {
      if (row.id === rowData.id) {
        return {
          ...row,

          name: rowData.prevName,
          branch: rowData.prevBranch,
          sname: rowData.prevsName,
        }
      }
      return row
    })
    console.log('========', newRows)
    setRows(newRows)
  }

  const addHandler = () => {
    alert('sdfd')

    setRows((prev) => [
      ...rows,
      {
        // id: Math.floor(Math.random() * 90 + 10),
        id: rows.length + 1,
        name: name,
        branch: branch,
        sname: sname,
        onchange: onchange,
        rows: rows,
        onToggleEditMode: onToggleEditMode,
      },
      // })),
    ])
  }

  const onDeleteHandler = (id) => {
    alert('delete')
    const dta = rows.filter((current) => current.id !== id)
    setRows(dta)
    console.log('🚀 ~ file: Table.jsx:303 ~ onDeleteHandler ~ dta', dta)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, p: 5 }}
        // style={{ marginTop: '5rem' }}
        className={style.container}
      >
        <Box textAlign="end">
          <Button onClick={addHandler} variant="contained">
            {/* <AddIcon onClick={addHandler} /> */}
            Add
          </Button>
        </Box>
        <Table
          // stickyHeader
          stickyHeader
          aria-label="sticky table"
          // aria-label="tom pagination table"
          // className={style.tablecontainer}
        >
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => {
              return (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 40 }} align="right">
                    <h1>{i + 1}</h1>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <CustomTableCell
                      {...{
                        row,
                        name: 'name',
                        onChange,
                        onToggleEditMode,
                        i,
                        nameError,
                      }}
                    />
                    <p> {validate(row.name)}</p>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <CustomTableCell
                      {...{
                        row,
                        name: 'sname',
                        onChange,
                        onToggleEditMode,
                        i,
                        nameError,
                      }}
                    />
                    <p> {validate(row.sname)}</p>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <CustomTableCell
                      {...{
                        row,
                        name: 'branch',
                        onChange,
                        onToggleEditMode,
                        i,
                        nameError,
                      }}
                    />
                    <p> {validate(row.branch)}</p>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Button
                      onClick={() => SingleundoChanges(row)}
                      variant="contained"
                      color="warning"
                    >
                      {' '}
                      Undo
                    </Button>
                    <Button onClick={() => onDeleteHandler(row.id)}>
                      <DeleteIcon style={{ color: 'red', fontSize: '30px' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Box textAlign="center">
          {/* <TableCell style={{ width: 160 }} align="right"> */}
          <Button
            sx={{ m: 2 }}
            onClick={undoChanges}
            variant="contained"
            color="warning"
          >
            {' '}
            Undo
          </Button>
          {/* <Button onClick={submithalClick}> */}
          <Button
            variant="contained"
            onClick={submithalClick}
            endIcon={<SendIcon />}
          >
            submit
          </Button>
          {/* </TableCell> */}
        </Box>
      </TableContainer>
    </Paper>
  )
}
