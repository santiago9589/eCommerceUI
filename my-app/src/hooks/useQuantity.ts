import { useState } from "react"

export const useQuantity = ():[number,(number: number) => void,React.Dispatch<React.SetStateAction<number>>] =>{
    const [quantityProduct, setQuantityProduct] = useState<number>(0)

  const handleQuantity = (number: number) => {
    if (quantityProduct >= 1) {
      setQuantityProduct(quantityProduct + number)
    } else {
      setQuantityProduct(1)
    }
  }

  return [quantityProduct,handleQuantity,setQuantityProduct]
}