Vue.component('Square', {
    // data: function () {
    //     return {
    //         Item: this.item
    //     }
    // },
    props: ['item'],

    computed: {
        style() {
            return `background-color:${this.item.Color}`
        },

        Id() {
            return this.item.Id;
        }

    },

    methods: {
        SquareClick(IdSquare) {
            app.SquareClick(IdSquare);
        },
    },

    template: `
        <div :id="Square" + this.Id class="Square" :style="style" @click="SquareClick(Id)"></div>
        `
});

var app = new Vue({
    el: '#app',

    data: {
        Victory: false,
        IdWinner: 0,
        ColorWinner: '',
        EasyMode: false
    },

    computed: {

        TextoRestart() {
            if (this.Victory) {
                return "Play Again!";
            } else {
                return "New Colors";
            }
        },

        SquareData() {
            let data = []
            if (!this.Victory) {
                this.IdWinner = Math.floor(Math.random() * 3);
                for (let i = 0; i < (this.EasyMode ? 3 : 6); i++) {
                    if (i === this.IdWinner) {
                        this.ColorWinner = this.createRandomStringColor();
                        data.push({
                            Id: i,
                            Color: this.ColorWinner
                        });
                    } else {
                        data.push({
                            Id: i,
                            Color: this.createRandomStringColor()
                        })
                    }
                }
            } else {
                for (let i = 0; i < (this.EasyMode ? 3 : 6); i++) {
                    data.push({
                        Id: i,
                        Color: this.ColorWinner
                    })
                }
            }
            return data;
        }
    },

    methods: {
        SquareClick(IdSquare) {
            if (IdSquare === this.IdWinner) {
                this.Victory = true;
                alert('Ganaste Puto');
            }
        },

        randomInt() {
            return Math.floor(Math.random() * 256);
        },

        createRandomStringColor() {
            var newColor = "rgb(" + this.randomInt() + "," + this.randomInt() + "," + this.randomInt() + ")";
            //	console.log(newColor);
            return newColor;
        },

        Restart() {
            this.Victory = false;
        }
    }
})