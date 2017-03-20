import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  InteractionManager
} from 'react-native';


export default class ViewPan extends Component {

  /**
   * Props Validation
   * @type {Object}
   */
  static propTypes = {
    /**
     * 轮播的视图
     */
    children: PropTypes.node.isRequired,
    /**
     * <非受控组件>
     * 默认展现第 defaultPosition 个的视图 (从 0 开始)
     */
    defaultPosition: PropTypes.number,
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
     * 自动轮播的时间间隔
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
     * 当前展现的视图变化前，触发该回调。回调参数为变化后的位置。
     * 注意，由于动画可能被中断。所以有 onChangeStart 不一定有 onChangeEnd
     */
    onChangeStart: PropTypes.func,
    /**
     * 当前展现的视图变化后，触发该回调。回调参数为变化后的位置。
     */
    onChangeEnd:  PropTypes.func,
  };


  /**
   * Default props
   * @return {object} props
   */
  static defaultProps = {
    defaultPosition: 0,
    horizontal: true,
    isLoop: false,
    autoPlay: true,
    autoPlayTimeout: 3000,
    autoPlayDirection: true,
    animation: function (animateValue, toValue) {
      return Animated.spring(animateValue,
        {
          toValue: toValue,
          friction: 15,
          tension: 40,
        })
    },
  };




  constructor(props) {
    super(props);

    const {isLoop, defaultPosition} = props;

    /**
     * Init position
     * @return {object}
     */
    this.position = isLoop ? defaultPosition + 1 : defaultPosition;
    this.positionValue = new Animated.Value(this.position);

    // 获取 positionValue 的动态值
    this.positionValue.addListener(({value}) => {
      this.position = value;
    });

    /**
     * Init states
     * @return {object} states
     */
    this.state = {
      size: null,
    };

  }

  // shouldComponentUpdate(){
  // 当 state.position 改变时，不重新渲染，只 scrollTo
  // return false;
  // }

  componentDidMount(){
    this.autoRun();
  }

  componentWillUnmount(){
    this.autoRunTimer && clearInterval(this.autoRunTimer);
  }

  shouldComponentUpdate(){
    return false;
  }

  autoRun = () => {
    const {autoPlayTimeout, autoPlayDirection} = this.props;
    let startTime = null;
    let runTime = null;

    this.autoRunTimer  = setInterval(() => {

      startTime = new Date();

      InteractionManager.runAfterInteractions(() => {
        runTime = new Date();
        // 如果有用户交互或者动画发生过，跳过该次滚动动画
        if ( runTime && runTime - startTime < autoPlayTimeout / 100) {

          let result;
          if (Number.isInteger(this.position)){
            result = this.position + (autoPlayDirection? 1 : -1);

          } else {

            // 由于动画没有完成，导致 this.position 可能为非整数，停止动画
            this.positionValue.stopAnimation();
            // 在这里纠正为整数
            result = autoPlayDirection? Math.ceil(this.position) : Math.floor(this.position);
          }

          this.scrollTo(result);
        }
      })
    }, autoPlayTimeout)

  };


  contents = (() => {
    const {children, isLoop} = this.props;
    const childrenArray = React.Children.toArray(children);
    const contents = childrenArray;

    if (isLoop) {
      const first = React.cloneElement(childrenArray[0]);
      const last = React.cloneElement(childrenArray[childrenArray.length - 1]);

      contents.unshift(last);
      contents.push(first);
    }

    return contents
  })();

  responder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
      // 默认返回true。目前暂时只支持android。
      return true;
    },
    onPanResponderTerminationRequest: (evt, gestureState) => false,

    onPanResponderGrant: (evt, gestureState) => {
      // 用户手指触碰屏幕，停止动画
      this.positionValue.stopAnimation();
      this.positionValue.setOffset(this.position);
      this.positionValue.setValue(0);
    },
    onPanResponderMove: (evt, {dx, dy}) => {
      const distance = this.props.horizontal ? dx : dy;
      this.positionValue.setValue(distance / -this.props.size);
    },
    onPanResponderRelease: (evt, {vx, vy}) => {
      const { horizontal} = this.props;
      const velocity = horizontal ? vx : vy;
      const previous = Math.floor(this.position);
      const next = previous + 1;
      let result;


      if (velocity > 0.05) {
        result = previous;
      } else if (velocity < -0.05) {
        result = next;
      } else {
        result = Math.round(this.position);
      }


      this.positionValue.flattenOffset();
      this.scrollTo(result)
    },
  });

  // position 为当前视图的位置（如果 loop 就会有假的视图）， index 为用户认为当前视图的位置
  toIndex = (position) => {
    const {isLoop} = this.props;

    if(!isLoop){
      return position
    }

    const first = 0;
    const last = React.Children.count(this.contents) - 1;
    let index ;

    if(position == first ) {
      index = last - 2;
    } else if (position == last) {
      index = first;
    } else {
      index = position - 1;
    }

    return index
  };

  scrollTo(position){
    const {isLoop, animation,onChangeStart,onChangeEnd} = this.props;
    const childrenCount = React.Children.count(this.contents);
    const first = 0;
    const last = childrenCount - 1;

    // position 即将要变化的位置
    const index =  this.toIndex(position);
    onChangeStart && onChangeStart(index);

    // 限制超出范围
    position = Math.min(last, Math.max(first, position));


    animation(this.positionValue, position)
      .start( ({finished}) => {
        
        if(finished){
          // this.position 现在的位置
          const index =  this.toIndex(this.position);
          onChangeEnd && onChangeEnd(index);

          // 如果单方向循环轮播，从最后一帧（或者第一帧）无动画跳转到假的最后一帧（或者假的第一帧）
          if( isLoop ){
            if (position == first) {
              this.positionValue.setValue(last - 1);
            } else if (position == last) {
              this.positionValue.setValue(first + 1);
            }
          }
        }
      });

  }




  render() {
    const { horizontal, size,style} = this.props;
    const translateDirection = horizontal ? 'translateX' : 'translateY';
    const stylesWrapper = horizontal ? styles.wrapper : styles.verticalWrapper;


    return (
      <View
        style={[stylesWrapper]}
        {...this.responder.panHandlers}
      >
        {
          React.Children.map(this.contents, (child, index) => {
            return (
              <Animated.View key={index} style={[styles.item, {
                transform: [
                  {
                    [translateDirection]: this.positionValue.interpolate({
                      inputRange: [ index , index + 1 ],
                      outputRange: [0, -size],
                    })
                  }
                ],
              }]}>
                {child}
              </Animated.View>
            )
          })
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#0ca',
  },
  verticalWrapper: {
    flex:1,
    backgroundColor: '#0ca',
    flexDirection: 'column',
  },
  item: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});