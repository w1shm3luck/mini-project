const fs = require('fs')

fs.writeFileSync('notes.txt', 'Hello World!')

const list = {
    category: [
        {"id": 1, name: "Makanan"},
        {"id": 2, name: "Minuman"},
    ],
}
fs.writeFileSync('data.json', JSON.stringify(list))
