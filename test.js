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

console.log(getPassword(6, false, true, true, true))