import { useEffect, useRef, useState } from "react"
import triangle from "../../assets/images/triangle.png"
import "./index.css"

export default function Dropdown({ options, onValueChange }) {
  const [selectedOption, selectOption] = useState(options[0])
  const [revealed, setRevealed] = useState(false)

  const wrapperRef = useRef(null)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setRevealed(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <div className="dropdown" ref={wrapperRef}>
      <div
        className="option-selected"
        onClick={() => setRevealed(!revealed)}
        style={{ zIndex: revealed ? 2 : 0 }}
      >
        <span>{selectedOption}</span>
        <img
          src={triangle}
          alt="Dropdown"
          className={revealed ? "" : "flipped"}
        />
      </div>
      <ul
        className="option-list"
        style={{ display: revealed ? "block" : "none" }}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              selectOption(option)
              setRevealed(false)
              onValueChange(option)
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}
