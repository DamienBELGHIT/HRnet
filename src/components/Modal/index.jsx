import "./index.css"

export default function Modal({ children, visible }) {
  return visible ? (
    <div className="modal">
      <button
        className="close-modal"
        onClick={() => {
          visible = false
        }}
      >
        X
      </button>
      {children}
    </div>
  ) : (
    <div></div>
  )
}
