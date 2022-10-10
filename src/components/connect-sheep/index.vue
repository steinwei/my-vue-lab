<template>
    <div>{{msg}}</div>
    <div class="wrapper" :style="CardWrapStyle">
        <div class="container" v-if="options.scene == 1" :style="CardWrapStyle">
            <div class="card-item" :key="item.key" v-for="item in CardList" :class="{'item-cover': item.cover}" 
            @click="handleCardClick(item)" :style="item.style" v-show="CardList.length > 0">
                {{item?.content}}
            </div>
            <div class="card-item" :key="item.key" v-for="item in PendingList" :style="item.style" v-show="PendingList.length > 0">
                {{item?.content}}
            </div>
            <div class="card-item clear-item" :key="item.key" v-for="item in ClearList" :style="item.style" v-show="ClearList.length > 0" >
                {{item?.content}}
            </div>
            <div class="tips">
                <span>
                    {{PendingList.length}} / {{options.max}}
                </span>
            </div>
            <div class="tools">
                <button @click="item.method" :key="item.key" v-for="item in tools">
                    {{item.name}}
                </button>
            </div>
        </div>
        <div class="container" v-if="options.scene == 0">
            <div class="options">
                <span>maxType:</span>
                <input type="range" min="1" max="14" value="options.maxType" />
            </div>
            <div class="options">
                <span>x:</span>
                <input type="range" min="1" max="10" value="options.x" />
            </div>
            <div class="options">
                <span>y:</span>
                <input type="range" min="1" max="10" value="options.y" />
            </div>
            <div class="options">
                <span>maxWidth:</span>
                <input type="range" min="1" max="10" value="options.maxWidth" />
            </div>
            <div class="options">
                <span>maxHeight:</span>
                <input type="range" min="1" max="10" value="options.maxHeight" />
            </div>
            <button @click="start">start game</button>
        </div>
        <div>
            <p v-if="options.scene == 2">Win.</p>
            <p v-if="options.scene == 3">Lost.</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "SheepGame"
}
</script>

<script setup>
import { ref, reactive } from "vue"

class CardItem {
  static bgColor = {
    1: { background: "#FFB7DD" },
    2: { background: "#FFCCCC" },
    3: { background: "#FFC8B4" },
    4: { background: "#FFDDAA" },
    5: { background: "#FFEE99" },
    6: { background: "#FFFFBB" },
    7: { background: "#EEFFBB" },
    8: { background: "#CCFF99" },
    9: { background: "#99FF99" },
    10: { background: "#BBFFEE" },
    11: { background: "#AAFFEE" },
    12: { background: "#99FFFF" },
    13: { background: "#CCEEFF" },
    maxType: { background: "#CCDDFF" },
  }

  static contentType = {
    1: "🥕",
    2: "✂️",
    3: "🥦",
    4: "🥛",
    5: "🌊",
    6: "🧤",
    7: "🧵",
    8: "🌱",
    9: "🔨",
    10: "🌽",
    11: "🌾",
    12: "🐑",
    13: "🪵",
    14: "🔥",
  };

  static defaultProper = {
    width: 45,
    height: 45,
  }

  constructor({x, y, z, key}) {
    this.offsetLeft = 0
    this.key = key
    this.x = x
    this.y = y
    this.z = z
    this.value = 0
    this.cover = false
    this.content = ""
    this.style = {
        width: CardItem.defaultProper.width + 'px',
        height: CardItem.defaultProper.height + 'px',
        left: x*CardItem.defaultProper.width + 'px',
        top: y*CardItem.defaultProper.height + 'px',
    }
  }

  setValue(value){
    this.value = value
    this.content = CardItem.contentType[value]
    this.style = {
      ...this.style,
    //   ...CardItem.bgColor[value],
    }
  }
}

