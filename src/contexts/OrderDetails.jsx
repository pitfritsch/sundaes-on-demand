import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const pricePerItem = {
  scoops: 2,
  toppings: 1.5,
}
const OrderDetailsContext = createContext()

export function useOrderDetails(){
  const context = useContext(OrderDetailsContext)

  if (!context) {
    throw new Error('Youre outside the context')
  }

  return context
}

function calculateSubTotal(optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }

  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {

  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  })
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    total: 0
  })

  const updateItemCount = useCallback((itemName, newItemCount, optionType) => {
    setOptionCounts(oldState => {
      const newState = { ...oldState }
      const map = newState[optionType]
      map.set(itemName, parseInt(newItemCount))
      return newState
    })
  }, [])

  useEffect(() => {
    const scoopsTotal = calculateSubTotal('scoops', optionCounts)
    const toppingsTotal = calculateSubTotal('toppings', optionCounts)
    const total = scoopsTotal + toppingsTotal
    setTotals({
      scoops: scoopsTotal,
      toppings: toppingsTotal,
      total: total.toFixed(2)
    })
  }, [optionCounts])

  const value = useMemo(() => {
    return [
      {
        ...optionCounts,
        totals
      },
      updateItemCount
    ]
  }, [optionCounts, totals, updateItemCount])

  return (
    <OrderDetailsContext.Provider value={value} {...props} />
  )
}