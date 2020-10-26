Vue.component('Square', {
    // data: function () {
    //     return {
    //         Item: this.item
    //     }
    // },
    props: ['item'],

    data() {
        return {
            
        }
    },

    computed: {
        style() {
            return `
            background-color:${this.item.Color};`
        },

        Id() {
            return "Square" + this.item.Id;
        },

        class(){
            let clicked = this.item.clicked;
            let Victory = this.item.Victory
            return {hidden: (clicked && !Victory)}
        }

    },

    methods: {
        SquareClick(IdSquare) {
            app.SquareClick(IdSquare);
        },
    },

    template: `
        <div :id="this.Id" class="Square" :class="this.class" :style="style" @click="SquareClick(item.Id)"></div>
        `
});

var app = new Vue({
    el: '#app',

    data: {
        Victory: false,
        IdWinner: 0,
        ColorWinner: '',
        EasyMode: false,
        SquaresData:[],
        message:''
    },

    mounted() {
        this.initSquares();
    },

    computed: {

        TextoRestart() {
            if (this.Victory) {
                return "Play Again!";
            } else {
                return "New Colors";
            }
        },

        getSquareData() {
            return this.SquaresData;
        },

        // SquareData() {
        //     this.SquaresData = []
        //     if (!this.Victory) {
        //         this.IdWinner = Math.floor(Math.random() * 3);
        //         for (let i = 0; i < (this.EasyMode ? 3 : 6); i++) {
        //             if (i === this.IdWinner) {
        //                 this.ColorWinner = this.createRandomStringColor();
        //                 this.SquaresData.push({
        //                     Id: i,
        //                     Color: this.ColorWinner,
        //                     Victory:false,
        //                     clicked:false
        //                 });
        //             } else {
        //                 this.SquaresData.push({
        //                     Id: i,
        //                     Color: this.createRandomStringColor(),
        //                     Victory:false,
        //                     clicked:false
        //                 })
        //             }
        //         }
        //     } else {
        //         for (let i = 0; i < (this.EasyMode ? 3 : 6); i++) {
        //             this.SquaresData.push({
        //                 Id: i,
        //                 Color: this.ColorWinner,
        //                 Victory:true,
        //                 clicked:false
        //             })
        //         }
        //     }
        //     return this.SquaresData;
        // }
    },

    methods: {
        initSquares(){
            this.message = '';
            this.SquaresData = []
            this.IdWinner = Math.floor(Math.random() * (this.EasyMode ? 3 : 6));
                for (let i = 0; i < (this.EasyMode ? 3 : 6); i++) {
                    if (i === this.IdWinner) {
                        this.ColorWinner = this.createRandomStringColor();
                        this.SquaresData.push({
                            Id: i,
                            Color: this.ColorWinner,
                            Victory:false,
                            clicked:false
                        });
                    } else {
                        this.SquaresData.push({
                            Id: i,
                            Color: this.createRandomStringColor(),
                            Victory:false,
                            clicked:false
                        })
                    }
                }
        },

        SquareClick(IdSquare) {
            if (!this.Victory) {
                if (IdSquare === this.IdWinner) {
                    this.Victory = true;
                    this.message = 'You won!'
                    for (const Square of this.SquaresData) {
                        Square.Victory = true;
                        Square.clicked = false;
                        Square.Color=this.ColorWinner;
                    }
                } else{
                    this.message = 'Try Again!'
                    this.SquaresData[IdSquare].clicked = true;
                }
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
            this.initSquares();
        },

        Easy() {
            this.EasyMode = true;
        },

        Difficult() {
            this.EasyMode = false;
        }
    }
})