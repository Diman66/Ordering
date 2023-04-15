import { nanoid } from 'nanoid';
import Orders from './js/orders.js'
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

        spanText.addEventListener('click', () => {
            createModal(item, index);
            //orders.edit(item.id)
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






function createModal (order, index) {
    //let modal = document.querySelector('.modal');
    
    
    

    modal.innerHTML = `<form action="" id="formOrder">
    <input form="formOrder" type="text" style="display:none" name="id" value="${order.id ? order.id : ""}">
    </form>
    <section class="container header">
        <h1>
            <div id="title" contenteditable="true">
                ${order.title ? order.title : ""}
            </div>
        </h1>
    </section>

    <section class="container requisites" >
        <div>
            <label for="date">Дата выписки: </label>
            <input form="formOrder" type="date" id="date" name="dateOrder" value="${order.dateOrder ? order.dateOrder : ""}" />
        </div>
        <h2>Реквизиты нормативного правового акта о бюджете </h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Дата принятия</th>
                    <th>Тип акта (закон, решение)</th>
                    <th>Наименование акта</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div>${order.requisites?.number ? order.requisites?.number : ""}</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-number" value="${order.requisites?.number ? order.requisites?.number : ""}">
                    </td>
                    <td>
                        <div>${order.requisites?.date ? order.requisites?.date : ""}</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-date" value="${order.requisites?.date ? order.requisites?.date : ""}">
                    </td>
                    <td>
                        <div>${order.requisites?.type ? order.requisites?.type : ""}</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-type" value="${order.requisites?.type ? order.requisites?.type : ""}">
                    </td>
                    <td>
                        <div>${order.requisites?.name ? order.requisites?.name : ""}</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-name" value="${order.requisites?.name ? order.requisites?.name : ""}">
                    </td>
                </tr>
            </tbody>
        </table>
    </section>

    <section class="container expenditure">
        <h2>Содержание норм, подтверждающих наличие расходных обязательств и бюджетных ассигнований 
            на финансирование мероприятий софинансирование которых осуществляется 
            за счет субсидий областного бюджета</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Наименование мероприятия, софинансирование которого планируется осуществить за счет субсидии</th>
                    <th>Страница, пункт или номер строки по тексту нормативного правового акта о бюджете</th>
                    <th>Сумма бюджетных ассигнований (рублей)</th>
                </tr>
            </thead>
            <tbody id="expenditureList">
                
            </tbody>
        </table>
    </section>

    <section class="container income">
        <h2>Доходы</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>КБК</th>
                    <th>Наименование</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody id="incomeList">
                
            </tbody>
        </table>
    </section>

    <section class="container expense">
        <h2>Расходы</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Дата утверждения сводной бюджетной росписи (внесения изменений в сводную бюджетную роспись) д/м/г</th>
                    <th>Наименование финансового органа</th>
                    <th>Наименование должности руководи­теля финансового органа</th>
                    <th>Фамилия, Имя, Отчество руководителя финансового органа</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>21.12.2022 (17.01.2023) </td>
                    <td>финансовое управление администрации Камышловского городского округа</td>
                    <td>Начальник финансового управления администрации Камышловского городского округа</td>
                    <td>Солдатов А.Г.</td>
                </tr>
            </tbody>
        </table>
        <table class="table">
            <thead>
                <tr>
                    <th>КБК</th>
                    <th>Наименование</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody id="expenseList">
                
            </tbody>
        </table>
    </section>
    <input form="formOrder" type="submit" id="btnSave" value="Сохранить">`
    
    if (order.expenditure?.length > 0) {
        order.expenditure.forEach((item) => {
            expenditureList.innerHTML += `<tr>
                                            <td>
                                                <div>${item.name ? item.name : ""}</div>
                                                <input form="formOrder" type="text" style="display:none" name="expenditure-name" value="${item.name ? item.name : ""}">
                                            </td>
                                            <td>
                                                <div>${item.line ? item.line : ""}</div>
                                                <input form="formOrder" type="text" style="display:none" name="expenditure-line" value="${item.line ? item.line : ""}">
                                            </td>
                                            <td>
                                                <div>${item.sum ? item.sum : ""}</div>
                                                <input form="formOrder" type="text" style="display:none" name="expenditure-sum" value="${item.sum ? item.sum : ""}">
                                            </td>
                                        </tr>`
        })
    } else {
        expenditureList.innerHTML += `<tr>
                                            <td>
                                                <div></div>
                                                <input form="formOrder" type="text" style="display:none" name="expenditure-name" value="">
                                            </td>
                                            <td>
                                                <div></div>
                                                <input form="formOrder" type="text" style="display:none" name="expenditure-line" value="">
                                            </td>
                                            <td>
                                                <div></div>
                                                <input form="formOrder" type="text" style="display:none" name="expenditure-sum" value="">
                                            </td>
                                        </tr>`
    }

    if (order.income?.length > 0) {
        order.income.forEach((item) => {
            incomeList.innerHTML += `<tr>
                                        <td>
                                            <div>${item.dkbk ? item.dkbk : ""}</div>
                                            <input form="formOrder" type="text" style="display:none" name="income-dkbk" value="${item.dkbk ? item.dkbk : ""}">
                                        </td>
                                        <td>
                                            <div>${item.name ? item.name : ""}</div>
                                            <input form="formOrder" type="text" style="display:none" name="income-name" value="${item.name ? item.name : ""}">
                                        </td>
                                        <td>
                                            <div>${item.sum ? item.sum : ""}</div>
                                            <input form="formOrder" type="text" style="display:none" name="income-sum" value="${item.sum ? item.sum : ""}">
                                        </td>
                                    </tr>`
        })
    } else {
        incomeList.innerHTML += `<tr>
                                        <td>
                                            <div></div>
                                            <input form="formOrder" type="text" style="display:none" name="income-dkbk" value="">
                                        </td>
                                        <td>
                                            <div></div>
                                            <input form="formOrder" type="text" style="display:none" name="income-name" value="">
                                        </td>
                                        <td>
                                            <div></div>
                                            <input form="formOrder" type="text" style="display:none" name="income-sum" value="">
                                        </td>
                                    </tr>`
    }

    if (order.expense?.expLine?.length > 0) {
        order.expense.expLine.forEach((item) => {
            expenseList.innerHTML += `<tr>
                                        <td>
                                            <div>${item.rkbk ? item.rkbk : ""}</div>
                                            <input form="formOrder" type="text" style="display:none" name="expense-rkbk" value="${item.rkbk ? item.rkbk : ""}">
                                        </td>
                                        <td>
                                            <div>${item.name ? item.name : ""}</div>
                                            <input form="formOrder" type="text" style="display:none" name="expense-name" value="${item.name ? item.name : ""}">
                                        </td>
                                        <td>
                                            <div>${item.sum ? item.sum : ""}</div>
                                            <input form="formOrder" type="text" style="display:none" name="expense-sum" value="${item.sum ? item.sum : ""}">
                                        </td>
                                        <button id="btn-rkbk">...выбрать кбк</button>
                                    </tr>`
        })
    } else {
        expenseList.innerHTML += `<tr>
                                    <td>
                                        <div></div>
                                        <input form="formOrder" type="text" style="display:none" name="expense-rkbk" value="">
                                    </td>
                                    <td>
                                        <div></div>
                                        <input form="formOrder" type="text" style="display:none" name="expense-name" value="">
                                    </td>
                                    <td>
                                        <div></div>
                                        <input form="formOrder" type="text" style="display:none" name="expense-sum" value="">
                                    </td>
                                    <button id="btn-rkbk">...выбрать кбк</button>
                                </tr>`
    }


    modal.style.display = 'block';
    
    let tds = document.querySelectorAll('td');

    for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function func() {
            this.firstElementChild.setAttribute('contenteditable', 'true');
            this.firstElementChild.focus();
            this.firstElementChild.addEventListener('blur', function() {
                    console.log(this.innerHTML, this.nextElementSibling.value);
                    this.nextElementSibling.value = this.innerHTML;
                    console.log(this.innerHTML, this.nextElementSibling.value);
                    
                });
            this.removeEventListener('click', func)
        });
    }

    let url = 'https://budget.gov.ru/epbs/registry/7710568760-BUDGETCLASCOSTSMO/data?pageSize=1000&filterppocode=65741000'

    let btnRkbk = document.querySelector('#btn-rkbk');
    btnRkbk.addEventListener('click', () => {
        fetch(url)
            .then(response => response.json())
            .then(result => {console.log(result.data); createModalWindow(result.data)})
    })

    function createModalWindow (data) {
        let modalWindow = document.createElement('div');
        modalWindow.classList.add('modal');
        let tdRkbk = document.querySelector('#td-rkbk')
        
        for (let item of data) {
            let div = document.createElement('div');
            div.innerHTML = item.grbscode + ' ' + item.rzpr + ' ' + item.kcsr + ' ' + item.kvr;
            div.addEventListener('click', (e) => {
                console.log(e)
                tdRkbk.innerHTML = e.target.innerHTML;
                modalWindow.remove();
                //modalWindow.style.display = "none"
            })
            modalWindow.append(div);
        }
       
        document.body.append(modalWindow);
    }

    //////////////////////////////////////////////

    // let btnSave = document.querySelector('#btnSave');
    // btnSave.addEventListener('click', () => {
    //     //let tableReq = document.querySelector('.requisites table');
    //     const nodeList = document.querySelectorAll(".requisites table tbody tr");
    //     nodeList.forEach((node) => {
    //         const order = {};
    //         order.requisites = {};
    //         order.requisites.number = node.cells[0].innerHTML;
    //         order.requisites.date = node.cells[1].innerHTML;
    //         order.requisites.type = node.cells[2].innerHTML;
    //         order.requisites.name = node.cells[3].innerHTML;
    //         console.log(order);
    //     })
    //     //const rowsTableReq = Array.from(nodeList);
    //     //console.log(rowsTableReq); 
    // })

/////////////////////////////////////////////////////////

    formOrder.addEventListener('submit', async (e) => {
        e.preventDefault();
        let expenditure = [];
        let income = [];
        let expense = [];

        let rowsExpenditure = expenditureList.rows;
        let rowsIncome = incomeList.rows;
        let rowsExpense = expenseList.rows;

        
        for (let row of rowsExpenditure) {
            let obj = {};
            let inpts = row.querySelectorAll('input');
            for (let inpt of inpts) {
                obj[inpt.name.split('-')[1]] = inpt.value;
                
            }
            expenditure.push(obj)
        }

        for (let row of rowsIncome) {
            let obj = {};
            let inpts = row.querySelectorAll('input');
            for (let inpt of inpts) {
                obj[inpt.name.split('-')[1]] = inpt.value;
                
            }
            income.push(obj)
        }

        for (let row of rowsExpense) {
            let obj = {};
            let inpts = row.querySelectorAll('input');
            for (let inpt of inpts) {
                obj[inpt.name.split('-')[1]] = inpt.value;
                
            }
            expense.push(obj)
        }

        //let formData = new FormData(formOrder);
        let order = {
            id: formOrder["id"].value,
            title: title.innerHTML,
            dateOrder: formOrder.dateOrder.value,
            requisites: {
                number: formOrder["requisites-number"].value,
                type: formOrder["requisites-type"].value,
                name: formOrder["requisites-name"].value,
                date: formOrder["requisites-date"].value
            },
            expenditure: expenditure
            // [
            //     {
            //         name: formOrder["expenditure-name"].value,
            //         line: formOrder["expenditure-line"].value,
            //         sum: formOrder["expenditure-sum"].value,
            //         sum1: "",
            //         sum2: ""
            //     }
            // ]
            ,
            income: income
            // [
            //     {
            //         dkbk: formOrder["income-dkbk"].value,
            //         name: formOrder["income-name"].value,
            //         sum: formOrder["income-sum"].value,
            //         sum1: "",
            //         sum2: ""
            //     }
            // ]
            ,
            expense: {
                dateSbr: "13/01/2022",
                nameFo: "abyeghfdktybt",
                nameDol: "yfxfkmybr",
                fio: "cjklfnjd",
                expLine: expense
                // [
                //     {
                //         rkbk: formOrder["expense-rkbk"].value,
                //         name: formOrder["expense-name"].value,
                //         sum: formOrder["expense-sum"].value,
                //         sum1: "",
                //         sum2: ""
                //     }
                // ]
            }
        }   
        //console.log(order)
        orders.data.splice(index, 1, order);
        modal.innerHTML = "",
        modal.style.display = "none"
        await orders.save(orders)
        await orders.getOrders();
        console.log("событие")
        await orderListDom(orders);
        
    })

}