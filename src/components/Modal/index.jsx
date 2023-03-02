import "./index.css"

export default function Modal({ children, visible, setVisible }) {
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
