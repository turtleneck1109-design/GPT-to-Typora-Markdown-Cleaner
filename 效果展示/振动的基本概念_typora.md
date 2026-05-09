下面按《机械振动.pdf》的主线，把知识点系统梳理成复习版。课件主要围绕：简谐振动、简谐振动的合成、保守系统的振动、阻尼振动、受迫振动展开。

## 1. 振动的基本概念

### 1.1 什么是振动

振动：物体在某一平衡位置附近作往复运动。

机械振动：物体在一定位置附近来回往复的运动。

典型例子：

弹簧振子

单摆

物体在水中上下浮动

电路中电压、电流的周期性变化也可以类比为振动

产生振动的两个必要条件：

有恢复力

物体具有惯性

恢复力负责把物体拉回平衡位置，惯性使物体越过平衡位置继续运动，所以才会形成往复振动。课件中也强调复杂振动可以看成若干个基本简谐振动的合成。

## 2. 简谐振动的运动学

### 2.1 简谐振动的定义

简谐振动可以理解为：

匀速圆周运动在某一条直径方向上的投影运动。

它的标准运动方程是：

$$x=A\cos(\omega t+\varphi)$$

其中：

$x$：位移

$A$：振幅，即最大位移

$\omega$：角频率

$t$：时间

$\varphi$：初相位

$\omega t+\varphi$：相位

### 2.2 位移、速度、加速度

由

$$x=A\cos(\omega t+\varphi)$$

对时间求导得到速度：

$$v=\frac{dx}{dt}=-A\omega\sin(\omega t+\varphi)$$

也可以写成：

$$v=A\omega\cos(\omega t+\varphi+\frac{\pi}{2})$$

再对时间求导得到加速度：

$$a=\frac{d^2x}{dt^2}=-A\omega^2\cos(\omega t+\varphi)$$

因为 $x=A\cos(\omega t+\varphi)$，所以：

$$a=-\omega^2x$$

这就是简谐振动最重要的运动学特征：

加速度与位移大小成正比，方向相反。

### 2.3 周期、频率、角频率

周期 $T$：完成一次全振动所需时间。

频率 $\nu$：单位时间内完成全振动的次数。

角频率 $\omega$：描述相位随时间变化快慢的量。

三者关系：

$$T=\frac{2\pi}{\omega}$$

$$\nu=\frac{1}{T}$$

$$\omega=2\pi\nu$$

所以：

$$T=\frac{1}{\nu}$$

单位要记住：

周期 $T$：秒，s

频率 $\nu$：赫兹，Hz

角频率 $\omega$：弧度每秒，rad/s

课件中把 $T$、$\nu$、$\omega$ 称为谐振子的固有周期、固有频率和固有角频率。

## 3. 相位、初相位、相位差

### 3.1 相位

简谐振动：

$$x=A\cos(\omega t+\varphi)$$

其中：

$\omega t+\varphi$：时刻 $t$ 的相位

$\varphi$：$t=0$ 时的相位，也叫初相位

相位决定物体在振动过程中的“状态”，也就是物体此时在什么位置、往哪个方向运动。

### 3.2 初始条件求振幅和初相位

如果已知：

$t=0$ 时

$$x=x_0$$

$$v=v_0$$

则：

$$x_0=A\cos\varphi$$

$$v_0=-A\omega\sin\varphi$$

所以：

$$A=\sqrt{x_0^2+\left(\frac{v_0}{\omega}\right)^2}$$

$$\tan\varphi=-\frac{v_0}{\omega x_0}$$

注意：用 $\tan\varphi$ 求初相位时，一定要结合 $x_0$ 和 $v_0$ 判断象限，不能只看反正切结果。

### 3.3 相位差

两个简谐振动：

$$x_1=A_1\cos(\omega_1t+\varphi_1)$$

$$x_2=A_2\cos(\omega_2t+\varphi_2)$$

相位差：

$$\Delta\varphi=(\omega_2t+\varphi_2)-(\omega_1t+\varphi_1)$$

如果两者频率相同，即 $\omega_1=\omega_2$，则：

