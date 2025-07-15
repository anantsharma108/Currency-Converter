let select=document.querySelectorAll('.select')
for (let i in countryList){
    let newOption=document.createElement('option')
    newOption.innerText=i
    newOption.value=i
    select[0].append(newOption)
    if(newOption.value==='USD'){
        newOption.setAttribute('selected','selected')
        img=document.querySelector('#img')
        img.src="https://flagsapi.com/US/flat/64.png"
    }
    let newOption1=document.createElement('option')//new element addd krne ke liye new option ka clone banaya kyuki append,prepend vgerah buss ek hi jagah add kr skte hai
    newOption1.innerText=i
    newOption1.innerText=i
    select[1].append(newOption1)
    if(newOption1.innerText==='INR'){
        newOption1.selected=true
        img1=document.querySelector('#img1')
        img1.src="https://flagsapi.com/IN/flat/64.png"
    }
}

let form=document.querySelector('form')
form.addEventListener('submit',(event)=>{
    event.preventDefault();
})

select.forEach((menu) =>{
    menu.addEventListener('change',()=>{
        option=menu.options[menu.selectedIndex]
        value=option.value
        img=menu.parentElement.querySelector('img')  //jis menu mein hai uska parent element
        img.src="https://flagsapi.com/"+countryList[value]+"/flat/64.png"
        }); 
});

btn=document.querySelector('#btn')      
btn.addEventListener('click',async ()=>{
    let amount=document.querySelector('#amount').value  //amount meri ek string value hai pr usse koi fark nahi
    let from=select[0].options[select[0].selectedIndex].value//konsa option select kiya hai uske liye
    let to=select[1].options[select[1].selectedIndex].value
    let result=document.querySelector('#result_text')

    if(amount<0 || amount===''){
        document.querySelector('#amount').value=1    //if amount is less than 0 then it will convert into 1 
        amount=1       //jisse amount variable value bhi 1 set ho jaye kyuku print vahi ho rhi hai
    }
    if(from===to){
        result.innerText=amount
    }else{
        
        let response=await fetch('https://open.er-api.com/v6/latest/'+from)
        data=await response.json()
        if(data.result==='error'){
            result.innerText=`${from} is not available.. Try some different other than ${from}`
        }else{
            let rate=data.rates[to] //data mein bahut sare objects hai usme se rates wale object mein from wali currency ke sare rates given hai toh usme se to wali currency ka rate nikalo
            if(rate===undefined){
                result.innerText=`${to} is not available with ${from}.. Try some different other than ${to}`
            }else{
                if(!(rate*amount)){
                    result.innerText=`Please enter only numbers in amount`
                }else{
                    console.log(rate*amount)
                    result.innerText=`${amount} ${from} = ${rate*amount} ${to}`
                }
            }
        }        
    }    
});
