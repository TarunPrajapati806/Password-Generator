sym_element.addEventListener('click', ()=>{
    if (includeUpper){
        sym_element.querySelector(".swap").style.right = "22px";
        sym_element.style.backgroundColor = "var(--grey-o-black)"
        sym_element.style.boxShadow = "None"
        includeUpper = false        
    }else{
        sym_element.querySelector(".swap").style.right = "4px";
        sym_element.style.backgroundColor = "var(--blue)"
        sym_element.style.boxShadow = "0 0 7px 0px rgb(100 210 255 / 70%)"
        includeUpper = true        
    }
})