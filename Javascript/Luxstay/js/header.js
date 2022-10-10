const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const vndMain = $('.header__nav--country-main')
const vndSub = $('.header__nav--country-sub')

let toggle = false
function clickVnd () {
    if(toggle == true) {
        vndSub.style.display = 'none'
        toggle = false
    } else {
        vndSub.style.display = 'block'
        toggle = true
    }
}
vndMain.addEventListener( "click", () => {
    clickVnd()
})

const subSearch = document.querySelector('.header__search-sub')
const inputSearch = document.querySelector('.header__search--input')

function showsubsearch() {
    subSearch.style.display = 'block'
}
inputSearch.addEventListener('blur' , () => {
    subSearch.style.display = 'none'
})
