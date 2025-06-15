const head = document.getElementById('head')
console.log(head);

const button = document.getElementById('btn');
button.addEventListener('click',()=>{
    btn.style.backgroundColor = "blue";
})

head.style.color = "red";
head.style.border = "4px solid green"

head.addEventListener('click',()=>{
    head.style.backgroundColor = "blue"
})