import { nanoid } from 'nanoid';
import Orders from './js/orders.js'
import './index.css';

let orders

function orderListDom (ordersList) {
    let entriesList = document.querySelector('.entries__list');
    entriesList.innerHTML = "";
    let ul = document.createElement('ul');
    console.log(ordersList)
    entriesList.append(ul)
    for (let item of ordersList.data) {
        let li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        li.innerHTML = item.id + " " + item.name;
        li.addEventListener('click', () => {
            orders.edit(item.id)
        })
        let span = document.createElement('span')
        span.innerHTML = "удалить";
        span.addEventListener('click', async () => {
            await orders.delete(item.id);
            await orders.save(orders);
            await orders.getOrders();
            await orderListDom(orders);
        })
        ul.append(li);
        ul.append(span);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    
    window.storage.entries((e, data) => {
        orders = new Orders(data);
        orderListDom(orders)
    })

    let btn = document.querySelector('.entries__btnAdd');
    
    btn.addEventListener('click', async () => {
        let entry = {
            id: nanoid(), //=> "V1StGXR8_Z5jdHi6B-myT"
            name: "Выписка"
        }
        await orders.add()
        // entries.push(entry);
        await orders.save(orders)
        await orders.getOrders();
        console.log("событие")
        await orderListDom(orders);
    })


   
    
})

console.log('👋 This message is being logged by "renderer.js", included via webpack');

