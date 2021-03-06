这个游戏只考虑移动端，pc端要玩的话可以按F12打开控制台，然后将界面调到500px宽度左右。

pc端通过左右箭头移动蝴蝶方向
移动端通过左右翻动手机移动蝴蝶方向

每局只有四条命。开始阶段随机发生意外的无形碰撞，所有小心心用完即为游戏结束。

#
项目描述：原生js网页小游戏，通过NasaJS在星云链上进行游戏数据的存储和读取

技术栈：gulp3 + ES6 + CSS3+ H5 + Less + NasaJs

主要收获：
1. 掌握了利用gulp3对项目进行打包压缩的方法，并了解到gulp4和gulp3的区别。
2. 为了解决H5返回键退出页面问题，利用history实现了单页面应用路由的模拟，优化了交互体验。
3. 利用ES6对项目进行模块化开发，根据不同的功能需求封装成不同的类，增强了代码的可复用性与可维护性。
4. 掌握了星云链合约部署的流程，掌握了通过NasaJs对星云链进行数据的存取操作。

# 在PC可以直接F12拉小一下屏幕，按左右方向键移动目标

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/images/demoIndex.JPG)

# 唤起星云钱包

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/images/brock.JPG)

# 移动端界面

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/images/mbrock.JPG)



【2019-03-16】
做了好多天咸鱼，最近几天没更新是因为玩dota2和楚留香去了~今天回来补坑♪(^∇^*)


【2019-03-07】突然有个大胆的想法。

写一个游戏，这个游戏的模式比较简单，通过不断闪避飞来的障碍物在规定时间内抵达终点则为通关。

游戏规则为：

1、得分与闪避、飞行时间成正比。当你在某个地方失败的时候，可以看到比你高分一个排名和低分一个排名的玩家，和一个全世界排名前10名的玩家列表。此时你可以对这两个玩家进行“助力”，助力方式是给这两个玩家支付少量币，通过对玩家的助力，自己也获得一份助力buff起死回生。当然也可以向全世界排名前十的玩家支付双倍的币获取福缘buff加成。

2、助力buff加成的方式为复活并无敌12秒。

3、福缘buff加成的方式为复活并加速无敌12秒

4、游戏只允许碰撞发生三次，每次发生碰撞都会对自身进行减速。超过三次则游戏失败。

5、当游戏失败时，可以选择将排名上链，让全世界的人都看见你的得分，给别人提供帮助。





这个游戏吸引人的地方在于：

1. 对新玩家友好。新玩家可以直观的看到两种排名。只要游戏有人玩，就有概率得到别人的助力打赏。
2. 对排名极高的玩家十分有利。排名越高，意味着得到求助福缘的概率越高，整个游戏玩家基数越大，高分玩家得到的福利越多。
3. 由于游戏机制的奖励和排名直接挂钩，所以玩家为了获取更多的币收益，只好不断的进行冲榜。形成了一个良性的循环。
4. 助力和求福缘直接支付到对方账户，不通过任何中间手段收取，真正实现了游戏的公平性。
5. 当然也可以选择向开发者支付巨额的赞助费购买全世界排名第一的位置。

UI方面我想用中国画水墨风格。原因是自己有国画功底，想尝试一下自己画国画UI，将中国文化推向世界。



这个想法，想想就十分激动。好了，马上开工。

花了三个小时找素材整理素材和画UI，画好了大概是下面这个样子：

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/UI/game1.png)

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/UI/game2.png)

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/UI/game3.png)

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/UI/game4.png)

![](https://github.com/KamyoChae/Dream-Butterfly/blob/master/src/UI/game5.png)

