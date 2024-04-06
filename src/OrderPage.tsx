import { useState } from "react";

export enum ING_NAME {
    BUN = 'Bun',
    SALAD = 'Salad',
    CHEESE = 'Cheese Slices',
    CUTLETS = 'Cutlets'
}

export const INGREDIENTS = [
    {item: ING_NAME.BUN, price: 5, quantity: 2, datatype: "number", editable: false},
    {item: ING_NAME.SALAD, price: 5, quantity: 0, datatype: "boolean", editable: true},
    {item: ING_NAME.CHEESE, price: 1, quantity: 0, datatype: "number", editable: true},
    {item: ING_NAME.CUTLETS, price: 2, quantity: 0, datatype: "number", editable: true},
];

export default function OrderPage() {
    const [orderList, setOrderList] = useState<any[]>([]);
    const [username, setUserName] = useState<string>('');

    const calculatePrice = (orderData: any) => {
        console.log(orderData);
        let total = 0;
        INGREDIENTS.forEach(v => {

           let findItem = Object.entries(orderData).filter(j => j[0] === v.item);
           if(findItem) 
            total = total + (v.datatype === 'boolean' &&  orderData[v.item] === true ? v.price : orderData[v.item] * v.price);
        });
        console.log(total);
        return total;
    }
    
    const [selectedIngredients, setSelectedIngredients] = useState<any>({[ING_NAME.BUN]: 2, [ING_NAME.SALAD]: true, [ING_NAME.CHEESE]: 0, [ING_NAME.CUTLETS]: 0});
    
    const [finalOrderData, setFinalOrderData] = useState({total: calculatePrice(selectedIngredients), ingredients: selectedIngredients, username: username});

    const handleOnItemChange = (item: any, e: any) => {
        setSelectedIngredients((prev: any) => {
            let newValue = {...prev, [item]: +e.target.value};
            setFinalOrderData({...finalOrderData, total: calculatePrice(newValue)});
            return newValue;
        });
    }

    const handleUserName = (e: any) => {
        setUserName(e.target.value);
        setFinalOrderData({...finalOrderData, username: e.target.value})
    }

    
    const renderInput = (ing: any) => {
    if(ing.datatype === "boolean") {
        return <input
        type = 'checkbox'
         checked={selectedIngredients[ing.item]}
         onChange={(e) => handleOnItemChange(ing.item, e)}
       /> 
    } else {
        return <input
        type="number"
        value={selectedIngredients[ing.item]}
        onChange={(e) => handleOnItemChange(ing.item, e)}
        disabled={!ing.editable} 
        min={0}/>
       } 
    }

    const placeOrder = (order: any) => {
        setOrderList([...orderList, order]);
    }
    return <div style={{backgroundColor: '#d3d3d3'}}>
            <h1>Order Page</h1>
            <br />
            <br />
            <br />
            <main>

            <div>Enter your name</div>
            <input
        type="text"
        value={username}
        onChange={(e) => handleUserName(e)} />

        <br />
        <br />
        <br />
        <hr />
            {INGREDIENTS.map(ing => {
               return <div>
                <span>{ing.item}</span>
                {renderInput(ing)};
                <span>Selected Quantity: {selectedIngredients[ing.item]}</span>
               </div>
            })}
  <br />
<br />

            <button onClick={() => placeOrder(finalOrderData)}>Place Order</button>
            <div>Total Price: {finalOrderData.total}</div>


            <br />
            <div> ORDER LIST</div>
             
            {orderList.map(item => {
                return <div>
                        <div>{`${item.username}'s Order`}: </div>
                        <div>Ingredients: {JSON.stringify(item.ingredients)}</div>
                        <div>Total: {item.total}</div>
                    </div>
            })}
            </main>
        </div>
}





// Use Case:
//   * User comes to a burger joint and orders a burger
// * User can choose the ingredients for his burger. The ingredients are Bun, Salad, Cheese Slices and Cutlets
// * The app should have the following features
// * Order a burger with mix of ingredients.
// * List All ordered burgers along with price.
// * Create a service for burger price calculation and  total Sale
// * Search All burgers by Person name
// Sample Input may look like this
// Order Burger with the following option

// Name or guy who order
// Bun = 2 (fix price Rs 5 each bun and fix quantity 2 user can not edit the bun quantity)
// salad = yes or no (price Rs 5 , it should be boolean)
// Cheese Slices = (Rs 1 per slice)
// cutlets = (Rs 2 per piece)