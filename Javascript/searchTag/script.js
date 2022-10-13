const input = document.querySelector('.input-search')
const remove = document.querySelector('.remove')
const removeAll = document.querySelector('.removeAll-btn')
const inputWrap = document.querySelector('.input--wrap')

var tags = ['HTML' , 'CSS' ]

function render () {
    inputWrap.innerHTML=''

    for(let i = 0; i<tags.length ; i++) {
        let tag = tags[i];
        inputWrap.innerHTML +=`
            <li class="tag">
                ${tag} 
                <i class="remove" onclick="removeTag(${i})">x</i>
            </li>
        `
    }
    inputWrap.appendChild(input)
    input.focus()
}

render()

function removeTag (index) {
    tags.splice(index , 1);
    render()
}

input.addEventListener('keydown' , function (event) {
    let value = input.value.trim()
    if(event.key == 'Enter') {
        tags.push(value)
        render()
        input.value = ''
    }
})

removeAll.addEventListener('click' , function () {
    tags=[]
    render()    
})

