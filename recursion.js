const fs = require('fs');

function recursion() {
    const ans = fs.readdirSync('./')

    console.log(ans)
}

recursion();