class Tool {
    constructor() {}
    removeThree() {
        let target = 0
        PendingList.forEach((item, index, arr) => { 
            if (ValMap[item.value] == 3) {
                arr.forEach((ele, idx) => {
                    if (ele.value == item.value) {
                        setTimeout(() => {
                            ele.style.left = item.offsetLeft - 60 + 'px'
                            ele.style.top = "120%"
                            ClearList.push(ele)
                        }, 300);
                    }
                })
                target = item.value
            }
        })
        
        for (let i = PendingList.length - 1; i > -1; i--) {
            if (PendingList[i].value == target) {
                PendingList.splice(i, 1)
            }
        }

        removeThree()
    }

    restart = restart

    revertCover() {
        // TODO: decorator functions
    }
}

const options = reactive({
    z: 2,
    max: 7,
    maxType: 14,
    maxHeight: 5,
    maxWidth: 5,
    scene: 0, // 0 prepare, 1 start, 2 win, 3 lost
})

const toolsInstance = new Tool()
const tools = [
    {
        name: 'removeThree',
        method: toolsInstance.removeThree,
    },
    {
        name: 'revertCover',
        method: toolsInstance.revertCover,
    },
    {
        name: 'restart',
        method: toolsInstance.restart,
    }
]

const CardWrapStyle = {
    width: options.maxWidth * CardItem.defaultProper.width * 1.5 + 'px',
    height: options.maxHeight * CardItem.defaultProper.height * 1.5 + 'px',
}

let CardList = reactive(ref([])).value
let CardItemMap = reactive(ref([])).value
let PendingList = reactive(ref([])).value
let ClearList = reactive(ref([])).value
let ValMap = reactive(ref({})).value

function init() {
    createMap()
    setCardValue()
    calculateCover()
    setTimeout(()=> {
        options.scene = 1
    })
}

function createMap() {
    const {z} = options
    let key = 0;
    // 地图初始化
    for (let k = 0; k < z; k++) {
        CardItemMap[k] = new Array(options.maxHeight);
        for (let i = 0; i <= options.maxHeight; i++) {
            CardItemMap[k][i] = new Array(options.maxWidth).fill(0);
        }
    }

    for (let k = 0; k < z; k++) {
        const shrink = Math.floor((z - k) / 3);
        // 行
        for (let i = shrink; i < options.maxHeight - shrink; i++) {
            // 列，对称设置
            const mid = Math.ceil((options.maxWidth - shrink) / 2);
            for (let j = shrink; j <= mid; j++) {
                let canSetCard = true;
                if (j > 0 && CardItemMap[k][i][j - 1]) {
                    // 左边不能有牌
                    canSetCard = false;
                } else if (i > 0 && CardItemMap[k][i - 1][j]) {
                    // 上边不能有牌
                    canSetCard = false;
                } else if (i > 0 && j > 0 && CardItemMap[k][i - 1][j - 1]) {
                    // 左上不能有牌
                    canSetCard = false;
                } else if (i > 0 && CardItemMap[k][i - 1][j + 1]) {
                    // 右上不能有牌
                    canSetCard = false;
                } else if (k > 0 && CardItemMap[k - 1][i][j]) {
                    // 正底不能有牌
                    canSetCard = false;
                } else if (Math.random() >= 0.5) {
                    canSetCard = false;
                }
                if (canSetCard) {
                    key++;
                    const cardItem = new CardItem({ x: j, y: i, z: k, key });
                    CardItemMap[k][i][j] = cardItem;
                    CardList.push(cardItem);
                    // 对称放置
                    if (j < mid) {
                        key++;
                        const cardItem = new CardItem({
                            x: options.maxWidth - j,
                            y: i,
                            z: k,
                            key,
                        });
                        CardItemMap[k][i][j] = cardItem;
                        CardList.push(cardItem);
                    }
                }
            }
        }
    }
    CardList.reverse();
    for (let i = 1; i <= key % 3; i++) {
        const clearItem = CardList.pop();
        CardItemMap[clearItem.z][clearItem.y][clearItem.x] = 0;
    }
    CardList.reverse();
}

