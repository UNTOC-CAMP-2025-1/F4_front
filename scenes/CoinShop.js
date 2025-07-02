export default class CoinShop extends Phaser.Scene {
    constructor() {
        super('CoinShop');
    }

    preload() {
        this.load.image('shop_bg', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('coin2', 'assets/coin2.png');
        this.load.image('shop_coin', 'assets/coin2.png');
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // 배경
        this.add.image(0, 0, 'shop_bg').setOrigin(0).setDisplaySize(width, height);

        //타이틀 부분
        this.add.dom(centerX + 300, 100).createFromHTML(`
        <style>
        .coin-title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 60px;
            transform: translateX(-50%);
            animation: floatUpDown 2.5s ease-in-out infinite;
        }

        .coin-title-text {
            font-size: 70px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: white;
        }

        @keyframes floatUpDown {
            0%, 100% {
            transform: translateX(-50%) translateY(0px);
            }
            50% {
            transform: translateX(-50%) translateY(-10px);
            }
        }
        </style>

        <div class="coin-title-container">
        <div class="coin-title-text">TINIWORM SHOP</div>
        </div>
        `);

        //코인 금액 보이는 칸
        this.add.dom(centerX+550, 190).createFromHTML(`
            <style>
                .coin-box {
                    width: 250px;
                    height: 60px;
                    background-color: rgba(216, 176, 247, 0.6);
                    border-radius: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    font-family: Arial, sans-serif;
                    color: white;
                    transform: translateX(-50%);
                }
            </style>
            <div class="coin-box">MY COIN: 0000</div>
        `);

        // item 정보 배열
        const itemList = [
            { amount: 9999999, img: 'items/rosejun.png' },
            { amount: 1000, img: 'items/skin1.png' },
            { amount: 1500, img: 'items/skin2.png' },
            { amount: 2000, img: 'items/skin3.png' },
            { amount: 2500, img: 'items/skin4.png' },
            { amount: 3000, img: 'items/skin5.png' },
            // 원하는 만큼 추가 가능
        ];

        const itemHTML = itemList.map(item => `
            <button class="shop-button" data-amount="${item.amount}">
                <img src="${item.img}" />
                <div class="label">${item.amount} COIN</div>
            </button>
        `).join('');

        //item 보이는 부분
        this.add.dom(centerX+550, 450).createFromHTML(`
        <style>
            .scroll-wrapper {
            width: 1100px;
            height: 400px;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            padding-bottom: 20px;
            transform: translateX(-50%);
            }

            .scroll-wrapper::-webkit-scrollbar {
            height: 14px;
            }

            .scroll-wrapper::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.96);
            border-radius: 4px;
            }

            .item-row {
            display: flex;
            gap: 30px;
            padding: 10px;
            }

            .shop-button {
            min-width: 250px;
            height: 350px;
            background-color: rgba(216, 176, 247, 0.6);
            box-shadow: 0 0 11px rgba(0,0,0,0.2);
            border-radius: 30px;
            border: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: white;
            cursor: pointer;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            flex-shrink: 0;
            }

            .shop-button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
            }

            .shop-button img {
            width: 180px;
            height: 200px;
            margin-bottom: 15px;
            }

            .shop-button .label {
            font-size: 28px;
            font-weight: bold;
            }
        </style>

        <div class="scroll-wrapper">
            <div class="item-row">
            ${itemHTML}
            </div>
        </div>
        `);

        this.time.delayedCall(0, () => {
            document.querySelectorAll('.shop-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const amount = btn.dataset.amount;
                    console.log(`${amount} COIN 상품 클릭됨`);
                });
            });
        });



        // 뒤로가기 버튼
        this.add.image(60, height - 60, 'arrow')
            .setOrigin(0.5)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('MyInfo');
            });
    }
}
