import { useState } from "react"
import { useEffect } from "react"
import { getPizzaCheeses, getPizzaSauces, getPizzaSizes, getToppings } from "../../managers/pizzaManager.js"
import { getAllEmployees } from "../../managers/employeeManager.js"


export const CreateOrder = () => {
    const [allSizes, setAllSizes] = useState([])
    const [allSauce, setAllSauce] = useState([])
    const [allCheese, setAllCheese] = useState([])
    const [allToppings, setAllToppings] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [chosenSize, setChosenSize] = useState([])
    const [chosenSauce, setChosenSauce] = useState("")
    const [chosenCheese, setChosenCheese] = useState("")
    const [chosenToppings, setChosenToppings] = useState([])
    const [orderTaker, setOrderTaker] = useState("")
    const [deliveryIsChecked, setDeliveryIsChecked] = useState(false)
    const [deliverer, setDeliverer] = useState("")
    const [dineInIsChecked, setDineInIsChecked] = useState(false)
    const [tableNumber, setTableNumber] = useState("")
    const [pizzas, setPizzas] = useState([{ id: Date.now() }])

    useEffect(()=>{
      getPizzaSizes().then(sizeArray =>{
        setAllSizes(sizeArray)
      })
    },[])

    useEffect(()=>{
      getPizzaSauces().then(sauceArray =>{
        setAllSauce(sauceArray)
      })
    },[])

    useEffect(()=>{
      getPizzaCheeses().then(cheeseArray=>{
        setAllCheese(cheeseArray)
      })
    },[])

    useEffect(()=>{
      getToppings().then(toppingArray=>{
        setAllToppings(toppingArray)
      })
    },[])

    useEffect(()=>{
      getAllEmployees().then(employeeArray=>{
        setAllEmployees(employeeArray)
      })
    },[])

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
            <select className="form-select" onChange={(event)=>{setChosenSize(event.target.value)}}>
              <option value="0">Choose a Size</option>
              {allSizes.map(size=>
                <option value={size.id} key={size.id}>{size.name}</option>
              )}
            </select>
          </div>

          <div>
            <h6>Sauce</h6>
            <select className="form-select" onChange={(event)=>{setChosenSauce(event.target.value)}}>
              <option value="0">Choose a Sauce</option>
              {allSauce.map(sauce=>
                <option value={sauce.id} key={sauce.id}>{sauce.name}</option>
              )}
            </select>
          </div>

          <div>
            <h6>Cheese</h6>
            <select className="form-select" onChange={(event)=>{setChosenCheese(event.target.value)}}>
              <option value="0">Choose a Cheese</option>
              {allCheese.map(cheese=>
                <option value={cheese.id} key={cheese.id}>{cheese.name}</option>
              )}
            </select>
          </div>

          <div>
            {allToppings.map((topping) => (
              <div  key={topping.id} className="form-check">
                  <input value={topping.id} className="form-check-input" type="checkbox" onChange={(event) => {
                        const selectedId = event.target.value
                        if (event.target.checked) {
                          // Add topping if checked
                          setChosenToppings((prev) => [...prev, selectedId])
                        } else {
                          // Remove topping if unchecked
                          setChosenToppings((prev) => prev.filter(id => id !== selectedId))
                        }
                      }} />
                <label className="form-check-label">
                  {topping.name}
                </label>
              </div>
            ))}
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
          <select className="form-select" onChange={(event)=>{setTableNumber(event.target.value)}}>
            <option value="0">Choose a Table Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            
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
          <select className="form-select" onChange={(event)=>{setDeliverer(event.target.value)}}>
            <option value="0">Choose a Deliverer</option>
             {allEmployees.map(employee=>
                <option value={employee.id} key={employee.id}>{employee.name}</option>
              )}
          </select>
        </div>
      )}

      <div className="mt-3">
        <h6>Order Taken By</h6>
        <select className="form-select" onChange={(event)=>{setOrderTaker(event.target.value)}}>
          <option value="0">Choose an Employee</option>
          {allEmployees.map(employee=>
                <option value={employee.id} key={employee.id}>{employee.name}</option>
              )}
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