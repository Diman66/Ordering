import '../style.css';

document.addEventListener('DOMContentLoaded', ()=>{
   
    let tds = document.querySelectorAll('td');

    for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function func() {
            let input = document.createElement('div');
            input.setAttribute('contenteditable', "true");
            input.innerHTML = this.innerHTML;
            this.innerHTML = '';
            this.append(input);
            input.focus();
            
            let td = this;
            input.addEventListener('blur', function() {
                td.innerHTML = this.innerHTML;
                td.addEventListener('click', func);
            });
            
            this.removeEventListener('click', func);
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
                tdRkbk.innerHTML = e.target.innerHTML
                modalWindow.style.display = "none"
            })
            modalWindow.append(div);
        }
       
        document.body.append(modalWindow);
    }

})