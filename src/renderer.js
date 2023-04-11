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
    for (let item of ordersList.data) {
        let li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        li.innerHTML = item.id + " " + item.name;
        li.addEventListener('click', () => {
            createModal();
            //orders.edit(item.id)
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






function createModal () {
    //let modal = document.querySelector('.modal');
    
    modal.innerHTML = `<form action="" id="formOrder">

    </form>
    <section class="container header">
        <header>
            Выписка
        </header>
        <h1>Выписка из нормативного правового акта 
            о бюджете субъекта Российской Федерации 
            (муниципального правового акта о бюджете), 
            бюджетной росписи субъекта Российской Федерации 
            (местного бюджета)
            Камышловский городской округ
            Наименование субъекта Российской Федерации
            (муниципального образования, в составе субъекта Российской Федерации)
        </h1>
    </section>

    <section class="container requisites" >
        <div><label for="date">Дата выписки: </label>
            <input type="date" id="date" name="date"/></div>
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
                        <div>180</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-number" value="">
                    </td>
                    <td>
                        <div>08.12.2022</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-date" value="">
                    </td>
                    <td>
                        <div>решение</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-type" value="">
                    </td>
                    <td>
                        <div>Решение Думы   Камышловского городского округа  «О бюджете Камышловского городского округа на 2023 год и плановый период 2024 и 2025 годов»</div>
                        <input form="formOrder" type="text" style="display:none" name="requisites-name" value="">
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
            <tbody>
                <tr>
                    <td>
                        <div>Муниципальная программа «Развитие образования, культуры, спорта и молодежной политики в Камышловском городском округе до 2027 года», Подпрограмма "Развитие образования в сфере культуры в Камышловском городском округе", Оснащение муниципальных организаций дополнительного образования (детские школы искусств) музыкальными инструментами, оборудованием и учебными материалами на условиях софинансирования из федерального бюджета</div>
                        <input form="formOrder" type="text" style="display:none" name="expenditure-name" value="">
                    </td>
                    <td>
                        <div>Приложение, 4 строка, 495 </div>
                        <input form="formOrder" type="text" style="display:none" name="expenditure-line" value="">
                    </td>
                    <td>
                        <div>Сумма на 2023 год
    
                        5 969 000,00</div>
                        <input form="formOrder" type="text" style="display:none" name="expenditure-sum" value="">
                    </td>
                </tr>
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
            <tbody>
                <tr>
                    <td>
                        <div>90620225519040000150</div>
                        <input form="formOrder" type="text" style="display:none" name="income-dkbk" value="">
                    </td>
                    <td>
                        <div>Субсидии бюджетам городских округов на поддержку отрасли культуры</div>
                        <input form="formOrder" type="text" style="display:none" name="income-name" value="">
                    </td>
                    <td>
                        <div>Сумма на 2023 год  (рублей)
                        5 313 000,00</div>
                        <input form="formOrder" type="text" style="display:none" name="income-sum" value="">
                    </td>
                </tr>
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
            <tbody>
                <tr>
                    <td>
                        <div>9060703025A155192622</div>
                        <input form="formOrder" type="text" style="display:none" name="expense-rkbk" value="">
                    </td>
                    <td>
                        <div>Муниципальная программа «Развитие образования, культуры, спорта и молодежной политики в Камышловском городском округе до 2027 года», Подпрограмма "Развитие образования в сфере культуры в Камышловском городском округе", Оснащение муниципальных организаций дополнительного образования (детские школы искусств) музыкальными инструментами, оборудованием и учебными материалами на условиях софинансирования из федерального бюджета</div>
                        <input form="formOrder" type="text" style="display:none" name="expense-name" value="">
                    </td>
                    <td>
                        <div>Сумма на 2023 год (рублей)
    
                        5 969 000,00</div>
                        <input form="formOrder" type="text" style="display:none" name="expense-sum" value="">
                    </td>
                    <button id="btn-rkbk">...выбрать кбк</button>
                </tr>
            </tbody>
        </table>
    </section>
    <input form="formOrder" type="submit" id="btnSave" value="Сохранить">`
    
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

    formOrder.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(formOrder);
        for(let [name, value] of formData) {
            console.log(`${name} = ${value}`); 
        }
    })

}