$$\Delta\varphi=\varphi_2-\varphi_1$$

特殊情况：

$\Delta\varphi=0$：同相，两振动步调一致

$\Delta\varphi=\pm\pi$：反相，两振动步调相反

$\Delta\varphi>0$：$x_2$ 比 $x_1$ 超前，即 $x_2$ 更早达到正最大

## 4. 简谐振动的动力学特征

### 4.1 动力学方程

简谐振动的动力学本质是：

物体受到线性恢复力。

线性恢复力：

$$F=-kx$$

由牛顿第二定律：

$$m\ddot{x}=-kx$$

整理得：

$$\ddot{x}+\frac{k}{m}x=0$$

令：

$$\omega_0^2=\frac{k}{m}$$

则：

$$\ddot{x}+\omega_0^2x=0$$

这就是简谐振动的标准动力学方程。

凡是能化成：

$$\ddot{x}+\omega^2x=0$$

或

$$\ddot{\theta}+\omega^2\theta=0$$

的运动，都是简谐振动。

### 4.2 水平弹簧振子

受力：

$$F=-kx$$

动力学方程：

$$m\ddot{x}=-kx$$

$$\ddot{x}+\frac{k}{m}x=0$$

角频率：

$$\omega=\sqrt{\frac{k}{m}}$$

周期：

$$T=2\pi\sqrt{\frac{m}{k}}$$

### 4.3 竖直弹簧振子

竖直弹簧振子虽然有重力，但如果以新的平衡位置为原点，重力只改变平衡位置，不改变振动周期。

所以仍然有：

$$\omega=\sqrt{\frac{k}{m}}$$

$$T=2\pi\sqrt{\frac{m}{k}}$$

### 4.4 单摆的小角度振动

当摆角很小时：

$$\sin\theta\approx\theta$$

单摆方程：

$$\ddot{\theta}+\frac{g}{l}\theta=0$$

所以单摆的小角度摆动是简谐振动。

角频率：

$$\omega=\sqrt{\frac{g}{l}}$$

周期：

$$T=2\pi\sqrt{\frac{l}{g}}$$

注意：单摆周期与质量无关，只与摆长和重力加速度有关。

### 4.5 复摆，也叫物理摆

对于绕固定点摆动的刚体，如果质心到悬点距离为 $l_c$，刚体对悬点转动惯量为 $I$，小角度下：

恢复力矩：

$$M=-mgl_c\theta$$

转动方程：

$$I\ddot{\theta}=-mgl_c\theta$$

所以：

$$\ddot{\theta}+\frac{mgl_c}{I}\theta=0$$

角频率：

$$\omega=\sqrt{\frac{mgl_c}{I}}$$

周期：

$$T=2\pi\sqrt{\frac{I}{mgl_c}}$$

## 5. 简谐振动的能量

以弹簧振子为例。

位移：

$$x=A\cos(\omega t+\varphi)$$

速度：

$$v=-A\omega\sin(\omega t+\varphi)$$

动能：

$$E_k=\frac{1}{2}mv^2$$

因为 $k=m\omega^2$，所以：

$$E_k=\frac{1}{2}kA^2\sin^2(\omega t+\varphi)$$

势能：

$$E_p=\frac{1}{2}kx^2$$

所以：

$$E_p=\frac{1}{2}kA^2\cos^2(\omega t+\varphi)$$

机械能：

$$E=E_k+E_p$$

$$E=\frac{1}{2}kA^2$$

也可以写成：

$$E=\frac{1}{2}m\omega^2A^2$$

结论：

简谐振动中，动能和势能周期性转化。

平衡位置处，速度最大，动能最大，势能最小。

最大位移处，速度为 0，动能最小，势能最大。

无阻尼简谐振动中，机械能守恒。

## 6. 简谐振动的表示方法

### 6.1 解析法

直接用公式表示：

$$x=A\cos(\omega t+\varphi)$$

适合已知 $A$、$\omega$、$\varphi$ 或根据初始条件求表达式。

### 6.2 曲线法

根据 $x-t$ 图像读出：

振幅 $A$

周期 $T$

角频率 $\omega=\frac{2\pi}{T}$

