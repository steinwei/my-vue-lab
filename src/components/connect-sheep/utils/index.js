export class CardItem {
    static colorType = {
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
        14: { background: "#CCDDFF" },
    };
    
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
    
    constructor({x, y, z, key}) { 
        this.x = x
        this.y = y
        this.z = z
        this.key = key
        this.offset = 0
        this.style = {
            left: this.x + this.offset,
            top: this.y + this.offset,
            backgroundImage: "",
            visiable: false
        }
    }

    setValue(val) {
        this.val = val;
        Object.assign(this.style, CardItem.contentType[val])
    }

}

export class Playground {
    constructor(options) { 
        this.options = {
            ...options
        }
        this.coverMaps = {}
        this.pendingList = []
        this.fulfilledList = []
        this.CardItemList = []
        this.cardMap = []
    }

    getMap({ x, y, z, cardRandom = 0 }) {
        let canSetCard = false
        const cardMap = this.cardMap
        let key = 0
        
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                for (let k = 0; k < z; k++) {
                    if (j > 0 && cardMap[k][i][j - 1]) {
                        // 左边不能有牌
                        canSetCard = false;
                    } else if (i > 0 && cardMap[k][i - 1][j]) {
                        // 上边不能有牌
                        canSetCard = false;
                    } else if (i > 0 && j > 0 && cardMap[k][i - 1][j - 1]) {
                        // 左上不能有牌
                        canSetCard = false;
                    } else if (i > 0 && cardMap[k][i - 1][j + 1]) {
                        // 右上不能有牌
                        canSetCard = false;
                    } else if (k > 0 && cardMap[k - 1][i][j]) {
                        // 正底不能有牌
                        canSetCard = false;
                    } else if (Math.random() >= cardRandom) {
                        canSetCard = false;
                    }
                    if (canSetCard) {
                        const cardItem = new CardItem({ x, y, z, key: key++ })
                        this.cardMap[x][y][z] = cardItem
                        this.CardItemList.push(cardItem)
                    }
                }
            }
        }
    }

    setCardValue() {
        const maxCardType = this.maxCardType || 14
        const valueMap = this.valueMap 
        this.CardItemList.forEach((item) => {
            const value = Math.ceil(Math.random() * maxCardType)
            if (valueMap[value]) {
                item.setValue(item.val)
                
            } else {

            }
        })
    }

    init() { 
        
    }

    removeThree() { 

    }

    moveToLeft(item) {
        setTimeout(() => {
            item.style.left = ""
        })
    }


    moveToBottom(item) {
        setTimeout(() => {
            item.style.left = ""
            item.style.top = ""
        }, 0)
    }

    check(item) {
        this.addToStack(item)
        if (this.pendingList[item.val] == 3) {
            this.moveLeft(item)
        }
    }


    clickCard(item) {
        if (this.check(item)) {
            this.moveToBottom(item)
        }
    }

    addToStack(item) { 
        this.pendingList.push(item)
    }

    calcCover(item) { 
        const x = item.x, y = item.y
        if (this.coverMap[x][y]) {
            item.cover = true
        }
    }
}