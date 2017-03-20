## 下载到本地


```
// 将 RN-Swiper clone 到你的项目的 lib 目录
git clone git@gitlab.58corp.com:wuxianfe/RN-Swiper.git <yourLib>
```
## 在项目中引入

```
import Swiper from './<yourLib>/RN-Swiper'
```

## 简单 demo

```jsx harmony
class HorizontalExample extends Component {
  render(){
    return(
      <Swiper
        style={styles.wrapper}
        defaultIndex={0}
        isLoop={true}
        onChangeStart={(index)=>{
          console.log('onChangeStart',index)
        }}
        onChangeEnd={(index)=>{
          console.log('onChangeEnd',index)
        }}
        autoPlayTimeout={10000}
      >
        <View style={styles.view1}>
          <Text>0</Text>
        </View>
        <View style={styles.view2}>
          <Text>1</Text>
        </View>
        <View style={styles.view3}>
          <Text>2</Text>
        </View>
      </Swiper>
    )
  }
}




const styles = StyleSheet.create({
  wrapper: {
    marginTop: 200,
    width: 200,
    height: 200,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  view1: {
    flex:1,
    backgroundColor: '#0ca',
  },
  view2: {
    flex:1,
    backgroundColor: '#0ac',
  },
  view3: {
    flex:1,
    backgroundColor: '#ac0',
  },
});
```

## 属性设置


    /**
     * 可选优化项。轮播图的高度（horizontal: false）或者宽度（horizontal: true）。
     */
    size: PropTypes.number,
    /**
     * 轮播的视图
     */
    children: PropTypes.node.isRequired,
    /**
     * <非受控组件>
     * 默认展现第 defaultIndex 个的视图 (从 0 开始)
     */
    defaultIndex: PropTypes.number,
    /**
     * 是否水平轮播
     */
    horizontal: PropTypes.bool,
    /**
     * 是否头尾衔接的循环轮播
     */
    isLoop: PropTypes.bool,
    /**
     * 是否自动轮播
     */
    autoPlay: PropTypes.bool,
    /**
     * 自动轮播的时间间隔。
     * 若该时间间隔设置的比动画时间还要短，组件会做出自动调整。
     */
    autoPlayTimeout: PropTypes.number,
    /**
     * 自动轮播的方向，默认(true)为水平为从左到右，垂直为从下到上；
     * false 则方向反方向轮播
     */
    autoPlayDirection: PropTypes.bool,
    /**
     * 自定义动画函数
     */
    animation: PropTypes.func,
    /**
     * 当前展现的视图变化前调用。回调参数为即将变化的位置。
     * 注意，由于动画可能被中断。所以有 onChangeStart 不一定有 onChangeEnd
     */
    onChangeStart: PropTypes.func,
    /**
     * 当前展现的视图变化后调用。回调参数为变化后的位置。
     */
    onChangeEnd:  PropTypes.func,
    /**
     *  展现轮播图的 Pagination
     */
    showsPagination: PropTypes.bool,
    
### Basic

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| horizontal | true | `bool` | 是否水平轮播 |
| loop | true | `bool` | 是否头尾衔接的循环轮播 |
| defaultIndex | 0 | `number` | 默认展现第 defaultIndex 个的视图 (从 0 开始) |
| style | {...} | `style` | 轮播图的自定义样式 |
| animation | {...} | `func` | 轮播图的自定义动画 |
| size | null | `number` | 可选优化项。轮播图的高度（horizontal: false）或者宽度（horizontal: true）|

### Pagination

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| showsPagination | true | `bool` | 是否展现 Pagination |
| paginationStyle | {...} | `style` | Pagination 的自定义样式。 |
| dotStyle | - | `object` | dot 的自定义样式 |
| dotColor | - | `string` | dot 的自定义颜色 |
| activeDotColor | - | `string` | activeDot 的自定义颜色 |
| activeDotStyle | - | `object` | activeDot 的自定义样式 |

### Autoplay

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| autoplay | true | `bool` | 是否自动轮播 |
| autoplayTimeout | 2500 | `number` | 轮播的间隔时间。如果少于一个动画的时间，会设置为一个动画的时间。 |
| autoplayDirection | true | `bool` | 自动轮播的方向。默认(true)为水平为从左到右，垂直为从下到上。 |

### Callback

| Prop  | Params  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| onChangeStart | `nextActiveIndex` |`function` | 当前展现的视图变化前调用。回调参数为即将变化的位置。 |
| onChangeEnd | `activeIndex` | `function` | 当前展现的视图变化后调用。回调参数为变化后的位置。 |