function setCardValue() {
    // 卡片种类
    const valStack = new Array(options.maxType);
    // 给卡片设置值
    CardList.forEach((item) => {
        const value = Math.ceil(Math.random() * options.maxType);
        if (valStack[value]) {
            valStack[value].push(item);
            if (valStack[value].length === 3) {
                valStack[value].forEach((item) => {
                    item.setValue(value);
                });
                valStack[value] = null;
            }
        } else {
            valStack[value] = [item];
        }
    });

    let count = 2;
    valStack.forEach((list) => {
        list &&
        list.forEach((item) => {
            count++;
            item.setValue(Math.floor(count / 3));
        });
    });
}

function handleCardClick(item) {

    removeThree()
    PendingList.push(item)

    if (ValMap[item.value]) {
        ValMap[item.value]++
    } else {
        ValMap[item.value] = 1
    }
    
    const index = CardList.indexOf(item)
    CardList.splice(index, 1)

    calculateCover()
    
    delay(() => {
        removeThree()
    });   
}

function removeThree() {
    const n = PendingList.length
    if (n >= 3) {
        const last = PendingList[n - 1], curr = PendingList[n - 2], prev = PendingList[n - 3]
        if (last.value == curr.value && curr.value == prev.value) {
            for (let i = 0; i < 3; i++) {
                PendingList.pop()
            }
            ClearList.push(last, curr, prev)
            ClearList.forEach(item => {
                delay(() => {
                    item.style.left = item.offsetLeft - 60 + 'px'
                    item.style.top = "120%"
                });
            })
        }
    }

    // render
    PendingList.forEach((item, index) => {
        delay(() => {
            item.style.left = item.offsetLeft + index * CardItem.defaultProper.width + 'px'
            item.style.top = "120%"
        });
    })

    // game lost
    if (PendingList.length >= options.max) {
        delay(() => {
            options.scene = 3
        })
    }
    // game win
    if (CardList.length == 0) {
        delay(() => {
            options.scene = 2
        })
    }
}

function delay(fn, timeout = 300) {
    try {
        setTimeout(() => {
            fn && typeof fn == 'function' && fn()
        }, timeout);
    } catch (err) {
        console.error(err)
    }
}

function calculateCover() {
    const CoverMap = Array.from({ length: 10 }, () => Array.from({ length: 10 }), () => false)
    
    for(let i=CardList.length-1; i>-1; i--) {
        const item = CardList[i]
        const {x, y} = item
        if(CoverMap[x][y]) {
            item.cover = true
        }else if(CoverMap[x+1][y]) {
            item.cover = true
        }else if(CoverMap[x][y+1]) {
            item.cover = true
        }else if(CoverMap[x+1][y+1]) {
            item.cover = true
        }else {
            item.cover = false
        }
        CoverMap[x][y]= true
        CoverMap[x+1][y]= true
        CoverMap[x][y+1]= true
        CoverMap[x+1][y+1]= true
    }
}

function start() {
    init()
}

function restart() {
    reset()
    init()
}

function reset() {
    while (CardList.length) {
        CardList.pop()
    }
    while (PendingList.length) {
        PendingList.pop()
    }
    while (ClearList.length) {
        ClearList.pop()
    }
    // removeThree()
    ValMap = Object.create({})
}

const msg = ref("Hello Nvim! Here is SheepGame.Vue")

</script>

<style scoped>
.wrapper {
  text-align: center;
  margin: auto;
}

.container {
  margin: 10% auto;
  position: relative;
}

.container > button {
    margin: 10%;
}

.card-item {
  position: absolute;
  text-align: center;
  opacity: 1;
  transition: 0.3s;
  cursor: pointer;
}

.card-item:hover {
  transform: scale3d(1.1, 1.1, 1.1);
}

.card-item::after {
  content: "";
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}

.item-cover {
  pointer-events: none;
  cursor: none;
  opacity: 0.3;
}

.tools {
    position: absolute;
    top: 110%;
    text-align: center;
    display: flex;
}

.options {
    display: grid;
    grid: auto-flow / 1fr 1fr;
}

.tips {
    position: absolute;
    top: 125%;
    left: 90%;
    text-align: left;
}
</style>
