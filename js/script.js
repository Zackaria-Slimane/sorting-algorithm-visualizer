const main_body = document.querySelector(".main-body");
const start_btn = document.querySelector("#start-btn");
const reset_btn = document.querySelector('#reset-btn');
const algo_type = document.querySelector('#algo-type');
const speed = document.querySelector('#speed');
const darkMode = document.querySelector('#darkMode');
const arr = [];
const arr_color = [];
let speed_val = 15; // slow -> 50 ms normal -> 15 ms fast -> 5 ms
let isSorting = false;


for(let i=0;i<30;i++){
    let num = getRandomLength();
    arr.push(num);
    arr_color.push("bg-primary");
}


function getRandomLength(){
    return (Math.random() * 500);
}


function algoChanged(){
    if(algo_type.value >= '1'){
        start_btn.removeAttribute('disabled');
    }
    else{
        start_btn.setAttribute('disabled',true);
    }
}


function speedChanged(){
    if(speed.value == 0)
        speed_val = 50;
    else if(speed.value == 1)
        speed_val = 15;
    else
        speed_val = 5;
}


function draw(){
    main_body.innerHTML = '';
    for(let i in arr){
        const height = arr[i] + 'px';
        div = document.createElement('div');
        div.setAttribute("id",i);
        div.setAttribute("class",`col ${arr_color[i]} poles`);
        div.style.height = height;
        div.style.border = '1px solid black';
        main_body.appendChild(div);
    }
}


draw();


function reset(){
    isSorting = false;
    arr.splice(0,arr.length);
    arr_color.splice(0,arr_color.length);
    for(let i=0;i<30;i++){
        let num = getRandomLength();
        arr.push(num);
        arr_color.push("bg-primary");
    } 
    draw();
}


function scan(index){
    document.getElementById(index).classList.remove("bg-primary");
    document.getElementById(index).classList.add("bg-warning");
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function visualizeAlgo(){

    isSorting = true;
    let n = arr.length;

    for(let i=0; i <= n - 2; i++){

        scan(i);
        await sleep(speed_val);
        let min = arr[i];

        for(let j = i + 1; j < n; j++){

            if(isSorting){

                scan(j);
                await sleep(speed_val);
                if(arr[j] < min){
                    min = arr[j];
                    let temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                }
                draw();
            }
            else{
                return;
            }
        }
        arr_color[i]= "bg-success";
    }

    arr_color[n-1] = "bg-success";
    arr_color[n-2] = "bg-success";
    draw();
}

function themeChanged() {
    if (darkMode.checked == false) {
        document.body.style.backgroundColor = "rgb(206, 203, 203)";
        document.body.style.color = "black";

    } else if (darkMode.checked == true) {
        document.body.style.backgroundColor = "rgb(19, 19, 19)";
        document.body.style.color = "white";
    }
}

// Event Listeners
start_btn.addEventListener("click",visualizeAlgo);
reset_btn.addEventListener("click",reset);
algo_type.addEventListener("change",algoChanged);
speed.addEventListener("change",speedChanged);
darkMode.addEventListener('change', themeChanged);