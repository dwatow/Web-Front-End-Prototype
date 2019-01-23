
const patterns = [
  'you_can_use_arrow_key_left_or_right',
  'gray256',
  'gray16',
  'red',
  'green',
  'blue',
  'write',
  'black',
]

let index = 0;
location.hash = patterns[index];
document.addEventListener('keyup', e => {
  const code = e.keyCode;
  switch (code) {
    case 37: // <-
      index -= 1;
      if (index <= 0) index = patterns.length -1;
      console.log(index);
      break;
    case 39: // ->
      index += 1;
      if (index >= patterns.length) index = 1;
      console.log(index);
      break;
  }
  location.hash = patterns[index];
})

window.addEventListener('hashchange', () => {
  console.log(patterns[index], index, location.hash);
  document.body.className = location.hash.split('#').pop();
})
