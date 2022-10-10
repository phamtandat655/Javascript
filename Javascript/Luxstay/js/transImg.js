const prevBtn = document.querySelector('#content__outstanding-btn1')
const nextBtn = document.querySelector('#content__outstanding-btn2')

const slideContainer = document.querySelector('.content__outstanding-place')
const slideImg = [...document.querySelectorAll('.content__outstanding-place--link')]

// OutStanding Place

let outstandingPlace_width = slideImg[0].getClientRects()[0].width

let ipad = window.matchMedia("(max-width : 1120px) and (min-width : 740px)")
let mobile = window.matchMedia("(max-width : 740px)")

if(ipad.matches) {
    let ipadindex = 0
    let ipadrecipe = (slideImg.length - 1)/2 +1
    let ipadprevrecipe = 5
    slideshow(ipadindex , ipadrecipe , ipadprevrecipe)
}
else if(mobile.matches) {
    let mbindex = 0
    let mbrecipe = slideImg.length - 1
    let mbprevrecipe = 7
    slideshow(mbindex , mbrecipe , mbprevrecipe)
}
else{
    let pcindex = 0
    let pcrecipe = (slideImg.length - 1) / 2 -1
    let pcprevrecipe = 3
    slideshow(pcindex , pcrecipe , pcprevrecipe )
}

function slideshow (index , recipe , prevrecipe) {
    nextBtn.addEventListener('click' , function() {
        if(index < recipe ){
            index++
        }else {
            index = 0
        }
        slideContainer.style.transform = `translateX(-${index*(outstandingPlace_width  )}px)`
    })
    
    prevBtn.addEventListener('click' , function() {
        if(index > 0){
            index--
        }else {
            index = prevrecipe
        }
        slideContainer.style.transform = `translateX(-${index*(outstandingPlace_width  )}px)`
    })
}

// Lux stay

const luxPrev = document.querySelector('#content__luxstay-btn1')
const luxNext = document.querySelector('#content__luxstay-btn2')

const luxImgSlide = document.querySelector('.content__luxstay-wrap-about')
const luxImgLink = [...document.querySelectorAll('.content__luxstay-wrap-about-link')]

let luxStay_width = luxImgLink[0].getClientRects()[0].width

let ipad1 = window.matchMedia("(max-width : 1120px) and (min-width : 740px)")
let mobile1 = window.matchMedia("(max-width : 740px)")

if(ipad1.matches) {
    let ipadindex1 = 0
    let ipadrecipe1 = 4
    let ipadprevrecipe1 = 4
    slideshow1(ipadindex1 , ipadrecipe1 , ipadprevrecipe1)
}
else if(mobile1.matches) {
    let mbindex1 = 0
    let mbrecipe1 = 6
    let mbprevrecipe1 = 6
    slideshow1(mbindex1 , mbrecipe1 , mbprevrecipe1)
}
else{
    let pcindex1 = 0
    let pcrecipe1 = 3
    let pcprevrecipe1 = 3
    slideshow1(pcindex1 , pcrecipe1 , pcprevrecipe1)
}

function slideshow1 (index1 , recipe1 , prevrecipe1) {
    luxNext.addEventListener('click' , function() {
        if(index1 < recipe1 ){
            index1++
        }else {
            index1 = 0
        }
        luxImgSlide.style.transform = `translateX(-${index1*(luxStay_width )}px)`
    })
    
    luxPrev.addEventListener('click' , function() {
        if(index1 > 0){
            index1--
        }else {
            index1 = prevrecipe1
        }
        luxImgSlide.style.transform = `translateX(-${index1*(luxStay_width)}px)`
    })
}


// Explore

const exploreSlide = document.querySelector('.content_explore-wrap-about')
const exploreImg = [...document.querySelectorAll('.content_explore-wrap-about-link')]

const explorePrev = document.querySelector('#content_explore-btn1')
const exploreNext = document.querySelector('#content_explore-btn2')

let explore_width = exploreImg[0].getClientRects()[0].width

let ipad2 = window.matchMedia("(max-width : 1120px) and (min-width : 740px)")
let mobile2 = window.matchMedia("(max-width : 740px)")

if(ipad2.matches) {
    let ipadindex2 = 0
    let ipadrecipe2 = 4
    let ipadprevrecipe2 = 4
    slideshow2(ipadindex2 , ipadrecipe2 , ipadprevrecipe2)
}
else if(mobile2.matches) {
    let mbindex2 = 0
    let mbrecipe2 = 5
    let mbprevrecipe2 = 5
    slideshow2(mbindex2 , mbrecipe2 , mbprevrecipe2)
}
else{
    let pcindex2 = 0
    let pcrecipe2 = 3
    let pcprevrecipe2 = 3
    slideshow2(pcindex2, pcrecipe2 , pcprevrecipe2 )
}

function slideshow2 (index , recipe , prevrecipe) {
    exploreNext.addEventListener('click' , function() {
        if(index < recipe ){
            index++
        }else {
            index = 0
        }
        exploreSlide.style.transform = `translateX(-${index*(explore_width )}px)`
    })
    
    explorePrev.addEventListener('click' , function() {
        if(index > 0){
            index--
        }else {
            index = prevrecipe
        }
        exploreSlide.style.transform = `translateX(-${index*(explore_width )}px)`
    })
}


// How to use
const htuPrev = document.querySelector('#content_howtouse-btn1')
const htuNext = document.querySelector('#content_howtouse-btn2')

const htuSlide = document.querySelector('.content_howtouse-wrap-about')
const htuImg = [...document.querySelectorAll('.content_howtouse-wrap-about-link')]

let htu_width = htuImg[0].getClientRects()[0].width

let ipad3 = window.matchMedia("(max-width : 1120px) and (min-width : 740px)")
let mobile3 = window.matchMedia("(max-width : 740px)")

if(ipad3.matches) {
    let ipadindex3 = 0
    let ipadrecipe3 = 3
    let ipadprevrecipe3 = 3
    slideshow3(ipadindex3 , ipadrecipe3 , ipadprevrecipe3)
}
else if(mobile3.matches) {
    let mbindex3 = 0
    let mbrecipe3 = 4
    let mbprevrecipe3 = 4
    slideshow3(mbindex3 , mbrecipe3 , mbprevrecipe3)
}
else{
    let pcindex3 = 0
    let pcrecipe3 = 2
    let pcprevrecipe3 = 2
    slideshow3(pcindex3, pcrecipe3 , pcprevrecipe3 )
}

function slideshow3 (index , recipe , prevrecipe) {
    htuNext.addEventListener('click' , function() {
        if(index < recipe ){
            index++
        }else {
            index = 0
        }
        htuSlide.style.transform = `translateX(-${index*(htu_width)}px)`
    })
    
    htuPrev.addEventListener('click' , function() {
        if(index > 0){
            index--
        }else {
            index = prevrecipe
        }
        htuSlide.style.transform = `translateX(-${index*(htu_width )}px)`
    })
}