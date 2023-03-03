import { useState } from "react"
import triangle from "../../assets/images/triangle.png"
import "./index.css"

/**
 * Component for showing an interactive table of data
 * @component
 */
export default function DataTable({ data, columns }) {
  const [tableData, setTableData] = useState(data)
  const [filter, setFilter] = useState("")
  const [nbEntries, setNbEntries] = useState(10)
  const [page, setPage] = useState(0)

  /**
   * Changes the filtering column or reverse the filtering order if the column was already selected
   * @param {Object} column The column filtering the data
   */
  function changeFilter(column) {
    const newFilter =
      column.data + (filter === `${column.data}` ? "|Reverse" : "")
    setFilter(newFilter)
    setTableData(sortAlphaArray(tableData, newFilter))
  }

  /**
   * Sorts alphabetically an array of object
   * @param {Object[]} array The array to sort.
   * @param {String} newFilter The filter indicating which attribute of the object to base the sort on and if the order should be reversed
   * @returns The array sorted
   */
  function sortAlphaArray(array, newFilter) {
    const columnData = newFilter.split("|")[0]
    return array.sort((a, b) =>
      newFilter === `${columnData}`
        ? a[columnData].localeCompare(b[columnData])
        : b[columnData].localeCompare(a[columnData])
    )
  }

  /**
   * Retrieves element of an array that contains a certain string
   * @param {Object[]} array The array to filter
   * @param {String} input The string to check on each element
   * @returns An array containing all element that includes the string
   */
  function filterArrayFromInput(array, input) {
    setPage(0)
    return array.filter((elem) =>
      columns.some((column) =>
        elem[column.data].toLowerCase().includes(input.toLowerCase())
      )
    )
  }

  return (
    <div className="dataTable">
      <div>
        <div>
          Show
          <select
            onChange={(e) => {
              setPage(0)
              setNbEntries(e.target.value)
            }}
            name="nb-entries"
            id="nb-entries"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </div>
        <div>
          Search:{" "}
          <input
            id="search"
            type="text"
            onChange={(e) =>
              setTableData(
                sortAlphaArray(
                  filterArrayFromInput(data, e.target.value),
                  filter
                )
              )
            }
          />
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            {columns.map((column, index) => (
              <th key={`Column-${index}`} onClick={() => changeFilter(column)}>
                <div>
                  {column.title}
                  <div className="filter-icons">
                    <img
                      src={triangle}
                      alt="filter"
                      className={filter === `${column.data}` ? "highlight" : ""}
                    />
                    <img
                      src={triangle}
                      alt="filter"
                      className={
                        filter === `${column.data}|Reverse` ? "highlight" : ""
                      }
                    />
                  </div>
                </div>
              </th>
            ))}
          </tr>
          {tableData.map(
            (elem, index) =>
              index < (page + 1) * nbEntries &&
              index >= page * nbEntries && (
                <tr key={`Data-${index}`}>
                  {columns.map((column, index) => (
                    <td key={index}>{elem[column.data]}</td>
                  ))}
                </tr>
              )
          )}
        </tbody>
      </table>
      <div>
        <span>
          {`Showing ${page * nbEntries + 1} to 
          ${Math.min((page + 1) * nbEntries, tableData.length)} 
          entries of 
          ${tableData.length} entries`}
        </span>
        <div>
          <button
            onClick={() => {
              page > 0 && setPage(page - 1)
            }}
          >
            {"<"}
          </button>
          {page + 1}
          <button
            onClick={() => {
              if ((page + 1) * nbEntries < tableData.length) {
                setPage(page + 1)
              }
            }}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  )
}
