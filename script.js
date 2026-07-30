
//function to get random integer between the range
function getRandomInt(min, max) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    
    return min + (randomBuffer[0] % range);
}

//function to shuffl a array
function shuffle(array){
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

//function to generate the password to the desire length
function getPassword(length, upper, lower, num, sym) { 
    let groups = []

    if(upper){groups.push(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}
    if(lower){groups.push(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])}
    if(num){groups.push(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])}
    if(sym){groups.push(['!', '#', '$', '%', '&', '*', '/', '?', '@', '_'])}

    // let value_count = upper + lower + num + sym

    let password = []

    for(let i = 0; i < groups.length; i++){            
        const group = groups[i]
        let index = Math.floor(Math.random() * group.length)
        password.push(group[index])
    }
    while(password.length < length){
        const groupNo = Math.floor(Math.random() * groups.length) 
        const group = groups[groupNo]
        let index = Math.floor(Math.random() * group.length)
        password.push(group[index])
    }    
    shuffle(password)
    return password.join("")
}

let password_lenght = 32;
let track = document.querySelector(".line")
let fill = document.querySelector(".line-color")
let isDragging = false;

const input = document.querySelector(".password")

//custom slider
function updateSlider(e) {  
  const rect = track.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  offsetX = Math.max(0, Math.min(offsetX, rect.width));
  const percentage = (offsetX / rect.width) * 100;  

  // Update UI
  fill.style.width = `${percentage}%`;
  let len = Math.floor(64 * percentage/100)+6
  password_lenght = len
  document.querySelector(".num").innerHTML = len
}

const options = {
    includeUpper : true,
    includeLower : true,
    includeNum : true,
    includeSymboll : true
};

//setting includ buttns
document.querySelectorAll(".swap-btn").forEach(btn=>{
    btn.addEventListener('click', ()=>{        
        const id = btn.id;
        options[id] = ! options[id]

        btn.querySelector(".swap").style.right = options[id] ? "4px":"21px";
        btn.style.backgroundColor = options[id] ? "var(--blue)":"var(--grey-o-black)";
        btn.style.boxShadow = options[id] ? "0 0 7px 0px rgb(100 210 255 / 70%)":"none";
    })
})



//get first password after reload
input.value = getPassword(password_lenght, options.includeUpper, options.includeLower, options.includeNum, options.includeSymboll)

//to past text in user's clipboard
document.querySelector(".copy-btn").addEventListener('click', ()=>{
    let password = input.value;
    navigator.clipboard.writeText(password);    
    document.querySelector(".copy-btn").innerHTML = `<span>Copied!</span>
                        <img src="svg/tick.svg" alt="tick" class="tick">`
    setTimeout(() => {
        document.querySelector(".copy-btn").innerHTML = "Copy"
    }, 1500);
})

track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    track.setPointerCapture(e.pointerId); // Keeps listening even if pointer leaves element
    updateSlider(e);
});
  
track.addEventListener('pointermove', (e) => {
    if (isDragging) {
      updateSlider(e);
    }
});
  
track.addEventListener('pointerup', (e) => {
    isDragging = false;
    track.releasePointerCapture(e.pointerId);
});

//setting the input optinos means what characters should be include



document.querySelector(".generate-btn").addEventListener('click', ()=>{
    let new_pass = getPassword(password_lenght, options.includeUpper, options.includeLower, options.includeNum, options.includeSymboll)
    input.value = new_pass
    check(new_pass)    
})

function iconchange(lineName, bool){
    if(bool){
        document.getElementById(lineName).src = "svg/check.svg"
    }
    else{
        document.getElementById(lineName).src = "svg/dull-check.svg"
    }
}

function check(string) {
    let trueCount = string.length >= 12 ? 1:0
    let check_list = [["characters12", string.length >= 12],
                    ["upper"],
                    ["lower"],
                    ["digit"],
                    ["special"]]
    let patterns_for_check = [/[A-Z]/, /[a-z]/, /\d/, /[!#$%&*/?@_]/]
    let i = 1

    patterns_for_check.forEach(pat=>{
        let result = pat.test(string)        
        check_list[i].push(result)
        i+=1;

        if (result){
            trueCount+=1
        }
    })
    
    //icons glow or not
    check_list.forEach(list=>{
        iconchange(list[0], list[1])
    })

    //strips color changeing
    allStrips = Array.from(document.querySelectorAll(".strip")) 

    
    if(trueCount==2){
        document.documentElement.style.setProperty('--change', "rgb(255, 149, 0)")
        document.querySelector(".fortess").innerHTML = "FAIR"
        document.querySelector(".input").style.boxShadow = "rgb(255 149 0 / 40%) 0px 0px 10px 3px"
    }
    else if(trueCount==3){
        document.documentElement.style.setProperty('--change', "rgb(255, 204, 0)")
        document.querySelector(".fortess").innerHTML = "GOOD"
        document.querySelector(".input").style.boxShadow = "rgb(255 204 0 / 40%) 0px 0px 10px 3px"
    }
    else if(trueCount==4){
        document.documentElement.style.setProperty('--change', "rgb(48, 209, 88)")
        document.querySelector(".fortess").innerHTML = "STRONG"
        document.querySelector(".input").style.boxShadow = "rgb(48 209 88 / 40%) 0px 0px 10px 3px"
    }
    else if(trueCount==5){
        document.documentElement.style.setProperty('--change', "rgb(100 210 255)")
        document.querySelector(".fortess").innerHTML = "FORTRESS"        
        document.querySelector(".input").style.boxShadow = "rgb(100 210 255 / 40%) 0px 0px 10px 3px"
    }  
    else{            
        document.documentElement.style.setProperty('--change', "rgb(255, 59, 48)")
        document.querySelector(".fortess").innerHTML = "WEAK"
        document.querySelector(".input").style.boxShadow = "rgb(255 59 48 / 40%) 0px 0px 10px 3px"
    }
    

    allStrips.slice(0, trueCount+1).forEach(strip=>{
        strip.style.backgroundColor = "var(--change)"        
    })
    allStrips.slice(trueCount, 6).forEach(strip=>{
        strip.style.backgroundColor = "#484848"
    })
}

document.querySelector(".password").addEventListener('input', ()=>{
    let password = input.value
    check(password)
})

