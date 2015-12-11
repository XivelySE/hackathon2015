var logInTheConsole = function(){
    console.log("Action taken");
}

module.exports = {
    name: 'Console Log',
    description: 'This action logs an item in the console for testing',
    execute: logInTheConsole
}