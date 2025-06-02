const length = document.querySelector("#length-number");
const upper = document.querySelector("#uppercase");
const lower = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const input=document.querySelector("#pass-input");

const copy = document.querySelector("#copy");
const generate = document.querySelector("#generate");

const uppercasestr = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const lowercasestr = `abcdefghijklmnopqrstuvwxyz`;
const numbersstr = `0123456789`;
const symbolsstr = `!@#$%^&*()_+~-={}|[]\:";'<>?,./"`;

 let passwoerd='';

generate.addEventListener("click", () => {
  let str = "";
  if (upper.checked) {
    str += uppercasestr;
  }
  if (lower.checked) {
    str += lowercasestr;
  }
  if (numbers.checked) {
    str += numbersstr;
  }
  if (symbols.checked) {
    str += symbolsstr;
  }
  console.log(str);
   
 
  for(let i=0; i<length.value; i++){
    console.log(str.length);

    let index= Math.floor(Math.random()*str.length);
    console.log(index);
    console.log(Math.random());
    console.log(Math.random()*str.length);
    console.log(Math.floor(Math.random()*str.length));
    console.log(str[index]);
    passwoerd+=str[index];
  }
  console.log(passwoerd);
  input.value=passwoerd;
});


copy.addEventListener("click",()=>{
    if(input.value===''){
        alert("Please Generate Password First");
    }else{
        const newele=document.createElement("textarea");
        newele.value=input.value;
        document.body.appendChild(newele);
        newele.select();
        document.execCommand("copy");
        alert("password copied to clipboard");
        newele.remove();
    }
})

