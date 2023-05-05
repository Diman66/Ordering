import { nanoid } from 'nanoid';
import Orders from './js/orders.js';

import './index.css';

import './style.css';

let orders

function orderListDom (ordersList) {
    let entriesList = document.querySelector('.entries__list');
    entriesList.innerHTML = "";
    let ul = document.createElement('ul');
    console.log(ordersList)
    entriesList.append(ul)
    for (let [index , item] of ordersList.data.entries()) {
        let li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        
        
        let spanText = document.createElement('span')
        spanText.innerHTML = item.title + " от " + item.dateOrder;

        spanText.addEventListener('click', async () => {
            //createModal(item, index);
            try {
                await orders.edit(item, index);
                await orders.save(orders);
                await orders.getOrders();
                await orderListDom(orders);
            } 
            catch (err) {
                console.log(err)
            }
            

        })
        let btnDelete = document.createElement('button')
        btnDelete.innerHTML = "удалить";
        btnDelete.addEventListener('click', async () => {
            await orders.delete(item.id);
            await orders.save(orders);
            await orders.getOrders();
            await orderListDom(orders);
        })
        ul.append(li);
        li.append(spanText);
        li.append(btnDelete);

    }
}

window.addEventListener('DOMContentLoaded', () => {
    
    window.storage.entries((e, data) => {
        orders = new Orders(data);
        orderListDom(orders)
    })

    let btn = document.querySelector('.entries__btnAdd');
    
    btn.addEventListener('click', async () => {
        // let modal = new Modal();
        // let promise = modal.create();

        // promise.then(
        //     async (order) => {
        //         console.log('сохранено'); 
        //         modal = null;
        //         await orders.add(order);
        //         await orders.save(orders)
        //         await orders.getOrders();
        //         console.log("событие")
        //         await orderListDom(orders);
        //     }
        //     , 
        //     () => {console.log('отмена') ; modal = null}
        // )
        try {
            let res = await orders.add();
            console.log("создана запись ", res)
            let save = await orders.save(orders);
            console.log(save);
            await orders.getOrders();
            await orderListDom(orders);
        }
        catch (err) {
            console.log(err)
        }
        
        // let entry = {
        //     id: nanoid(), //=> "V1StGXR8_Z5jdHi6B-myT"
        //     name: "Выписка"
        // }
        // await orders.add()
        // // entries.push(entry);
        // await orders.save(orders)
        // await orders.getOrders();
        // console.log("событие")
        // await orderListDom(orders);
    })


   
    
})

console.log('👋 This message is being logged by "renderer.js", included via webpack');







