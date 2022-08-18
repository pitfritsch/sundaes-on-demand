import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import ScoopOption from './ScoopOption'
import ToppingOption from "./ToppingOption"
import { Row } from "react-bootstrap"
import AlertBanner from "../common/AlertBanner"
import { pricePerItem, useOrderDetails } from "../../contexts/OrderDetails"

export default function Options({ optionType }) {

  const [ details, updateItemCount ] = useOrderDetails()
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
  const title = optionType.charAt(0).toUpperCase() + optionType.slice(1).toLowerCase()
  return (
    <>
      <h2>
        {title}
      </h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>{title} total: ${details.totals[optionType].toFixed(2)}</p>
      <Row>
        {items.map(item => 
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(name, count) => updateItemCount(name, count, optionType)}
          />
        )}
      </Row>
    </>
  )
}