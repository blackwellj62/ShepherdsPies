import { useState } from "react"


export const CreateOrder = () => {
    // const [allSizes, setAllSizes] = useState([])
    // const [allSauce, setAllSauce] = useState([])
    // const [allCheese, setAllCheese] = useState([])
    // const [allToppings, setAllToppings] = useState([])
    // const [allEmployees, setAllEmployees] = useState([])
    // const [chosenSize, setChosenSize] = useState("")
    // const [chosenSauce, setChosenSauce] = useState("")
    // const [chosenCheese, setChosenCheese] = useState("")
    // const [chosenToppings, setChosenToppings] = useState([])
    // const [orderTaker, setOrderTaker] = useState("")
    const [deliveryIsChecked, setDeliveryIsChecked] = useState(false)
    // const [deliverer, setDeliverer] = useState("")
    const [dineInIsChecked, setDineInIsChecked] = useState(false)
    const [pizzas, setPizzas] = useState([{ id: Date.now() }])

    const handleDeliveryCheck = (event)=> {
        setDeliveryIsChecked(event.target.checked)
    }

    const handleDineInCheck = (event)=> {
        setDineInIsChecked(event.target.checked)
    }

   

    const handleAddPizza = () => {
    setPizzas((prev) => [...prev, { id: Date.now() }]);
  }

  const handleRemovePizza = (id) => {
    setPizzas((prev) => prev.filter((pizza) => pizza.id !== id));
  }

    return(
        <div>
      <h1>Create an Order</h1>

      {pizzas.map((pizza, index) => (
        <div
          key={pizza.id}
          style={{
            border: "1px solid lightgray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h5>Pizza #{index + 1}</h5>

          <div>
            <h6>Size</h6>
            <select className="form-select">
              <option value="0">Choose a Size</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div>
            <h6>Sauce</h6>
            <select className="form-select">
              <option value="0">Choose a Sauce</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div>
            <h6>Cheese</h6>
            <select className="form-select">
              <option value="0">Choose a Cheese</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div>
            <input className="form-check-input" type="checkbox" />
            <label className="toppings">
              <h4>Map Toppings Here</h4>
            </label>
          </div>

          {pizzas.length > 1 && (
            <button
              className="btn btn-outline-danger mt-2"
              onClick={() => handleRemovePizza(pizza.id)}
            >
              Remove This Pizza
            </button>
          )}
        </div>
      ))}

      <div>
        <button className="btn btn-outline-primary" onClick={handleAddPizza}>
          ➕ Add Another Pizza
        </button>
      </div>

      <div className="mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={handleDineInCheck}
        />
        <label className="form-check-label">
          <h6>Dine In</h6>
        </label>
      </div>

      {dineInIsChecked && (
        <div>
          <h6>Table Number</h6>
          <select className="form-select">
            <option value="0">Choose a Table Number</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      )}

      <div className="mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={handleDeliveryCheck}
        />
        <label className="form-check-label">
          <h6>Delivery</h6>
        </label>
      </div>

      {deliveryIsChecked && (
        <div>
          <select className="form-select">
            <option value="0">Choose a Deliverer</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      )}

      <div className="mt-3">
        <h6>Order Taken By</h6>
        <select className="form-select">
          <option value="0">Choose an Employee</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <button type="button" className="btn btn-success mt-3">
        Place Order
      </button>
      <button type="button" className="btn btn-danger mt-3 ms-2">
        Cancel Order
      </button>
    </div>
    )
}