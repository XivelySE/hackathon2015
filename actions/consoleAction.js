var logInTheConsole = function(){
    console.log("Action taken");
}

exports = {
    name: 'Console action',
    description: 'This action logs an item in the console for testing purposes',
    exec: logInTheConsole
}