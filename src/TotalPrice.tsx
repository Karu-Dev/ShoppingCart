import React from "react"
interface Price{
    price:Number
}
const TotalPrice : React.FC<Price> = ({price}) => {
    return (
        <h1>Total price : {price} $</h1>
    )
}
export default TotalPrice;