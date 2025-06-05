import { useState } from "react"
import { useEffect } from "react"
import { deletePizzaToppingsByPizzaId, getPizzaCheeses, getPizzaSauces, getPizzaSizes, getToppings, updatePizza, deletePizza, createNewPizza } from "../../managers/pizzaManager.js"
import { getAllEmployees } from "../../managers/employeeManager.js"
import { getOrderById } from "../../managers/orderManager.js"
import { useNavigate, useParams } from "react-router-dom"
import { updateOrder } from "../../managers/orderManager.js"

export const UpdateOrder = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [allSizes, setAllSizes] = useState([])
    const [allSauce, setAllSauce] = useState([])
    const [allCheese, setAllCheese] = useState([])
    const [allToppings, setAllToppings] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [orderTaker, setOrderTaker] = useState("")
    const [deliveryIsChecked, setDeliveryIsChecked] = useState(false)
    const [deliverer, setDeliverer] = useState("")
    const [dineInIsChecked, setDineInIsChecked] = useState(false)
    const [tableNumber, setTableNumber] = useState("")
    const [tip, setTip] = useState("")
    const [pizzas, setPizzas] = useState([])
    const [deletedPizzaIds, setDeletedPizzaIds] = useState([])

    useEffect(() => {
        getPizzaSizes().then(setAllSizes)
        getPizzaSauces().then(setAllSauce)
        getPizzaCheeses().then(setAllCheese)
        getToppings().then(setAllToppings)
        getAllEmployees().then(setAllEmployees)

        getOrderById(id).then(order => {
            setOrderTaker(order.orderTakeEpId || "")
            setDeliveryIsChecked(order.isDelivery || false)
            setDeliverer(order.deliverEpId || "")
            setTableNumber(order.tableNumber || "")
            setTip(order.tip?.toString() || "")
            setPizzas(order.pizzas.map(p => ({
                id: p.id,
                sizeId: p.sizeId,
                sauceId: p.sauceId,
                cheeseId: p.cheeseId,
                toppingIds: p.pizzaToppings.map(pt => pt.toppingId)
            })))
        if(order.tableNumber)
        {
            setDineInIsChecked(true)
        }
        })
    }, [id])

    const handleDeliveryCheck = (event) => setDeliveryIsChecked(event.target.checked)
    const handleDineInCheck = (event) => setDineInIsChecked(event.target.checked)

    const handleAddPizza = () => {
        setPizzas(prev => [...prev, {
            id: Date.now(),
            sizeId: null,
            sauceId: null,
            cheeseId: null,
            toppingIds: []
        }])
    }
    const handleRemovePizza = (pizzaId) => {
        if(pizzaId < 100000) {
            setDeletedPizzaIds(prev => [...prev, pizzaId])
        }
        setPizzas(prev =>  prev.filter(p => p.id !== pizzaId))
    }

    const calculatePizzaPrice = (pizza) => {
        const sizePrice = allSizes.find(s => s.id === pizza.sizeId)?.price || 0
        const toppingTotal = pizza.toppingIds.reduce((sum, tId) => {
            const price = allToppings.find(t => t.id === tId)?.price || 0
            return sum + price
        }, 0)
        return sizePrice + toppingTotal
    }

    const parsedTip = parseFloat(tip) || 0
    const totalBasePrice = pizzas.reduce((sum, pizza) => sum + calculatePizzaPrice(pizza), 0)
    const deliveryFee = deliveryIsChecked ? 5: 0
    const totalOrderPrice = totalBasePrice + deliveryFee + parsedTip

    const handleUpdateButton = async () => {
        for(const pizzaId of deletedPizzaIds){
            await deletePizza(pizzaId)
        }
        setDeletedPizzaIds([])

        const updatedOrder = {
            id: parseInt(id),
            tableNumber: tableNumber || null,
            isDelivery: deliveryIsChecked,
            tip: parseFloat(tip) || 0,
            orderTakeEpId: parseInt(orderTaker),
            deliverEpId: deliverer ? parseInt(deliverer) : null
        }
        
        try {
            await updateOrder(updatedOrder, parseInt(id))
            //update pizzas and toppings
            for(const pizza of pizzas){
                //if new pizza, create
                //since ids are tracked by date.now, they will be large
                //we find new orders by them being smaller than the date.now range
                if(pizza.id > 100000){

                await createNewPizza({
                    sizeId: pizza.sizeId,
                    sauceId: pizza.sauceId,
                    cheeseId: pizza.cheeseId,
                    orderId: parseInt(id),
                    toppingIds: pizza.toppingIds
                })
                }else{
                await updatePizza({
                    id: pizza.id,
                    sizeId: pizza.sizeId,
                    sauceId: pizza.sauceId,
                    cheeseId: pizza.cheeseId,
                    orderId: parseInt(id)
                })

            //delete old toppings
            await deletePizzaToppingsByPizzaId(pizza.id)

            //add toppings
            for(const toppingId of pizza.toppingIds){
                await fetch("/api/PizzaTopping", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({pizzaId: pizza.id, toppingId})
                })
            }

            }
        }



            alert(`Order ${id} updated`)
            navigate("/")
        } catch (error) {
            console.error("Update failed", error)
            alert("Failed to update the order")
        }
    }


    return (
        <div>
            <h1>Edit Order {id}</h1>
        {pizzas.map((pizza, index) => (
            <div key={pizza.id} style={{ border: "1px solid lightgray", padding: "10px", marginBottom: "10px" }}>
            <h5>Pizza #{index + 1}</h5>

            <div>
                <h6>Size</h6>
                <select className="form-select" value={pizza.sizeId || 0} onChange={e => {
                const sizeId = parseInt(e.target.value)
                setPizzas(prev => prev.map(p => p.id === pizza.id ? { ...p, sizeId } : p))
                }}>
                <option value="0">Choose a Size</option>
                {allSizes.map(size => <option value={size.id} key={size.id}>{size.name}</option>)}
                </select>
            </div>

            <div>
                <h6>Sauce</h6>
                <select className="form-select" value={pizza.sauceId || 0} onChange={e => {
                const sauceId = parseInt(e.target.value)
                setPizzas(prev => prev.map(p => p.id === pizza.id ? { ...p, sauceId } : p))
                }}>
                <option value="0">Choose a Sauce</option>
                {allSauce.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}
                </select>
            </div>

            <div>
                <h6>Cheese</h6>
                <select className="form-select" value={pizza.cheeseId || 0} onChange={e => {
                const cheeseId = parseInt(e.target.value)
                setPizzas(prev => prev.map(p => p.id === pizza.id ? { ...p, cheeseId } : p))
                }}>
                <option value="0">Choose a Cheese</option>
                {allCheese.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div>
                {allToppings.map(topping => (
                <div key={topping.id} className="form-check">
                    <input
                    value={topping.id}
                    checked={pizza.toppingIds.includes(topping.id)}
                    className="form-check-input"
                    type="checkbox"
                    onChange={e => {
                        setPizzas(prev =>
                        prev.map(p => {
                            if (p.id !== pizza.id) return p
                            const newToppings = e.target.checked
                            ? [...p.toppingIds, topping.id]
                            : p.toppingIds.filter(id => id !== topping.id)
                            return { ...p, toppingIds: newToppings }
                        })
                        )
                    }}
                    />
                    <label className="form-check-label">{topping.name}</label>
                </div>
                ))}
            </div>

            {pizzas.length > 1 && (
                <button className="btn btn-outline-danger mt-2" onClick={() => handleRemovePizza(pizza.id)}>
                Remove This Pizza
                </button>
            )}
            </div>
        ))}

        <button className="btn btn-outline-primary" onClick={handleAddPizza}>➕ Add Another Pizza</button>

        <div className="mt-3">
            <input className="form-check-input" type="checkbox" checked={dineInIsChecked} onChange={handleDineInCheck} />
            <label className="form-check-label"><h6>Dine In</h6></label>
        </div>

        {dineInIsChecked && (
            <div>
            <h6>Table Number</h6>
            <select className="form-select" value={tableNumber} onChange={e => setTableNumber(e.target.value)}>
                <option value="0">Choose a Table Number</option>
                {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num}</option>
                ))}
            </select>
            </div>
        )}

        <div className="mt-3">
            <input className="form-check-input" type="checkbox" checked={deliveryIsChecked} onChange={handleDeliveryCheck} />
            <label className="form-check-label"><h6>Delivery</h6></label>
        </div>

        {deliveryIsChecked && (
            <div>
            <select className="form-select" value={deliverer} onChange={e => setDeliverer(e.target.value)}>
                <option value="0">Choose a Deliverer</option>
                {allEmployees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            </div>
        )}

        <div>
            <h6>Tip</h6>
            <input className="form-control" type="text" value={tip} onChange={e => setTip(e.target.value)} />
        </div>

        <div className="mt-3">
            <h6>Order Taken By</h6>
            <select className="form-select" value={orderTaker} onChange={e => setOrderTaker(e.target.value)}>
            <option value="0">Choose an Employee</option>
            {allEmployees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
        </div>

        <h4>Total: ${totalOrderPrice.toFixed(2)}</h4>

        <button type="button" className="btn btn-success mt-3" onClick={handleUpdateButton}>
            Update Order
        </button>
        </div>
    )

}