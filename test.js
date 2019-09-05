
function tester(command,list){
    
    let output = []

    for(let i = 0 ; i <command ; i++){
        let temp = ''
        for(let j = 0 ; j <list ; j++){
         temp += '|' 
        }
        output.push(temp)
    }
    return output 
}

console.log(tester(3,10))
