import React, {useRef} from 'react';
import {View} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {colors, screenHeight, screenWidth} from '../styles';

/**
 * Component SliderDotsSliderBanner
 * @prop {array} children - элементы слайдера
 * @prop {string} height - нужная высота слайдера
 * @prop {string} dotsType - типа точек (bottom, default)
 * @prop {boolean} autoplay - autoplay
 */

export const SLIDER_WIDTH = screenWidth;
export const ITEM_WIDTH = (180 + 20) * 2;

const SliderDotsSliderBanner = props => {
  const isCarousel = useRef(null);
  return (
    <View style={styles.container}>
      {/* <Carousel
        layout={"default"}
        ref={isCarousel}
        loop={true}
        autoplay={props.autoplay}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        data={props.data}
        renderItem={props.renderItem}
        activeSlideOffset={20}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        activeSlideAlignment="start"
      /> */}
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    height: 260,
  },
  dotStyle: {
    opacity: 0.3,
    backgroundColor: colors.gray,
  },
  activeDotStyle: {
    backgroundColor: colors.white,
  },
});

export default SliderDotsSliderBanner;
