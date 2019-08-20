
const patterns = [
  'you_can_use_arrow_key_left_or_right',
  'gray16',
  'gray32',
  'gray64',
  'gray128',
  'gray256',
  'gray',
  'red',
  'green',
  'blue',
  'white',
  'black',
  'colorBar16',
  'colorBar32',
  'colorBar64',
  'colorBar128',
  'colorBar256',
  'colorBar',

]

let index = 0;
location.hash = patterns[index];
document.addEventListener('keyup', e => {
  const code = e.keyCode;
  switch (code) {
    case 37: // <-
      index -= 1;
      if (index <= 0) index = patterns.length -1;
      break;
    case 39: // ->
      index += 1;
      if (index >= patterns.length) index = 1;
      break;
  }
  location.hash = patterns[index];
})

window.addEventListener('hashchange', () => {
  document.body.className = location.hash.split('#').pop();
})


// ---
// 16
function gen16 () {
  var str = [];
  var level = 16;
  var bit = 16;
  for (let i = 0; i < bit; i+=1) {
    var c = (i).toString(16);

    str.push(`#${c}${c}${c} ${100/bit*(i)}%, #${c}${c}${c} ${100/bit*(i+1)}%`)
  }
  str.join()
}

function gen16_256 () {
  function NumTo0x00(num) {
  const n0x = Number(num.toFixed(0)).toString(16);

  if (n0x.length < 2) return `0${n0x}`;
    else return n0x;
  }

  var gray = [];
  var red = [];
  var green = [];
  var blue = [];
  var level = 128;
  var bit = 16*16;
  var gradientColor = bit/level
  var gradient = bit/level
  for (let i = 0; i < level; i+=1) {
    var c = NumTo0x00(i*(gradientColor));
    var percent0 = 100/bit*(i)*gradient
    var percent1 = 100/bit*(i+1)*gradient
    // console.log('index: ', i, ', color: ', c, i*(gradientColor), ', %: ', percent0, percent1, gradientColor, gradient)

    gray.push(`#${c}${c}${c} ${percent0}%, #${c}${c}${c} ${percent1}%`)
    red.push(`#${c}0000 ${percent0}%, #${c}0000 ${percent1}%`)
    green.push(`#00${c}00 ${percent0}%, #00${c}00 ${percent1}%`)
    blue.push(`#0000${c} ${percent0}%, #0000${c} ${percent1}%`)
  }
  console.log('gray: ', gray.join())
  console.log('red: ', red.join())
  console.log('green: ', green.join())
  console.log('blue: ', blue.join())
}
