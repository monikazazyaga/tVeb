const nanoid = require("nanoid");
const { getDb } = require("./db");

module.exports = {
    getUserIdByToken: async (token) => {
        const result = await getDb().get('SELECT UserId FROM tokens WHERE token = ?', [token]);
        return result?.UserId;
    },
    
    deleteByToken: async (token) => {
        await getDb().run('DELETE FROM tokens WHERE token = ?', [token]);
    },
    
    addToken: async (UserId) => {
        const token = nanoid();
        
        const tokenRow = await getDb().get('SELECT * FROM tokens WHERE UserId = ?', [UserId]);
        if (tokenRow) {
            await getDb().run('UPDATE tokens SET token = ? WHERE UserId = ?', [token, UserId]);
        } else {
            await getDb().run('INSERT INTO tokens (token, UserId) VALUES (?, ?)', [token, UserId]);
        }
        
        return token;
    },
};
