export default class Modal {
    consrtuctor () {

    }

    create (order, index=null) {
        return new Promise (function (resolve, reject) {
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
            <input form="formOrder" type="date" id="date" name="dateOrder" value="${order.dateOrder ? order.dateOrder : ""}" required/>
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
                        
                        <input form="formOrder" type="text" name="requisites-number" value="${order.requisites?.number ? order.requisites?.number : ""}" required>
                    </td>
                    <td>
                        
                        <input form="formOrder" type="text" name="requisites-date" value="${order.requisites?.date ? order.requisites?.date : ""}" required>
                    </td>
                    <td>
                        
                        <input form="formOrder" type="text" name="requisites-type" value="${order.requisites?.type ? order.requisites?.type : ""}" required>
                    </td>
                    <td>
                        
                        <input form="formOrder" type="text" name="requisites-name" value="${order.requisites?.name ? order.requisites?.name : ""}" required>
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
    <input form="formOrder" type="submit" id="btnSave" value="Сохранить">
    <button id="btnClose">Закрыть</button>`
    
    if (order.expenditure?.length > 0) {
        order.expenditure.forEach((item) => {
            expenditureList.innerHTML += `<tr>
                                            <td>
                                                
                                                <input form="formOrder" type="text" name="expenditure-name" value="${item.name ? item.name : ""}" required >
                                            </td>
                                            <td>
                                                
                                                <input form="formOrder" type="text" name="expenditure-line" value="${item.line ? item.line : ""}" required>
                                            </td>
                                            <td>
                                                
                                                <input form="formOrder" type="text" name="expenditure-sum" value="${item.sum ? item.sum : ""}" required>
                                            </td>
                                        </tr>`
        })
    } else {
        expenditureList.innerHTML += `<tr>
                                            <td>
                                                
                                                <input form="formOrder" type="text" name="expenditure-name" value="" required >
                                            </td>
                                            <td>
                                               
                                                <input form="formOrder" type="text" name="expenditure-line" value="" required >
                                            </td>
                                            <td>
                                                
                                                <input form="formOrder" type="text" name="expenditure-sum" value="" required >
                                            </td>
                                        </tr>`
    }

    if (order.income?.length > 0) {
        order.income.forEach((item) => {
            incomeList.innerHTML += `<tr>
                                        <td class="kbk">
                                            <button class="btn__dkbk">...</button>
                                            <input form="formOrder" type="text" name="income-dkbk" value="${item.dkbk ? item.dkbk : ""}" required class="income__row">
                                        </td>
                                        <td>
                                            <textarea form="formOrder" type="text" name="income-name" required class="income__row">${item.name ? item.name : ""}</textarea>
                                            
                                        </td>
                                        <td class="sum">
                                            
                                            <input form="formOrder" type="text" name="income-sum" value="${item.sum ? item.sum : ""}" required class="income__row">
                                        </td>
                                    </tr>`
        })
    } else {
        incomeList.innerHTML += `<tr>
                                        <td class="kbk">
                                            <button class="btn__dkbk">...</button>
                                            <input form="formOrder" type="text" name="income-dkbk" value="" required class="income__row">
                                        </td>
                                        <td>
                                            <textarea form="formOrder" type="text" name="income-name" required class="income__row"></textarea>
                                            
                                        </td>
                                        <td class="sum">
                                            
                                            <input form="formOrder" type="text" name="income-sum" value=""required class="income__row">
                                        </td>
                                    </tr>`
    }

    if (order.expense?.expLine?.length > 0) {
        order.expense.expLine.forEach((item) => {
            expenseList.innerHTML += `<tr>
                                        <td class="kbk">
                                            <button class="btn__rkbk">...</button>
                                           
                                            <input form="formOrder" type="text" name="expense-rkbk" value="${item.rkbk ? item.rkbk : ""}" class="expense__row" required>
                                        </td>
                                        <td>
                                            <textarea form="formOrder" type="text" name="expense-name" required class="expense__row">${item.name ? item.name : ""}</textarea>
                                            
                                        </td>
                                        <td class="sum">
                                            
                                            <input form="formOrder" type="text" name="expense-sum" value="${item.sum ? item.sum : ""}" required class="expense__row">
                                        </td>
                                        <button id="btn-rkbk">...выбрать кбк</button>
                                    </tr>`
        })
    } else {
        expenseList.innerHTML += `<tr>
                                    <td class="kbk">
                                        <button class="btn__rkbk">...</button>
                                        
                                        <input form="formOrder" type="text" name="expense-rkbk" value="" required class="expense__row" >
                                    </td>
                                    <td>
                                        
                                        <textarea form="formOrder" type="text" name="expense-name" required ></textarea class="expense__row">
                                    </td>
                                    <td class="sum">
                                        
                                        <input form="formOrder" type="text" name="expense-sum" value=""required class="expense__row">
                                    </td>
                                    <button id="btn-rkbk">...выбрать кбк</button>
                                </tr>`
    }


    modal.style.display = 'block';
    
    // let tds = document.querySelectorAll('td');

    // for (let i = 0; i < tds.length; i++) {
    //     tds[i].addEventListener('click', function func() {
    //         this.firstElementChild.setAttribute('contenteditable', 'true');
    //         this.firstElementChild.focus();
    //         this.firstElementChild.addEventListener('blur', function() {
    //                 console.log(this.innerHTML, this.nextElementSibling.value);
    //                 this.nextElementSibling.value = this.innerHTML;
    //                 console.log(this.innerHTML, this.nextElementSibling.value);
                    
    //             });
    //         this.removeEventListener('click', func)
    //     });
    // }


    /// Сводная бюджетная роспись
    let urlSbr ='https://budget.gov.ru/epbs/registry/7710568760-SBRCOSTSUBMO/data?filterbudget.budgetcode=65741000&filterinformationset.budgetcycle=2023&filterreportdate=%2020.12.2023&pageSize=1000'
    //// классификация целевой статьи
    let urlKcsr = 'https://budget.gov.ru/epbs/registry/7710568760-BUDGETCLASKCSRMO/data?pageSize=1000&filterppocode=65741000&filteryear=2023';
    /// Прогноз доходов
    let urlIncome ='https://budget.gov.ru/epbs/registry/7710168360-INCOMEFORECASTMO/data?pageSize=1000&filterinformationset.budgetcycle=2023&filterbudget.budgetcode=65741000'


    let btnRkbk = document.querySelector('.btn__rkbk');
    btnRkbk.addEventListener('click', async () => {
        let sbr = await fetchApi(urlSbr);
        let kcsr = await fetchApi(urlKcsr);
        createModalWindowSbr(sbr, kcsr)
    })

    let btnDkbk = document.querySelector('.btn__dkbk');
    btnDkbk.addEventListener('click', async () => {
        loader(true);
        let income = await fetchApi(urlIncome);
        loader(false);
        //let kcsr = await fetchApi(urlKcsr);
        createModalWindowIncome(income);
    })

    async function fetchApi (url) {
        let pageNum = 1
        let page = 'pageNum='
        let data = [];

        async function f () {
            let urlRequest = url + '&' + page + pageNum;
            let response = await fetch(urlRequest)
            let res = await response.json()
            console.log(res, pageNum, urlRequest)
            if (res.pageCount > pageNum) {
                pageNum++;
                data = [...data, ...res.data];
                return f()
            } else {
                return data = [...data, ...res.data];
            }
                    
                    //.then(result => {createModalWindow (result)})
                    //.then(result => result.data)
        }
        data = await f();
        
        return data
    }


    function createModalWindowIncome (data, dkbk) {
        let countRows = 10;
        let offset = 0;
        let page = offset/countRows + 1;
        let dataPagination = data.slice(offset, countRows)
        console.log(dataPagination);
        let modalWrapper = document.createElement('div');
        let modalWindow = document.createElement('div');
        let modalBody = document.createElement('div');
        modalWrapper.classList.add('modalWrapper')
        modalWindow.classList.add('modal');
        modalBody.classList.add('modalBody');

        let inputSearchKbk = document.createElement('input')
        let btnBack = document.createElement('button');
        let inputPage = document.createElement('input');
        let btnNext = document.createElement('button');
        btnBack.innerHTML = 'Назад';
        btnNext.innerHTML = 'Дальше';
        inputPage.value = page;
        btnNext.onclick = function () {
            if (dataPagination.length < countRows) {
                console.log(countRows, offset, dataPagination, 'меньше 10')
                return
            } else {
                console.log(countRows, offset, dataPagination, 'больше 10')
                offset = offset + countRows;
                dataPagination = data.slice(offset, offset + countRows);
                let page = offset/countRows + 1;
                inputPage.value = page;
                renderRows(dataPagination);
            }
        }
        
        inputSearchKbk.addEventListener('input', (e) => {
            console.log(e.target.value)
            data = filterIt(data, e.target.value)
            dataPagination = data.slice(offset, countRows);
            renderRows(dataPagination);
        })

        function filterIt(arr, searchKey) {
            console.log('jfgjfj')
            return arr.filter(obj => obj.kvsr.code.includes(searchKey));
        }

        btnBack.onclick = function () {
            if (offset < 10) {
                console.log(countRows, offset, dataPagination, 'меньше 10')
                return
            } else {
                console.log(countRows, offset, dataPagination, 'больше 10')
                offset = offset - countRows;
                dataPagination = data.slice(offset, offset + countRows);
                let page = offset/countRows + 1;
                inputPage.value = page;
                renderRows(dataPagination);
            }
        }

        //let tdRkbk = document.querySelector('input.expense-rkbk')
        function renderRows (dataPagination) {
            modalBody.innerHTML = '';
            for (let item of dataPagination) {
                let div = document.createElement('div');
                div.innerHTML = item.kvsr.code + ' ' + item.subtypinc.inctypecode + ' ' + item.subtypinc.incsubtypecode + ' ' + item.subtypinc.analyticalgroupcode + ' '+ item.value + ' ' + item.year;
                div.addEventListener('click', (e) => {
                    console.log(e)
                    formOrder['income-dkbk'].value = item.kvsr.code + ' ' + item.subtypinc.inctypecode + ' ' + item.subtypinc.incsubtypecode + ' ' + item.subtypinc.analyticalgroupcode;
                    formOrder['income-name'].innerHTML = item.subtypinc.incname;
                    formOrder['income-sum'].value = item.value;
                    modalWindow.remove();
                    modalWrapper.remove();
    
                    //modalWindow.style.display = "none"
                })
                modalBody.append(div);
            }
        }

        renderRows(dataPagination);

        document.body.append(modalWrapper);
        modalWrapper.append(modalWindow);
        modalWindow.append(inputSearchKbk);
        modalWindow.append(modalBody);
        modalWindow.append(btnBack);
        modalWindow.append(inputPage);
        modalWindow.append(btnNext);
    }

    
    function loader (show) {
        if (show) {
            let loaderWrapper = document.createElement('div');
            let loaderWindow = document.createElement('div');
            loaderWrapper.classList.add('loaderWrapper')
            loaderWindow.classList.add('loader');
            document.body.append(loaderWrapper);
            loaderWrapper.append(loaderWindow);
        } else {
            document.querySelector('.loaderWrapper').remove();
        }
       
    }


    function createModalWindowSbr (data, kcsr) {
        let countRows = 10;
        let offset = 0;
        let dataPagination = data.slice(offset, countRows)
        console.log(dataPagination);
        let modalWrapper = document.createElement('div');
        let modalWindow = document.createElement('div');
        modalWrapper.classList.add('modalWrapper')
        modalWindow.classList.add('modal');

        let btnBack = document.createElement('button');
        let btnNext = document.createElement('button');
        btnBack.innerHTML = 'Назад';
        btnNext.innerHTML = 'Дальше';
        btnNext.onclick = function () {
            offset = offset + countRows;
            renderListItems(data.slice(offset, countRows));
        }


        
        //let tdRkbk = document.querySelector('input.expense-rkbk')
        function  renderListItems (dataPagination) {
            for (let item of dataPagination) {
                let kcsrCode = kcsr.find(itemKcsr => itemKcsr.code == item.kcsr.code);
                let actionKcsr = kcsr.find(itemKcsr => itemKcsr.code == kcsrCode.parentcode);
                let subprogramKcsr = kcsr.find(itemKcsr => itemKcsr.code == actionKcsr.parentcode);
                let programKcsr = kcsr.find(itemKcsr => itemKcsr.code == subprogramKcsr.parentcode);
                console.log(kcsrCode, actionKcsr, subprogramKcsr, programKcsr)
                let div = document.createElement('div');
                div.innerHTML = item.kvsr.code + ' ' + item.rzpr.code + ' ' + item.kcsr.code + ' ' + item.kvr.code + ' '+ item.amount + ' ' + item.year;
                div.addEventListener('click', (e) => {
                    console.log(e)
                    formOrder['expense-rkbk'].value = item.kvsr.code + ' ' + item.rzpr.code + ' ' + item.kcsr.code + ' ' + item.kvr.code;
                    formOrder['expense-name'].innerHTML = programKcsr?.name ? programKcsr.name + ', '  : "" + subprogramKcsr.name + ', ' + actionKcsr.name + ', ' + kcsrCode.name;
                    formOrder['expense-sum'].value = item.amount;
                    modalWindow.remove();
                    modalWrapper.remove();

                    //modalWindow.style.display = "none"
                })
                modalWindow.append(div);
            }
        }

        renderListItems (dataPagination)

        document.body.append(modalWrapper);
        modalWrapper.append(modalWindow);
        modalWindow.append(btnBack);
        modalWindow.append(btnNext);
    }

    function fetchRkbk () {
        let url = 'https://budget.gov.ru/epbs/registry/7710568760-BUDGETCLASCOSTSMO/data?pageSize=1000&filterppocode=65741000'

        let btnRkbk = document.querySelector('#btn-rkbk');
        btnRkbk.addEventListener('click', () => {
            fetch(url)
                .then(response => response.json())
                .then(result => {createModalWindow(result.data)})
        })
    }


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
            let inpts = row.querySelectorAll('.income__row');
            for (let inpt of inpts) {
                obj[inpt.name.split('-')[1]] = inpt.value;
                
            }
            income.push(obj)
        }

        for (let row of rowsExpense) {
            let obj = {};
            let inpts = row.querySelectorAll('.expense__row');
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
        modal.style.display = "none"
        modal.innerHTML = "";
        resolve(order)
        //console.log(order)
        // orders.data.splice(index, 1, order);
        // modal.innerHTML = "",
        // modal.style.display = "none"
        // await orders.save(orders)
        // await orders.getOrders();
        // console.log("событие")
        // await orderListDom(orders);
        
    })
            // createModal(order, index)
            // let div = document.createElement('div')
            // let btnClose = document.createElement('button');
            // btnClose.innerHTML = 'закрыть'
            // let btnSave = document.createElement('button');
            // btnSave.innerHTML = 'сохранить'
            // let body = document.querySelector('body');
    
            // body.append(div);
            // div.append(btnSave);
            // div.append(btnClose);
    
            // btnSave.addEventListener('click', () => {
            //     modal.style.display = "none"
            //     modal.innerHTML = "";
            //     resolve(order)
            // });
            btnClose.addEventListener('click', () => {
                modal.style.display = "none"
                modal.innerHTML = "";
                reject()
            })
    
        })
    }
}