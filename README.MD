# Feature

scroll of page will divided into sections or segments, like slider in or slider out each other section.

# Usage

example:
there are some html element in a `body`;
```html
<div class="view">
  <div class="box box1">
    <div class="section1">box1</div>
  </div>
  <div class="box box2">
    <div class="section2">box2</div>
  </div>
  <div class="box box3">
    <div class="section3">box3</div>
  </div>
  <div class="line"></div>
</div>
```

## HTML

add a `script` tag link `scrollsection.js` file
```html
<script src="./scrollsection.js"></script>
```

## Javascript

initial scrollsection object
```js
var scrollsection = new scrollsection({
  container: '.view',
  section: '.box'
})
```
