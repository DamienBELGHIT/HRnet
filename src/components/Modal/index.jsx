import { useEffect } from "react"
import "./index.css"

export default function Modal({ children, visible, setVisible }) {
  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true)
  }, [])

  const detectKeyDown = (e) => {
    if (e.key === "Escape") {
      setVisible(false)
    }
  }

  return visible ? (
    <div>
      <div id="grey-bg"></div>
      <div className="modal">
        <button
          className="close-modal"
          onClick={() => {
            setVisible(false)
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  ) : (
    ""
  )
}
