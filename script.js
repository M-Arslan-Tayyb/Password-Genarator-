

const display_input_field=document.querySelector('.display_input_field');
const copy_button=document.querySelector('.copy_button');
const copy_animation=document.querySelector('.copied_animation');
const increment_counter=document.querySelector('.increment_counter');
const slider=document.querySelector('.slider');
const input_slider=document.querySelector('#myRange');


const upper_case=document.querySelector('#upper_case');
const lower_case=document.querySelector('#lower_case');
const numbers=document.querySelector('#numbers');
const symbols=document.querySelector('#symbols');
const strength_color_circle=document.querySelector('[strength_color_circle]');
const generate_button=document.querySelector('.generate_button');

// initial_values
let password="";
let passwordInitialLength=10;
let checkCount=1;
upper_case.checked=true;
indicator("#ccc");

                                // function calls
sliderHandle();

                                // function declarations:
// sliderHandle
function sliderHandle(){
    slider.value=passwordInitialLength;
    increment_counter.textContent=passwordInitialLength;

    
    const min=slider.min;
    const max=slider.max;
    // now I want that jitna password ki length ha utna bg color fill ho wrna na ho.
    slider.style.backgroundSize =  ((passwordInitialLength-min)*100/(max-min))+"% 100%";

}

// strength_color_circle function:

function indicator(color){
    // it is setting color and shadow
    strength_color_circle.style.backgroundColor=color;
    // shadow:
    strength_color_circle.style.boxShadow = `0px 0px 12px 1px ${color}`;
    
}

// random Integer:

function randomInteger(){
    let randomIntNumber=Math.floor(Math.random() * 10);
    return randomIntNumber;
}


// uppercase :
function randomUppercaseLetter() {
    // ASCII value of 'A' is 65, and 'Z' is 90
    let asciiValue = Math.floor(Math.random() * (90 - 65 + 1)) + 65; // will produce random num bw 65 to 90
    let randomUppercaseLetter = String.fromCharCode(asciiValue);
    return randomUppercaseLetter;
}

// lowercase :
function randomLowercaseLetter() {
    // ASCII value of 'a' is 97, and 'z' is 122
    let asciiValue1 = Math.floor(Math.random() * (122 - 97 + 1)) + 97; // will produce random num bw 65 to 90
    console.log(asciiValue1);
    let randomLowercaseLetter1 = String.fromCharCode(asciiValue1);
    console.log(randomLowercaseLetter1);
    return randomLowercaseLetter1;
}

// symbols:
// special symbols start from 33 to 47, 58 to 64, 92 to 96 and 123 to 126.
function randomSpecialCharacter() {
    // Define ASCII ranges for special characters
    const ranges = [
        [33, 47],  // ASCII values from 33 to 47
        [58, 64],  // ASCII values from 58 to 64
        [92, 96],  // ASCII values from 92 to 96
        [123, 126] // ASCII values from 123 to 126
    ];

    // Choose a random range
    const randomRange = ranges[Math.floor(Math.random() * ranges.length)];

    // Generate a random ASCII value within the chosen range
    const asciiValue = Math.floor(Math.random() * (randomRange[1] - randomRange[0] + 1)) + randomRange[0];

    // Convert ASCII value to a character
    const randomSpecialCharacter = String.fromCharCode(asciiValue);

    return randomSpecialCharacter;
}

// calculate strength:


function calcStrength(){
    indicator("#fff");//for default case white
    let upper=false;
    let lower=false;
    let number=false;
    let symbol=false;

    if(upper_case.checked){//checked property returns boolean value
        upper=true;
    }
    if(lower_case.checked){//checked property returns boolean value
        lower=true;
    }
    if(symbols.checked){//checked property returns boolean value
        symbol=true;
    }
    if(numbers.checked){//checked property returns boolean value
        number=true;
    }
    
    // as strengthen of password depends upon some rules like (1 checkbox is active then weak),(2 are active then also weak), (3 or more then strong)

    if(upper&&lower &&(number||symbol)&&passwordInitialLength>=8){
        indicator('#0f0');//green
    }
    else if(upper||lower &&(number||symbol)&&passwordInitialLength>=5){
        indicator("#ff0");//yellow
    }
    else{
        indicator('#f00');//red, weak
    }
}


