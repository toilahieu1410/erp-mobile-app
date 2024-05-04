import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ImageFullWidth from './ImageFullWidth';
import ImageView from 'react-native-image-viewing';
import {ArrImageProps} from '../../../models/ArrImageProps';
type MultiImageGalleryProps = {
  images?: ArrImageProps[] | [];
};

type RenderProps = {
  images?: ArrImageProps[] | [];
  onPress?: ((index: number) => void) | undefined;
};

const MultiImageGallery = ({images}: MultiImageGalleryProps) => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [indexShowImage, setIndexShowImage] = useState<number>(0);
  const onPressImage = (index: number) => {
    setIndexShowImage(index);
    setIsVisible(true);
  };
  return (
    <View>
      <Pressable
        onPress={() => {
          setIsVisible(true);
        }}>
        <View>
          {images!.length == 1 ? (
            <Render_1 images={images} onPress={onPressImage} />
          ) : null}
          {images!.length == 2 ? (
            <Render_2 images={images} onPress={onPressImage} />
          ) : null}
          {images!.length == 3 ? (
            <Render_3 images={images} onPress={onPressImage} />
          ) : null}
          {images!.length == 4 ? (
            <Render_4 images={images} onPress={onPressImage} />
          ) : null}
          {images!.length > 4 ? (
            <Render_orther images={images} onPress={onPressImage} />
          ) : null}
        </View>
      </Pressable>
      <ImageView
        images={images!}
        imageIndex={indexShowImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

const Render_1 = ({images, onPress}: RenderProps) => {
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress(0);
        }
      }}>
      <ImageFullWidth uri={images![0].uri} />
    </Pressable>
  );
};

const Render_2 = ({images, onPress}: RenderProps) => {
  return (
    <View style={styles.view_render_2}>
      <Pressable
        style={[styles.row, {marginRight: 2}]}
        onPress={() => {
          if (onPress) {
            onPress(0);
          }
        }}>
        <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
      </Pressable>
      <Pressable
        style={[styles.row, {marginLeft: 2}]}
        onPress={() => {
          if (onPress) {
            onPress(1);
          }
        }}>
        <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
      </Pressable>
    </View>
  );
};

const Render_3 = ({images, onPress}: RenderProps) => {
  return (
    <View style={styles.view_render_3}>
      <View style={{flex: 1.5, marginRight: 4}}>
        <Pressable
          style={styles.first_row_render_3}
          onPress={() => {
            if (onPress) {
              onPress(0);
            }
          }}>
          <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
        </Pressable>
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Pressable
          style={styles.item_render_3}
          onPress={() => {
            if (onPress) {
              onPress(1);
            }
          }}>
          <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
        </Pressable>
        <Pressable
          style={styles.item2_render_3}
          onPress={() => {
            if (onPress) {
              onPress(2);
            }
          }}>
          <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
        </Pressable>
      </View>
    </View>
  );
};

const Render_4 = ({images, onPress}: RenderProps) => {
  return (
    <View style={styles.view_render_4}>
      <View style={{flex: 1, marginRight: 2, flexDirection: 'column'}}>
        <Pressable
          style={{flex: 1, marginBottom: 2}}
          onPress={() => {
            if (onPress) {
              onPress(0);
            }
          }}>
          <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
        </Pressable>
        <Pressable
          onPress={() => {
            if (onPress) {
              onPress(1);
            }
          }}
          style={{flex: 1, marginTop: 2}}>
          <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
        </Pressable>
      </View>
      <View style={{flex: 1, marginLeft: 2}}>
        <Pressable
          style={{flex: 1, marginBottom: 2}}
          onPress={() => {
            if (onPress) {
              onPress(2);
            }
          }}>
          <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
        </Pressable>
        <Pressable
          style={{flex: 1, marginTop: 2}}
          onPress={() => {
            if (onPress) {
              onPress(3);
            }
          }}>
          <Image source={{uri: images![3].uri}} style={styles.image_render_2} />
        </Pressable>
      </View>
    </View>
  );
};

const Render_orther = ({images, onPress}: RenderProps) => {
  return (
    <View style={styles.view_render_4}>
      <View style={{flex: 1, marginRight: 2, flexDirection: 'column'}}>
        <Pressable
          onPress={() => {
            if (onPress) {
              onPress(0);
            }
          }}
          style={{flex: 1, marginTop: 2}}>
          <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
        </Pressable>
        <Pressable
          onPress={() => {
            if (onPress) {
              onPress(1);
            }
          }}
          style={{flex: 1, marginTop: 2}}>
          <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
        </Pressable>
      </View>
      <View style={{flex: 1, marginLeft: 2}}>
        <Pressable
          style={{flex: 1, marginBottom: 2}}
          onPress={() => {
            if (onPress) {
              onPress(2);
            }
          }}>
          <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
        </Pressable>
        <Pressable
          style={{flex: 1, marginTop: 2, position: 'relative'}}
          onPress={() => {
            if (onPress) {
              onPress(3);
            }
          }}>
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              width: '100%',
              height: '100%',
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 35,
                color: 'white',
              }}>
              + {images!.length - 4}
            </Text>
          </View>
          <Image source={{uri: images![3].uri}} style={styles.image_render_2} />
        </Pressable>
      </View>
    </View>
  );
};

export default MultiImageGallery;

const styles = StyleSheet.create({
  view_render_2: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    aspectRatio: 16 / 12,
    width: '100%',
  },
  row: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image_render_2: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  // ==============================================================

  view_render_3: {
    flexDirection: 'row',
    aspectRatio: 16 / 12,
    width: '100%',
  },
  first_row_render_3: {
    flex: 1,
  },
  item_render_3: {
    flex: 1,
    marginBottom: 2,
  },
  item2_render_3: {
    flex: 1,
    marginTop: 2,
  },

  view_render_4: {
    flex: 1,
    flexGrow: 2,
    aspectRatio: 16 / 12,
    flexDirection: 'row',
  },

  item_render_4: {
    flex: 1,
  },
});