初相位 $\varphi$

判断初相位时，需要看 $t=0$ 时的位置和运动方向。

### 6.3 旋转矢量法

把简谐振动看成旋转矢量在 $x$ 轴上的投影。

规则：

矢量长度等于振幅 $A$

矢量以角速度 $\omega$ 逆时针旋转

$$t=0) 时矢量与 (x) 轴夹角为 (\varphi$$

矢量在 $x$ 轴上的投影就是 $x=A\cos(\omega t+\varphi)$

旋转矢量法特别适合解决：

已知某一时刻位移和速度，求振动方程

判断初相位象限

判断超前、落后

画简谐振动图像

课件也用旋转矢量法举例求振动表达式。

## 7. 简谐振动的合成

课件中把合成分为两大类：

同方向简谐振动合成

相互垂直简谐振动合成

并分别讨论同频率和不同频率情况。

## 7.1 同方向、同频率的两个简谐振动合成

设：

$$x_1=A_1\cos(\omega t+\varphi_1)$$

$$x_2=A_2\cos(\omega t+\varphi_2)$$

合振动：

$$x=x_1+x_2$$

结果仍然是简谐振动：

$$x=A\cos(\omega t+\varphi)$$

合振幅：

$$A=\sqrt{A_1^2+A_2^2+2A_1A_2\cos(\varphi_2-\varphi_1)}$$

合初相位：

$$\tan\varphi=\frac{A_1\sin\varphi_1+A_2\sin\varphi_2}{A_1\cos\varphi_1+A_2\cos\varphi_2}$$

注意：求 $\varphi$ 时仍要判断象限。

### 特殊情况

同相：

$$\varphi_2-\varphi_1=0$$

$$A=A_1+A_2$$

两振动相互加强。

反相：

$$\varphi_2-\varphi_1=\pm\pi$$

$$A=|A_1-A_2|$$

两振动相互减弱。

如果 $A_1=A_2$，且反相，则：

$$A=0$$

完全抵消。

## 7.2 同方向、相近频率的合成：拍

设：

$$x_1=A\cos\omega_1t$$

$$x_2=A\cos\omega_2t$$

合振动：

$$x=x_1+x_2$$

利用和差化积：

$$x=2A\cos\frac{\omega_2-\omega_1}{2}t\cos\frac{\omega_2+\omega_1}{2}t$$

当 $\omega_1$ 和 $\omega_2$ 很接近时：

$\cos\frac{\omega_2-\omega_1}{2}t$ 变化慢

$\cos\frac{\omega_2+\omega_1}{2}t$ 变化快

所以合振动可以看成“振幅缓慢变化的振动”。

这种强弱周期性变化的现象叫拍。

拍周期：

$$T_b=\frac{2\pi}{|\omega_2-\omega_1|}$$

拍频：

$$\nu_b=\frac{1}{T_b}=|\nu_2-\nu_1|$$

常见例子：

钢琴调音

两个频率接近的音叉

双簧管、口琴等

课件中明确指出：拍频只与两个分振动的频率差有关。

## 7.3 相互垂直、同频率简谐振动的合成

设：

$$x=A_x\cos(\omega t+\varphi_x)$$

$$y=A_y\cos(\omega t+\varphi_y)$$

消去 $t$，得到轨迹方程：

$$\frac{x^2}{A_x^2}+\frac{y^2}{A_y^2}-\frac{2xy}{A_xA_y}\cos(\varphi_x-\varphi_y)=\sin^2(\varphi_x-\varphi_y)$$

一般情况下，轨迹是椭圆。

特殊情况：

当 $\varphi_x-\varphi_y=0$ 时：

$$\frac{x}{A_x}=\frac{y}{A_y}$$

轨迹是过原点的直线。

当 $\varphi_x-\varphi_y=\pi$ 时：

$$\frac{x}{A_x}=-\frac{y}{A_y}$$

轨迹也是直线，但斜率相反。

当 $\varphi_x-\varphi_y=\pm\frac{\pi}{2}$ 时：

$$\frac{x^2}{A_x^2}+\frac{y^2}{A_y^2}=1$$

轨迹是正放的椭圆。

如果 $A_x=A_y$，则是圆。

## 7.4 相互垂直、不同频率简谐振动的合成

当两个垂直方向的频率不同：

如果频率差很小，相位差会随时间缓慢变化，轨迹形状也会缓慢变化。

如果两个频率之比是整数比，轨迹是闭合曲线，称为李萨如图形。

例如：

$$\omega_x:\omega_y=2:1$$

$$\omega_x:\omega_y=3:1$$

$$\omega_x:\omega_y=3:2$$

不同频率比和不同初相位会得到不同的李萨如图形。

## 8. 非简谐振动的傅里叶分解

### 8.1 基本思想

任何周期性运动都可以分解成一系列简谐振动。

周期为 $T$ 的函数，可以分解为：

基频项

二次谐频项

三次谐频项

更多高次谐频项

基频角频率：

$$\omega=\frac{2\pi}{T}$$

各谐频为：

$$\omega, 2\omega, 3\omega,\cdots,n\omega$$

课件中把这种把周期性运动分解为一系列简谐振动的方法称为谐振分析，也就是傅里叶分析。

### 8.2 傅里叶级数形式

一般形式：

$$x(t)=\frac{A_0}{2}+\sum_{n=1}^{\infty}\left[A_n\cos(n\omega t)+B_n\sin(n\omega t)\right]$$

系数：

$$A_0=\frac{2}{T}\int_0^T x(t)dt$$

$$A_n=\frac{2}{T}\int_0^T x(t)\cos(n\omega t)dt$$

$$B_n=\frac{2}{T}\int_0^T x(t)\sin(n\omega t)dt$$

常见结论：

如果函数是奇函数，通常只含正弦项。

如果函数是偶函数，通常只含余弦项。

方波常出现奇次谐波。

锯齿波可含多个整数次谐波。

## 9. 保守系统的振动

### 9.1 保守系统的含义

保守系统中没有能量耗散，也没有外界持续补充能量。

因此机械能守恒。

典型系统：

无阻尼弹簧振子

理想单摆

理想 LC 电路

### 9.2 从能量角度分析振动

机械能守恒：

$$E=E_k+E_p$$

对于一维运动：

$$E_k=\frac{1}{2}m\dot{x}^2$$

所以：

$$\dot{x}=\sqrt{\frac{2}{m}(E-E_p(x))}$$

周期可以用积分表示：

$$T=2\int_{x_{\min}}^{x_{\max}}\frac{dx}{\sqrt{\frac{2}{m}(E-E_p(x))}}$$

这个公式适合分析非标准简谐振动。

### 9.3 稳定平衡与简谐近似

如果势能 $E_p(x)$ 在平衡位置附近有极小值，则该平衡位置是稳定平衡位置。

在稳定平衡点附近，可以把势能展开为：

$$E_p(x)\approx E_p(0)+\frac{1}{2}kx^2$$

于是：

$$F=-\frac{dE_p}{dx}\approx-kx$$

这就变成线性恢复力，因此小振动近似下是简谐振动。

一句话总结：

稳定平衡点附近的小振动，通常可以近似为简谐振动。

### 9.4 线性与非线性恢复力

若恢复力可以写成：

$$F=k_1x+k_2x^2+k_3x^3+\cdots$$

如果主要项是一次项，且 $k_1<0$，则：

$$F\approx k_1x$$

这是线性恢复力，对应简谐振动。

如果一次项消失，主要项是三次项，例如：

$$F\approx k_3x^3$$

则是非线性恢复力，对应非简谐振动。

## 10. 多自由度保守系统与简正模

### 10.1 多自由度振动

如果一个系统需要多个坐标才能描述，就叫多自由度系统。

例如：

两个用弹簧连接的单摆

多个质量块与弹簧连接

分子中多个原子的振动

### 10.2 简正模

多自由度系统的复杂振动，可以分解为几个独立的简谐振动模式，这些模式叫简正模。

以两个耦合单摆为例，可以出现：

同相振动模式：两个摆一起同向运动

反相振动模式：两个摆相向或反向运动

一般结论：

多自由度系统的振动可以看成多个简正模的叠加。

每个简正模都有自己的固有频率。

初始条件决定各个简正模参与的比例。

## 11. 振动的分类

从受力角度看：

自由振动：只有恢复性保守力

阻尼振动：恢复性保守力 + 阻尼力

受迫振动：恢复性保守力 + 阻尼力 + 周期性策动力

自激振动：恢复性保守力 + 阻尼力 + 单向能量补充

从能量角度看：

无阻尼自由振动：无能量耗散，也无能量补充

阻尼振动：有能量耗散，无能量补充

受迫振动：有能量耗散，也有外界能量补充

自激振动：有能量耗散，也有能量补充，但补充方式由系统本身控制

## 12. 阻尼振动

### 12.1 阻尼力

常见阻尼力与速度成正比，方向与速度相反：

$$f_x=-\gamma\dot{x}$$

其中 $\gamma$ 是阻尼系数。

恢复力：

$$F_x=-kx$$

由牛顿第二定律：

$$m\ddot{x}=-kx-\gamma\dot{x}$$

整理：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=0$$

其中：

$$\beta=\frac{\gamma}{2m}$$

$$\omega_0=\sqrt{\frac{k}{m}}$$

$\beta$：阻尼因子

$\omega_0$：无阻尼时的固有角频率

### 12.2 特征方程

设：

$$x=e^{rt}$$

代入：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=0$$

得到特征方程：

$$r^2+2\beta r+\omega_0^2=0$$

根为：

$$r_1=-\beta+\sqrt{\beta^2-\omega_0^2}$$

$$r_2=-\beta-\sqrt{\beta^2-\omega_0^2}$$

根据 $\beta$ 和 $\omega_0$ 的大小关系，阻尼振动分三类。

## 12.3 过阻尼

条件：

$$\beta>\omega_0$$

此时两个根都是负实根。

运动形式：

$$x=c_1e^{r_1t}+c_2e^{r_2t}$$

特点：

不发生来回振动

缓慢回到平衡位置

阻尼太大，系统“回得慢”

例子：门上阻尼器太紧，门慢慢回去，不来回摆。

## 12.4 临界阻尼

条件：

$$\beta=\omega_0$$

运动形式：

$$x=(c_1+c_2t)e^{-\beta t}$$

特点：

不发生振动

以最快方式回到平衡位置

不会越过平衡位置来回摆

这是过阻尼和欠阻尼的分界。

常见应用：

仪表指针快速稳定

汽车减震器设计

阻尼门、缓冲装置

## 12.5 欠阻尼，也叫低阻尼

条件：

$$\beta<\omega_0$$

此时系统仍会振动，但振幅随时间指数衰减。

令：

$$\omega=\sqrt{\omega_0^2-\beta^2}$$

运动方程：

$$x=A_0e^{-\beta t}\cos(\omega t+\varphi_0)$$

特点：

仍然来回振动

振幅越来越小

振动角频率变为 $\omega$，小于无阻尼固有角频率 $\omega_0$

振幅包络线是：

$$A(t)=A_0e^{-\beta t}$$

### 12.6 对数减缩

相隔一个周期前后振幅之比的自然对数，叫对数减缩：

$$\lambda=\ln\frac{A(t)}{A(t+T)}$$

欠阻尼情况下：

$$\lambda=\beta T$$

又因为：

$$T=\frac{2\pi}{\sqrt{\omega_0^2-\beta^2}}$$

所以：

$$\lambda=\frac{2\pi\beta}{\sqrt{\omega_0^2-\beta^2}}$$

### 12.7 阻尼振动中的能量

阻尼力做负功，所以机械能不断减少。

机械能变化率：

$$\frac{dE}{dt}=f_xv$$

因为：

$$f_x=-\gamma v$$

所以：

$$\frac{dE}{dt}=-\gamma v^2<0$$

因此阻尼振动的机械能随时间衰减。

## 13. 受迫振动

### 13.1 什么是受迫振动

受迫振动：系统在周期性外力作用下的振动。

周期性外力也叫策动力。

典型形式：

$$F(t)=F_0\cos(\omega t)$$

其中：

$F_0$：策动力振幅

$\omega$：策动力角频率

受迫振动系统通常同时有：

恢复力

阻尼力

周期性策动力

## 13.2 受迫振动微分方程

恢复力：

$$F_x=-kx$$

阻尼力：

$$f_x=-\gamma\dot{x}$$

策动力：

$$F(t)=F_0\cos(\omega t)$$

由牛顿第二定律：

$$m\ddot{x}=-kx-\gamma\dot{x}+F_0\cos(\omega t)$$

整理：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=f_0\cos(\omega t)$$

其中：

$$\beta=\frac{\gamma}{2m}$$

$$\omega_0=\sqrt{\frac{k}{m}}$$

$$f_0=\frac{F_0}{m}$$

## 13.3 受迫振动的通解

通解由两部分组成：

$$x=x_1+x_2$$

其中：

$x_1$：齐次方程通解，也就是阻尼自由振动部分

$x_2$：非齐次方程特解，也就是受迫振动稳定部分

欠阻尼时：

$$x_1=A_0e^{-\beta t}\cos(\sqrt{\omega_0^2-\beta^2}t+\varphi_0)$$

这部分会随时间衰减，叫暂态解。

稳定后剩下：

$$x_2=A\cos(\omega t+\varphi)$$

这部分不随时间衰减，叫稳态解。

所以受迫振动稳定后，频率等于策动力频率，而不是系统固有频率。

## 13.4 稳态振幅与相位

稳态振幅：

$$A=\frac{f_0}{\sqrt{(\omega_0^2-\omega^2)^2+4\beta^2\omega^2}}$$

相位：

$$\tan\varphi=\frac{-2\beta\omega}{\omega_0^2-\omega^2}$$

结论：

振幅 $A$ 取决于策动力频率 $\omega$。

相位 $\varphi$ 表示受迫振动相对于策动力的滞后程度。

低频时，位移基本跟着外力走。

高频时，系统来不及响应，振幅变小。

接近共振时，振幅显著增大。

## 13.5 位移共振

位移振幅：

$$A=\frac{f_0}{\sqrt{(\omega_0^2-\omega^2)^2+4\beta^2\omega^2}}$$

令：

$$\frac{dA}{d\omega}=0$$

得到位移共振频率：

$$\omega_r=\sqrt{\omega_0^2-2\beta^2}$$

位移共振存在条件：

$$\omega_0^2-2\beta^2>0$$

即：

$$\beta<\frac{\omega_0}{\sqrt{2}}$$

共振振幅：

$$A_{\max}=\frac{f_0}{2\beta\sqrt{\omega_0^2-\beta^2}}$$

阻尼越小，共振峰越高、越尖锐。

阻尼越大，共振峰越低、越宽。

## 13.6 速度共振

速度振幅：

$$V=\omega A$$

所以：

$$V=\frac{\omega f_0}{\sqrt{(\omega_0^2-\omega^2)^2+4\beta^2\omega^2}}$$

速度共振条件：

$$\frac{dV}{d\omega}=0$$

得到：

$$\omega=\omega_0$$

速度共振时最大速度：

$$V_{\max}=\frac{f_0}{2\beta}$$

注意：

位移共振频率不一定等于 $\omega_0$

速度共振频率等于 $\omega_0$

## 13.7 受迫振动中的能量

稳态受迫振动中：

外力输入能量

阻尼耗散能量

平均来看二者相等

速度：

$$v=\dot{x}=-\omega A\sin(\omega t+\varphi)$$

策动力功率：

$$P_F=F(t)v$$

阻尼力功率：

$$P_f=-\gamma v^2$$

稳定状态下，一个周期内：

平均输入功率 = 平均耗散功率

所以振幅不再增长，维持稳定。

共振时，外力对系统做功效率最高，因此能量输入最大。

## 14. 常见解题套路

### 14.1 判断是不是简谐振动

步骤：

选平衡位置为原点

设位移为 $x$ 或角位移为 $\theta$

列受力方程或力矩方程

看能不能化成：

$$\ddot{x}+\omega^2x=0$$

或：

$$\ddot{\theta}+\omega^2\theta=0$$

如果能，就是简谐振动。

### 14.2 求振动周期

如果是平动系统：

先找等效恢复力：

$$F=-k_{\text{eff}}x$$

则：

$$\omega=\sqrt{\frac{k_{\text{eff}}}{m_{\text{eff}}}}$$

$$T=2\pi\sqrt{\frac{m_{\text{eff}}}{k_{\text{eff}}}}$$

如果是转动系统：

先找恢复力矩：

$$M=-C\theta$$

转动方程：

$$I\ddot{\theta}=-C\theta$$

则：

$$\omega=\sqrt{\frac{C}{I}}$$

$$T=2\pi\sqrt{\frac{I}{C}}$$

### 14.3 已知初始条件求振动方程

标准形式：

$$x=A\cos(\omega t+\varphi)$$

先由系统求 $\omega$

再用：

$$A=\sqrt{x_0^2+\left(\frac{v_0}{\omega}\right)^2}$$

$$\tan\varphi=-\frac{v_0}{\omega x_0}$$

最后根据 $x_0$、$v_0$ 判断 $\varphi$ 的象限。

### 14.4 已知图像求振动方程

从图像读：

最大位移得到 $A$

相邻两个同状态点间距得到 $T$

由 $\omega=2\pi/T$ 得 $\omega$

看 $t=0$ 时 $x$ 和运动方向，确定 $\varphi$

写出：

$$x=A\cos(\omega t+\varphi)$$

### 14.5 做合振动题

同方向、同频率：

用矢量合成公式。

同方向、频率接近：

想到拍。

垂直方向、同频率：

想到椭圆、直线、圆。

垂直方向、频率成整数比：

想到李萨如图形。

### 14.6 做阻尼振动题

先写：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=0$$

再比较：

$\beta>\omega_0$：过阻尼

$\beta=\omega_0$：临界阻尼

$\beta<\omega_0$：欠阻尼

欠阻尼重点公式：

$$x=A_0e^{-\beta t}\cos(\sqrt{\omega_0^2-\beta^2}t+\varphi_0)$$

### 14.7 做受迫振动题

先写：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=f_0\cos(\omega t)$$

稳态解：

$$x=A\cos(\omega t+\varphi)$$

振幅：

$$A=\frac{f_0}{\sqrt{(\omega_0^2-\omega^2)^2+4\beta^2\omega^2}}$$

位移共振：

$$\omega_r=\sqrt{\omega_0^2-2\beta^2}$$

速度共振：

$$\omega=\omega_0$$

## 15. 最后速记版

简谐振动核心方程：

$$x=A\cos(\omega t+\varphi)$$

$$v=-A\omega\sin(\omega t+\varphi)$$

$$a=-\omega^2x$$

动力学标准式：

$$\ddot{x}+\omega^2x=0$$

弹簧振子：

$$\omega=\sqrt{k/m}$$

$$T=2\pi\sqrt{m/k}$$

单摆小角度：

$$\omega=\sqrt{g/l}$$

$$T=2\pi\sqrt{l/g}$$

能量：

$$E=\frac{1}{2}kA^2=\frac{1}{2}m\omega^2A^2$$

同频同向合成：

$$A=\sqrt{A_1^2+A_2^2+2A_1A_2\cos(\varphi_2-\varphi_1)}$$

拍频：

$$\nu_b=|\nu_2-\nu_1|$$

阻尼振动：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=0$$

欠阻尼：

$$x=A_0e^{-\beta t}\cos(\sqrt{\omega_0^2-\beta^2}t+\varphi_0)$$

受迫振动：

$$\ddot{x}+2\beta\dot{x}+\omega_0^2x=f_0\cos\omega t$$

稳态振幅：

$$A=\frac{f_0}{\sqrt{(\omega_0^2-\omega^2)^2+4\beta^2\omega^2}}$$

位移共振频率：

$$\omega_r=\sqrt{\omega_0^2-2\beta^2}$$

速度共振频率：

$$\omega=\omega_0$$
