import { Input, Paper, TableCell, TableRow } from '@mui/material'

export const CustomTableCell = ({
  row,
  name,
  onChange,
  onToggleEditMode,
  i,
  nameError,
  // onBlur,
}) => {
  const classes = ''
  const { isEditMode } = row

  // console.log('==============', row[name])
  return (
    <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
      <TableRow align="left" className={classes.tableCell}>
        {isEditMode ? (
          <>
            <Input
              value={row[name]}
              name={name}
              maxLength={10}
              minLength={3}
              onChange={(e) => onChange(e, row, i)}
              className={classes.input}
              id={row.id || Math.random().toFixed(2) * 100}
              required
            />
          </>
        ) : (
          <>
            <TableCell
              onClick={() => onToggleEditMode(row.id)}
              style={{ width: '100px' }}
            >
              {row[name]}
            </TableCell>
            {/* {row.isEditMode ? (
            <TableCell onClick={() => onToggleEditMode(row.id)}>
              {row[name]}
            </TableCell>
          ) : (
          <div  onClick={() => onToggleEditMode(row.id)}>  {row[name] }</div>
          )} */}
          </>
        )}
        {/* {validate(row.name) && <p style={{ color: 'red' }}>"row.errorMessage"</p>} */}
      </TableRow>
    </Paper>
  )
}
