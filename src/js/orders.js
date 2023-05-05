import { nanoid } from 'nanoid';
import Modal from './modal'

export default class Orders {
    constructor (data) {
        let orders = JSON.parse(data)
        this.data = orders.data;
    }

    async getOrders () {
        const data = await window.storage.read();
        let orders = JSON.parse(data)
        this.data = orders.data;
    }

    add () {
        return new Promise((resolve, reject) => {
            let modal = new Modal;
            let promise = modal.create(new Order);
            promise.then(
                (order) => {
                    console.log('сохранено'); 
                    console.log(order);
                    this.data.push(order)
                    modal = null;
                    resolve(order)
                }
                , 
                () => {
                    modal = null;
                    reject('отмена');
                }
            )
        })
        
        //this.data.push(new Order)
    }

    edit (item, index) {
        return new Promise((resolve, reject) => {
            let modal = new Modal;
            let promise = modal.create(item);
            promise.then(
                (order) => {
                    console.log('сохранено'); 
                    console.log(order);
                    this.data.splice(index, 1, order);
                    modal = null;
                    resolve()
                }
                , 
                () => {
                    modal = null;
                    reject('отмена');
                }
            )
        })
    }

    save (orders) {
        return new Promise (async (resolve, reject) => {
            window.storage.save(JSON.stringify(orders));
            resolve('данные отправлены на запись')
        })
        
    }

    delete (id) {
        console.log("удалено", id)
        let index = this.data.findIndex(order => id == order.id);
        console.log(index);
        this.data.splice(index, 1);
    }
}



class Order {
    constructor () {
        this.id = nanoid();
        
    }
}