var canvas = $("#bricksCanvas")[0]

        var ctx = canvas.getContext("2d")
        var stop_status = true // 停止按键是否有效
        var stop;
        var canvas_status = true // 


        // 托盘
        var paddleHeight = 15
        var paddleWidth = 75;
        // 设置托盘居中 paddleX是两边的距离
        var paddleX = (canvas.width - paddleWidth) / 2

        // 控制按键左右
        var rightPressed = false
        var leftPressed = false

        // bricks 砖块

        var brickOffsetTop = 40
        var brickOffsetLeft = 10
        var brickPadding = 5

        var brickRowCount = 10
        var brickColumnCount = 40
        var brickWidth = ((canvas.width - brickOffsetLeft * 2) - brickPadding * brickColumnCount) / brickColumnCount

        var brickHeight =   brickWidth
        
        // 初始化 球
        var ballRadius = brickHeight / 2; // 直径
        var ballColor = "#000" // 颜色

        // 球所在的位置
        var x = canvas.width / 2;
        var y = canvas.height - 25; 


        // 小球移动速度
        var dx = -15
        var dy = -15

        var score = 0
        var lives = 3

        // 初始化二维数组 存储砖块信息
        // status：1 表示砖快存在 0 表示消失

        var bricks = []

        function init() {
            /**
             * 创建砖块模型 
            */
            for (var column = 0; column < brickColumnCount; column++) {
                bricks[column] = []
                for (var row = 0; row < brickRowCount; row++) {
                    bricks[column][row] = {
                        'x': 0, // 这个是用来存x轴坐标的
                        'y': 0, // 这个是用来存y轴坐标的
                        'status': 1
                    }
                }
            }
        }

        // 绘制

        // 画球
        function drawBall() {

            ctx.beginPath(); // 创建路径 开始集合
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // 创建一个圆形 在底部居中
            // ctx.arc(横坐标,纵坐标, 直径, 起始弧度, 结束弧度)
            // 这里的x 是窗口的中间 y 是窗口的下面

            ctx.fillStyle = ballColor;
            ctx.fill();
            ctx.closePath();

        }

        // 画托盘
        function drawPalle() {
            ctx.beginPath()
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
            // ctx.rect (矩形左上角横轴，左上角纵轴，宽度，高度)
            ctx.fillStyle = ballColor
            ctx.fill()
            ctx.closePath()
        }

        // 砖块
        function drawBricks() {
            for (var column = 0; column < brickColumnCount; column++) {
                for (var row = 0; row < brickRowCount; row++) {

                    if (bricks[column][row].status == 1) {
                        /**
                         * 如果砖块存在，获取到这个砖块的左上角坐标，
                         * 左上角x ： bricksX
                         * 左上角y ： bricksY
                         * 
                        */
                        var bricksX = (column * (brickPadding + brickWidth)) + brickOffsetLeft
                        var bricksY = (row * (brickHeight + brickPadding)) + brickOffsetTop

                        // 将左上角轴坐标分别存进x y
                        bricks[column][row].x = bricksX
                        bricks[column][row].y = bricksY

                        ctx.beginPath()
                        ctx.rect(bricksX, bricksY, brickWidth, brickHeight)
                        ctx.fillStyle = "#c90d2b"
                        ctx.fill()
                        ctx.closePath()
                    }
                }
            }
        }

        // 积分
        function drawScore() {
            ctx.font = "18px Arial"
            ctx.fillStyle = "#000"

            ctx.fillText("Score:" + score, 15, 20)
        }
        // 生命
        function drawLives() {
            ctx.font = "18px Arial"
            ctx.fillStyle = "#000"

            ctx.fillText("Lives:" + lives, canvas.width - 70, 20)
        }

        // 结束
        function drawOver() {
            ctx.font = "35px Arial"
            ctx.fillStyle = "#000"
            ctx.fillText("GAME　OVER!", 80, 300)
        }

        // 砖块消失 小球碰撞到砖块的条件
        function checked() {
            /**
             * brickColumnCount 列数
             * brickRowCount 行数
            */
            for (var column = 0; column < brickColumnCount; column++) {
                for (var row = 0; row < brickRowCount; row++) {
                    var b = bricks[column][row];
                    if (b.status == 1) {
                        // 说明可碰撞 判断是否符合碰撞条件

                        /**
                         * x > b.x ==== 小球的x轴位置比目标的x轴位置大 == 小球在砖块右边 没碰到左上角
                         * x < b.x + brickWidth ==== 小球的x轴位置比目标的x轴位置小 == 小球左上角在砖块右上角的左边 没碰到右上角
                         * y > b.y ==== 小球的y轴位置比目标的y轴位置大 == 小球在砖块上边 小球上边 没碰到左上角
                         * y < b.y + brickHeight ==== 小球的y轴位置比目标的x轴位置小 == 小球左上角在砖块左上角的下边 没碰到左上角
                         * 
                         * 如果同时符合 
                         * 小球左上角在砖块左上角右边
                         * 小球左上角在砖块右上角的左边
                         * 小球左上角在砖块右上角的左边
                         * 小球左上角在砖块右上角的左边
                        */
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            // 改变方向
                            dy = -dy
                            dx = -dx

                            bricks[column][row].status = 0;
                            score++

                            // 如果分数计算完毕 则重新开始
                            if (score == brickColumnCount * brickRowCount) {
                                document.location.reload()
                                x = canvas.width / 2
                                y = canvas.height - 30
                                dy = -3
                                dx = -3
                                paddleX = (canvas.width - paddleWidth) / 2
                            }
                        }
                    }
                }
            }
        }

        // 重绘
        function draw() {
            // 首先清除上一次的canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            drawBall()      // 球
            drawPalle()     // 托盘 
            drawBricks()    // 砖块
            drawScore()     // 分数
            drawLives()     // 生命值
            checked()       // 检测碰撞

             

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { 
                // 如果球的x轴坐标+方向偏移 跑出了右边 
                // 或者球的跑到了左边
                // 就反转方向
                dx = -dx 
            }
            if (y + dy < ballRadius) {
                // 这个地方稍不注意就会坑死人。。。
                // 原因是y从上往下是递增的，当 y + dy < ballRadius 时 说明到顶了
                // 如果碰到顶了
                dy = -dy
            } else if (y + dy > canvas.height - (ballRadius + paddleHeight)) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    // x > paddleX && x < paddleX + paddleWidth 托盘的区间
                    // 撞到托盘 
                    dy = -dy
                } else {
                    // 如果撞不到方块也撞不到托盘
                    lives--
                    if (lives == 0) {
                        drawOver()
                        $(".start").attr("flag", "flag")
                        lives = 4
                        score = 0
                        stop_status = false
                        return
                    } else {
                        x = canvas.width / 2
                        y = canvas.height - 30
                        dx = -5
                        dy = -5
                        paddleX = (canvas.width - paddleWidth) / 2
                    }
                }

            }
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 5
            }
            else if (leftPressed && paddleX > 0) {
                paddleX -= 5
            }
            x += dx
            y += dy
            stop = requestAnimationFrame(draw)
        }
        function mousemovePaddle(e){
            var relativeX = e.clientX - canvas.offsetLeft
            if(relativeX > 0 && relativeX < canvas.width){
                paddleX = relativeX - paddleWidth/2
            }
        }
        function keyDownhandler(e){
            if(e.keyCode == 39){
                rightPressed = true
            }
            if(e.keyCode == 37){
                leftPressed = true
            }else if(e.keyCode == 32){ 
                if(stop_status){
                    window.cancelAnimationFrame(stop)
                    canvas_status = false 
                    stop_status = false
                }else{
                    window.requestAnimationFrame(draw)
                    canvas_status = true
                    stop_status = true
                }
            }

        }
        function keyUphandler (e){
            if(e.keyCode == 39){
                rightPressed = false
            }
            if(e.keyCode == 37){
                leftPressed = false
            }
        }
        $(function () {
            init()
            drawBall()
            drawPalle()
            drawBricks()
            drawScore()
            drawLives()
            $(".start").click(function () {
                stop_status = true
                if ($(".start").attr("flag") === "flag") {
                    for (var column = 0; column < brickColumnCount; column++) {
                        for (var row = 0; row < brickRowCount; row++) {
                            bricks[column][row].status = 1;
                        }
                    }
                    $(".start").attr("flag", "");
                    draw()
                    document.addEventListener("mousemove", mousemovePaddle, false)
                    document.addEventListener("keydown", keyDownhandler, false)
                    document.addEventListener("keyup", keyUphandler, false)
                }
            })
        })

