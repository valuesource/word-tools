export default function WordleTile({
  value,
  onChange,
  status = 'gray',
  onStatusChange,
}) {
  const colors = {
    gray: '#787c7e',
    yellow: '#c9b458',
    green: '#6aaa64',
  }

  function cycleStatus() {
    const order = ['gray', 'yellow', 'green']

    const currentIndex = order.indexOf(status)

    const nextStatus =
      order[(currentIndex + 1) % order.length]

    onStatusChange(nextStatus)
  }

  return (
    <button
      type="button"
      onClick={cycleStatus}
      style={{
        width: 60,
        height: 60,
        border: 'none',
        background: colors[status],
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        cursor: 'pointer',
      }}
    >
      <input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
              .slice(-1)
              .toLowerCase()
              .replace(/[^a-z]/g, '')
          )
        }
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          color: 'white',
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 'bold',
          outline: 'none',
        }}
      />
    </button>
  )
}