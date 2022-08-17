import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import ScoopOption from './ScoopOption'
import ToppingOption from "./ToppingOption"
import { Row } from "react-bootstrap"
import AlertBanner from "../common/AlertBanner"

export default function Options({ optionType }) {

  const [ items, setItems ] = useState([])
  const [ error, setError ] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(res => setItems(res.data))
      .catch(error => setError(true))
  }, [optionType])

  const ItemComponent = useMemo(() => {
    return optionType === 'scoops' ? ScoopOption : ToppingOption
  }, [optionType])

  if (error) {
    return (
      <AlertBanner />
    )
  }

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