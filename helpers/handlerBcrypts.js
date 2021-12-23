const bcrypt = require('bcryptjs');

const encrypt = async (text) => {
    const hash = await bcrypt.hash(text, 10)
    return hash;
}

const compare = async (password, hashpassword) => {
    return await bcrypt.compare(password, hashpassword);
}

module.exports = {encrypt, compare};