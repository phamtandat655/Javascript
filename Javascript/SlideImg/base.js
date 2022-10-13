const IMG_WIDTH = 400;
const slidesContainer = document.querySelector('.slides')
const slideImages = [ ...document.querySelectorAll('.slide') ]
const prevClick = document.querySelector('.btn__prev')
const nextClick = document.querySelector('.btn__next')

slidesContainer.style.width = `${slideImages.length * IMG_WIDTH}px`;

let index = 0;

function next() {
    if(index < slideImages.length - 1){
        index++;
    }else {
        index = 0;  
    }

    slidesContainer.style.transform = `translateX(-${index * IMG_WIDTH}px)`;
}

function prev() {
    if(index > 0){
        index--;
    }else {
        index = slideImages.length - 1;  
    }

    slidesContainer.style.transform = `translateX(-${index * IMG_WIDTH}px)`;
}

prevClick.addEventListener('click', function() {
    prev();
})

nextClick.addEventListener('click', function() {
    next();
})

setInterval (next , 1000);
