import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setClicks({ ...clicks,left: clicks.left + 1})
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right + 1 })
    setAll(allClicks.concat('R'))
  }

  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
