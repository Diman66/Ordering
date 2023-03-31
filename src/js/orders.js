import { nanoid } from 'nanoid'

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
        this.data.push(new Order)
    }

    edit (id) {
        let order = this.data.find(order => id == order.id)
        console.log('редактирование записи ', order);
        window.orderWindow.open();
    }

    save (orders) {
        window.storage.save(JSON.stringify(orders));
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
        this.name = "выписка"
    }
}