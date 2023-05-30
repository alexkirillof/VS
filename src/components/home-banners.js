import React, { useRef } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import { colors, screenWidth, ImagesDefault } from '../styles';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';

const HomeBanners = ({ bannersList = [], navigation, loading }) => {
  const baseOptions = {
    vertical: false,
    width: bannersList.length > 1 ? screenWidth * 0.95 : screenWidth - 8,
    height: 240,
    autoPlay: true,
    autoPlayInterval: 2000,
  };
  const isCarousel = useRef(null);
  if (loading) {
    return (
      <View style={styles.sliderPreloader}>
        <ActivityIndicator size={'small'} color={colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {bannersList.length > 0 ? (
        <Carousel
          ref={isCarousel}
          {...baseOptions}
          loop={bannersList.length > 1}
          style={{ width: '100%' }}
          data={bannersList}
          renderItem={({ item }) => (
            <View style={styles.slideContainer}>
              <TouchableOpacity
                key={Math.random(item.sort)}
                onPress={() => {
                  if (item.product) {
                    navigation.navigate('ProductStack', {
                      screen: 'Product',
                      params: {
                        productId: item.product,
                      },
                    });
                  } else if (item.category) {
                    navigation.navigate('CategoryStack', {
                      screen: 'ProductList',
                      params: {
                        categoryId: item.category,
                        categoryName: item.name,
                      },
                    });
                  }
                  // else if (item.Info) {
                  //   navigation.navigate("NewsStack", {
                  //     screen: "NewsPage",
                  //     params: {
                  //       newsId: item.Info,
                  //     },
                  //   });
                  // }
                }}>
                <FastImage
                  key={item.id}
                  source={
                    item.picture
                      ? { uri: item.picture }
                      : ImagesDefault.defaultImage
                  }
                  style={styles.image}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    marginVertical: 8,
  },
  sliderPreloader: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
    margin: 8,
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    width: screenWidth * 0.95 - 120,
    marginHorizontal: 20,
  },
  slideContainer: {
    flex: 1,
    marginLeft: '2.5%',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray,
    borderRadius: 8,
  },
});

export default HomeBanners;
