const navBtn = document.querySelector('.btn-nav') 
const navRespon = document.querySelector('.header-nav-respon-wrap')
const navSub = document.querySelector('.header-nav-sub')

navBtn.addEventListener('click' , () => {
    navRespon.style.display = 'block'
}) 
// navSub.addEventListener('click' , (e)=> {
//     e.preventDefault()
// })
navRespon.addEventListener('click' , (e) => {
    if(e.target == e.currentTarget) {
        navRespon.style.display = 'none'
    }
})