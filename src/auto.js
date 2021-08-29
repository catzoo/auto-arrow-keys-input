/*
MIT License

Copyright (c) 2021 catzoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var codeReference = {'←': 37, '↑': 38, '→': 39, '↓': 40}
var active = false

async function push(key) {
    // keyCode is deprecated, need to modify script.js to use something else
    var event = new KeyboardEvent('keydown', {'keyCode': key})
    await new Promise(r => setTimeout(r, 50))
    document.dispatchEvent(event)
}

function search(text) {
    // This uses alpha var from script.js
    for (let i=0; i<alpha.length; i++) {
        if (alpha[i].innerHTML === text) {
            return i + 1
        }
    }
    return null
}

async function getAlpha(text) {
    var row = null
    do {
        await push(0) // Send nothing to reset all rows
        row = search(text) // Attempt to find text
    } while(row === null)
    return row
}

async function completeRow(row) {
    row = document.getElementsByClassName('r' + row)
    var i = 0
    var arr = ''

    // Completing the row
    while(i !== row.length - 1) {
        // Getting the arrow
        for (i = row.length - 1; i>=0; i--) {
            arr = row[i].innerHTML
            if (arr !== '.') {
                break
            }
        }
        // Pushing the key
        await push(codeReference[arr])
    }
    // At the end of the row, its completed
    return true
}

async function printString(text) {
    // This uses alphaList var from script.js
    text = text.toLowerCase()

    for(let i=0; i<text.length; i++) {
        let a = text[i]
        if (alphaList.includes(a)) {
            row = await getAlpha(a)
            await completeRow(row)
        }
    }
}

async function keyEvent(e) {
    if (!active) {
        active = true
        switch(e.key) {
            case 'Backspace':
                await printString('⌫')
                break

            case 'Control':
                var text = prompt("Enter a sentence to type")
                if (text != '' && text !== null)
                    await printString(text)
                break

            default:
                if (e.key.length == 1)
                    await printString(e.key)
        }
        active = false
    }
}
document.addEventListener('keydown', keyEvent)
