import '../style.css';

document.addEventListener('DOMContentLoaded', ()=>{
   
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

})