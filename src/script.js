/*
Copyright (c) 2021 by fonfonbee (https://codepen.io/fonfonbee/pen/rNwazmK)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var inputBox = document.getElementById('inputbox');
var progress = [0,0,0,0,0,0,0,0];
var newArrowValue = [];
var newArrow = [];
var newAttribute = [];
var oldAttribute = [];
var arrowKeys = [37,38,39,40];
var arrowOpacity = '0.5';
var r1 = document.getElementsByClassName('r1');
var r2 = document.getElementsByClassName('r2');
var r3 = document.getElementsByClassName('r3');
var r4 = document.getElementsByClassName('r4');
var r5 = document.getElementsByClassName('r5');
var r6 = document.getElementsByClassName('r6');
var r7 = document.getElementsByClassName('r7');
var r8 = document.getElementsByClassName('r8');
var alpha = document.getElementsByClassName('alpha');
var alphaValue = ['a','a','a','a','a','a','a','a'];
var alphaList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '⌫'];

// generate random alphabet
for(let i=0; i < alphaValue.length; i++) {
   var w = alphaList[Math.floor(Math.random()*alphaList.length)];
   alphaValue[i] = w;
   alpha[i].innerHTML = alphaValue[i];
}

// pageload -> generate 1st row of arrows
for(let i=0; i<r1.length; i++) {
   //get random arrows
   var x = arrowKeys[Math.floor(Math.random()*arrowKeys.length)];
   newArrowValue[i] = x;
   switch (x) {
     case 37:
       newArrow[i] = '←';
       newAttribute[i] = 'left';
       oldAttribute[i] = 'leftold';
       break;
     case 38:
       newArrow[i] = '↑';
       newAttribute[i] = 'up';
       oldAttribute[i] = 'upold';
       break;
     case 39:
       newArrow[i] = '→';
       newAttribute[i] = 'right'; 
       oldAttribute[i] = 'rightold';
       break;
     case 40:
       newArrow[i] = '↓';
       newAttribute[i] = 'down';
       oldAttribute[i] = 'downold';
       break;
   }
}

// mapping arrows from the array
r1[progress[0]].innerHTML = newArrow[0];
r2[progress[1]].innerHTML = newArrow[1];
r3[progress[2]].innerHTML = newArrow[2];
r4[progress[3]].innerHTML = newArrow[3];
r5[progress[4]].innerHTML = newArrow[4];
r6[progress[5]].innerHTML = newArrow[5];
r7[progress[6]].innerHTML = newArrow[6];
r8[progress[7]].innerHTML = newArrow[7];

//change attribute for styling
r1[progress[0]].setAttribute("data-direction", newAttribute[0]);
r2[progress[1]].setAttribute("data-direction", newAttribute[1]);
r3[progress[2]].setAttribute("data-direction", newAttribute[2]);
r4[progress[3]].setAttribute("data-direction", newAttribute[3]);
r5[progress[4]].setAttribute("data-direction", newAttribute[4]);
r6[progress[5]].setAttribute("data-direction", newAttribute[5]);
r7[progress[6]].setAttribute("data-direction", newAttribute[6]);
r8[progress[7]].setAttribute("data-direction", newAttribute[7]);

//keypress
document.onkeydown = function (e) {
   // "turn off" the arrow light first!
   r1[progress[0]].setAttribute("data-direction", oldAttribute[0]);
   r2[progress[1]].setAttribute("data-direction", oldAttribute[1]);
   r3[progress[2]].setAttribute("data-direction", oldAttribute[2]);
   r4[progress[3]].setAttribute("data-direction", oldAttribute[3]);
   r5[progress[4]].setAttribute("data-direction", oldAttribute[4]);
   r6[progress[5]].setAttribute("data-direction", oldAttribute[5]);
   r7[progress[6]].setAttribute("data-direction", oldAttribute[6]);
   r8[progress[7]].setAttribute("data-direction", oldAttribute[7]);
   
   for(let i=0; i<10; i++) {// check all rows
      if (newArrowValue[i] == e.keyCode){// correct!
         if (progress[i] < 9){
            progress[i] += 1;// progress +1 if <9
         }
         else if (progress[i] >= 9){
            progress[i] = 0;// progress reset if =9
            enterNthAlpha(i);
            clearRow(i);
         }
      }
      else {// incorrect!
         progress[i] = 0;// progress reset
         clearRow(i);
      }
      
      // generate new arrow
      var y = arrowKeys[Math.floor(Math.random()*arrowKeys.length)];
      newArrowValue[i] = y;
      switch (y) {
         case 37:
            newArrow[i] = '←';
            newAttribute[i] = 'left';
            oldAttribute[i] = 'leftold';
            break;
         case 38:
            newArrow[i] = '↑';
            newAttribute[i] = 'up';
            oldAttribute[i] = 'upold';
            break;
         case 39:
            newArrow[i] = '→';
            newAttribute[i] = 'right'; 
            oldAttribute[i] = 'rightold';
            break;
         case 40:
            newArrow[i] = '↓';
            newAttribute[i] = 'down';
            oldAttribute[i] = 'downold';
            break;
      }
   }
   // mapping arrows from the array
   r1[progress[0]].innerHTML = newArrow[0];
   r2[progress[1]].innerHTML = newArrow[1];
   r3[progress[2]].innerHTML = newArrow[2];
   r4[progress[3]].innerHTML = newArrow[3];
   r5[progress[4]].innerHTML = newArrow[4];
   r6[progress[5]].innerHTML = newArrow[5];
   r7[progress[6]].innerHTML = newArrow[6];
   r8[progress[7]].innerHTML = newArrow[7];
   
   // change attribute for styling
   r1[progress[0]].setAttribute("data-direction", newAttribute[0]);
   r2[progress[1]].setAttribute("data-direction", newAttribute[1]);
   r3[progress[2]].setAttribute("data-direction", newAttribute[2]);
   r4[progress[3]].setAttribute("data-direction", newAttribute[3]);
   r5[progress[4]].setAttribute("data-direction", newAttribute[4]);
   r6[progress[5]].setAttribute("data-direction", newAttribute[5]);
   r7[progress[6]].setAttribute("data-direction", newAttribute[6]);
   r8[progress[7]].setAttribute("data-direction", newAttribute[7]);

}
function clearRow(x) {
   // generate new alphabet
   var xx = alphaList[Math.floor(Math.random()*alphaList.length)];
   switch (x) {
         case 0:
            for(let i=0; i<10; i++) {
               r1[i].innerHTML = '.';
               r1[i].setAttribute("data-direction", 'default');
               alphaValue[0] =xx;
               alpha[0].innerHTML = xx;
            }
            break;
         case 1:
            for(let i=0; i<10; i++) {
               r2[i].innerHTML = '.';
               r2[i].setAttribute("data-direction", 'default');
               alphaValue[1] =xx;
               alpha[1].innerHTML = xx;
            }
            break;
         case 2:
            for(let i=0; i<10; i++) {
               r3[i].innerHTML = '.';
               r3[i].setAttribute("data-direction", 'default');
               alphaValue[2] =xx;
               alpha[2].innerHTML = xx;
            }
            break;
         case 3:
            for(let i=0; i<10; i++) {
               r4[i].innerHTML = '.';
               r4[i].setAttribute("data-direction", 'default');
               alphaValue[3] =xx;
               alpha[3].innerHTML = xx;
            }
            break;
         case 4:
            for(let i=0; i<10; i++) {
               r5[i].innerHTML = '.';
               r5[i].setAttribute("data-direction", 'default');
               alphaValue[4] =xx;
               alpha[4].innerHTML = xx;
            }
            break;
         case 5:
            for(let i=0; i<10; i++) {
               r6[i].innerHTML = '.';
               r6[i].setAttribute("data-direction", 'default');
               alphaValue[5] =xx;
               alpha[5].innerHTML = xx;
            }
            break;
         case 6:
            for(let i=0; i<10; i++) {
               r7[i].innerHTML = '.';
               r7[i].setAttribute("data-direction", 'default');
               alphaValue[6] =xx;
               alpha[6].innerHTML = xx;
            }
            break;
         case 7:
            for(let i=0; i<10; i++) {
               r8[i].innerHTML = '.';
               r8[i].setAttribute("data-direction", 'default');
               alphaValue[7] =xx;
               alpha[7].innerHTML = xx;
            }
            break;
      }
}
function enterNthAlpha(i){
   if (alphaValue[i] == '⌫'){
      inputBox.value = '';
   }
   else　if (typeof alphaValue[i] !== "undefined"){
      inputBox.value += alphaValue[i];
   }
}