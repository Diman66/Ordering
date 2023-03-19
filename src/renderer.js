import { nanoid } from 'nanoid'
import './index.css';



let entries = [];
window.storage.read().then((res)=> {
    entries = res
})

window.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('#btnAdd');
    let inpt = document.querySelector('input');
   
    btn.addEventListener('click', () => {
        let entry = {
            id: nanoid(), //=> "V1StGXR8_Z5jdHi6B-myT"
            name: inpt.value
        }
        entries.push(entry);
        window.storage.save(JSON.stringify(entries));
    })


    let btnRead = document.querySelector('#btnRead');
    let view = document.querySelector('#view');
    btnRead.addEventListener('click', () => {
        view.innerHTML = "";
        for (let item of entries) {
            let div = document.createElement('div');
            div.innerHTML = item.name;
            view.append(div);
        }
    })
})

console.log('👋 This message is being logged by "renderer.js", included via webpack');

