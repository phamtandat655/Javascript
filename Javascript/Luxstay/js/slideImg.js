const img = document.querySelector('.content__slider-item--img')
const slide = document.querySelector('.content__slider--slides')

const slide1 = document.querySelector('#content__slider-item1')
const slide2 = document.querySelector('#content__slider-item2')

const bnt1 = document.querySelector('#content__slider-btn1')
const bnt2 = document.querySelector('#content__slider-btn2')

const Img_Width = img.getClientRects()[0].width;

let index = 0;

// slide.style.width = `${1290 * 2}px`

function AutoSlide () {
    if(index == 0 ){
        slide.style.transform = `translateX(-${Img_Width}px)`
        bnt1.classList.remove('active')
        bnt2.classList.add('active')
        index = 1
    }
    else if (index == 1){
        slide.style.transform = `translateX(0px)`
        bnt1.classList.add('active')
        bnt2.classList.remove('active')
        index = 0
    }
}

// bnt2.addEventListener('click' , function() {
//     slide.style.transform = `translateX(-1290px)`
//     bnt1.classList.remove('active')
//     bnt2.classList.add('active')
//     index = 1
// })

// bnt1.addEventListener('click' , function() {
//     slide.style.transform = `translateX(0px)`
//     bnt1.classList.add('active')
//     bnt2.classList.remove('active')
//     index = 0
// })

bnt2.addEventListener('click' , function() {
    slide.style.opacity = '0'
    // AutoSlide()
    setTimeout(()=> {
        AutoSlide()
    } , 50)
    setTimeout(()=> {
        slide.style.opacity = '1'
    } , 150)
})

bnt1.addEventListener('click' , function() {
    slide.style.opacity = '0'
    // AutoSlide()
    setTimeout(()=> {
        AutoSlide()
    } , 50)
    setTimeout(()=> {
        slide.style.opacity = '1'
    } , 150)
})

// setInterval( AutoSlide , 3000 )

setInterval(function () {
    slide.style.opacity = '0'
    // AutoSlide()
    setTimeout(()=> {
        AutoSlide()
    } , 50)
    setTimeout(()=> {
        slide.style.opacity = '1'
    } , 150)
} , 3000)