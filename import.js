var fs = require('fs')

const getDateString = () => {
    date = new Date()
    year = date.getFullYear()
    month = date.getMonth()+1
    dt = date.getDate()

    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }

    return year+'-' + month + '-' + dt
}


// Load existing list
fs.readFile('number-list.json', 'utf8', function(err, existingContent) {
    let existingNumbers = JSON.parse(existingContent)

    // Load list of new numbers from file
    fs.readFile('import.json', 'utf8', function(err, content) {
        let newNumbers = JSON.parse(content)

        for(let key in newNumbers){
            
            if(!existingNumbers[key]){
                existingNumbers[key] = getDateString()
            }
        }

        // Order keys
        existingNumbers = Object.keys(existingNumbers).sort().reduce((accumulator, currentValue) => {
            accumulator[currentValue] = existingNumbers[currentValue]
            return accumulator
          }, {})
    
        // Write to file
        fs.writeFile("number-list.json", JSON.stringify(existingNumbers, null, 2), function(err) {
            if(err) {
                return console.log(err)
            }
    
            console.log("The file was saved!")
        });
    })
})