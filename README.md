# 視差滾動 使用純CSS

這是一篇網路看來的文章
- [Pure CSS Parallax Websites](http://keithclark.co.uk/articles/pure-css-parallax-websites/)
- [純CSS視差滾動Demo(有debug版)](http://keithclark.co.uk/articles/pure-css-parallax-websites/demo3/)

> 不過鋪陳重新編排!!!



## 先看「實現最低需求」

這一篇是要你使用兩個屬性做視差滾動。
1. `perspective: npx`(容器)
2. `transform: `
    - `translateZ(npx)`(元素)
    - `scale(n)`



### HTML的架構

- 定義視差滾動元件
    - 視差滾動容器`parallax__container`
- 設定圖層
    - 基礎層`parallax__layer--base`
    - 背景層`parallax__layer--back`


```htmlmixed=
<div class="parallax__container">
  <div class="parallax__layer--base">
    <div class="aims"></div>
  </div>
  <div class="parallax__layer--back">
    <div class="aims"></div>
  </div>
  <div class="parallax__layer--base">
    <div class="aims"></div>
  </div>
</div>
```


### CSS的架構

- 滾動元件(`parallax__container`)
    - 景深(`perspective`): 設定一個「標準景深值」
- 基本圖層(`parallax__layer--base`)
    - `transform: translateZ(0)` 往Z移動(0) 預設值
- 背景圖層(`parallax__layer--base`)
    - `transform:` 
        - `translateZ(0)` 往Z移動(-1px) 「相對景深標準的設定值」
        - `scale(2)` 縮放修正


```htmlmixed=
<style media="screen">
  .parallax__container {
    perspective: 1px;
    height: 100vh;
    overflow-x: hidden;
    /*overflow-y: auto; /* Default */
  }

  .parallax__layer--base {
    transform: translateZ(0);
  }

  .parallax__layer--back {
    transform: translateZ(-1px) scale(2);
  }
</style>
```

## 縮放修正

```
scale = 1 + (translateZ * -1) / perspective
```

