import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import ScoopOption from './ScoopOption'
import ToppingOption from "./ToppingOption"
import { Row } from "react-bootstrap"

export default function Options({ optionType }) {

  const [ items, setItems ] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(res => setItems(res.data))
      .catch(error => console.error(error))
  }, [optionType])

  const ItemComponent = useMemo(() => {
    return optionType === 'scoops' ? ScoopOption : ToppingOption
  }, [optionType])

  return (
    <Row>
      {items.map(item => 
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      )}
    </Row>
  )
}