// copied_animation:
async function copied_anima(){
    // copy content to clipboard
    // using writeText() Function that always returns a promise 
    // if the promise is resolved then means content is loaded to clipboard
    // successfully, otherwise not.
    try{
        await navigator.clipboard.writeText(display_input_field.value); //using await because writeText calls an API
        copy_animation.textContent='copied';
    }
    catch(e){
        copy_animation.textContent='Failed';
    }
    //yaha pr ma setTimeout use krna chahta ho to thori dar ka liya active class ko add kiya jis pr ma 
    // css apply kro ga or phir setTimeout ma remove kr du ga

    copy_animation.classList.add('active');
    setTimeout(function(){
        copy_animation.classList.remove('active');

    },2000);


}

                                            // Event listners



// event listner for slider that changes the value
slider.addEventListener('input',function(e){
    passwordInitialLength=e.target.value;
    sliderHandle();
})

// for copy button:

copy_button.addEventListener('click',function(){
    if(display_input_field.value){
        copied_anima();
    }
})


// checkboxes:
function special_case_for_checkBox(){
    if(passwordInitialLength<checkCount){
        passwordInitialLength=checkCount;
        sliderHandle();
    }
}

upper_case.addEventListener('change',function(){
    if(upper_case.checked==true){
        checkCount++;
        special_case_for_checkBox();
    }
    else{
        checkCount--;
        special_case_for_checkBox();
    }
})
lower_case.addEventListener('change',function(){
    if(lower_case.checked==true){
        checkCount++;
        special_case_for_checkBox();

    }
    else{
        checkCount--;
        special_case_for_checkBox();
    }
})
numbers.addEventListener('change',function(){
    if(numbers.checked==true){
        checkCount++;
        special_case_for_checkBox();
    }
    else{
        checkCount--;
        special_case_for_checkBox();
    }
})
symbols.addEventListener('change',function(){
    if(symbols.checked==true){
        checkCount++;
        special_case_for_checkBox();

    }
    else{
        checkCount--;
        special_case_for_checkBox();

    }
})
// Generate password:

function shufflePassword(str) {//Fisher method
    let array = str.split('');
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.join('');
}



generate_button.addEventListener('click',function(){
    

    if(checkCount==0){
        return;
    }
    if(passwordInitialLength<checkCount){
        passwordInitialLength=checkCount;
        sliderHandle();
    }

    // now generating new pass:

    // first of all remove old password:
    password="";
    
    if(upper_case.checked){
        password+=randomUppercaseLetter();
    }
    if(lower_case.checked){
        password=password+randomLowercaseLetter();
    }
    if(numbers.checked){
        password+=randomInteger();
    }
    if(symbols.checked){
        password+=randomSpecialCharacter();
    }
    

    // ab above four if statement ma masla ya ha ka ya four statements sirf maximum 4 values generate kry ga
    // or agr user na pass ki length 10 rakh di to baki 6 kesy generate hon ga.

    if(passwordInitialLength>checkCount){
        let remaining = passwordInitialLength-checkCount;
        // ab is remaining ma, ma koi be random password generate kr skta ho.
        let functionArray=[randomInteger,randomUppercaseLetter,randomLowercaseLetter,randomSpecialCharacter];
        for(let i=1;i<=remaining;i++){
            let var1=Math.floor(Math.random()*4);
            password+=functionArray[var1]();
        }
    }
    // console.log(password);

    // now yaha pr kiya ho rha ha ka first four characters always wohi ho ga jo checked ho ga
    // to ya to random password na hoa, ya crack ho skta ha
    // now we need to suffle it.

    password=shufflePassword(password);
    
    // now display on input field
    display_input_field.value=password;
    display_input_field.style.color = 'var(--vb-yellow)';
    display_input_field.style.fontSize = '0.97rem';
    display_input_field.style.fontWeight = 'bold';
    // display_input_field.style.textTransform = 'uppercase';
    display_input_field.style.letterSpacing = '1px';
    display_input_field.style.opacity = '0.8';

    // now last thing calcStrength:
    calcStrength();
    
});





