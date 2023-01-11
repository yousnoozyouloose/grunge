interface Props {
  count: number
  characters: string[]
  pxSize?: number | string
}

const App = (props: Props) => {
  const { count, characters, pxSize } = props

  const [arr, setArr] = React.useState([])

  const requestRef = React.useRef()

  const animate = (time) => {
    setArr(prevArr => prevArr.map(el => ({
      ...el,
      y: el.y > 100 ? -5 : el.y + 1 * el.r
    })))

    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    let initArr = new Array(count).fill()
      .map((_, i) => ({
        character: characters[i % characters.length],
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        r: 0.1 + Math.random() * 1
      }))

    setArr(initArr)

    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return (
    <div>
      {arr.map((el, i) => (
         <span style={{ 
          left: el.x + '%', 
          top: el.y + '%', 
          transform: 'scale(' + el.r + ')',
          fontSize: pxSize || 40
         }}>{el.character}</span>
      ))}
    </div>
  )
}

ReactDOM.render(<App count={100} characters={['☠️', '🧟‍♂️', '🧟‍♀️', '⚰️', '🚬']} pxSize="6vw" />, document.getElementById("grunchbackground"))
