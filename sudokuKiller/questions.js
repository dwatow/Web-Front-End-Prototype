var file = new XMLHttpRequest();
file.onreadystatechange = readFile;
file.open('get', "questions.js", true);
console.dir(file);
file.send();
// console.log('xxxx');
function readFile() {
  if(this.readyState == 4 && this.status == 200) {
    console.log(this.response);
  }
}
