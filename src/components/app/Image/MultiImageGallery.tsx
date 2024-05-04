import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ImageFullWidth from './ImageFullWidth';
import ImageView from 'react-native-image-viewing';
type MultiImageGalleryProps = {
  images?: arrImageProp[] | [];
};

type arrImageProp = {
  uri?: string | undefined;
};

const MultiImageGallery = ({images}: MultiImageGalleryProps) => {
  const [visible, setIsVisible] = useState<boolean>(false);

  return (
    <View>
      <Pressable
        onPress={() => {
          setIsVisible(true);
        }}>
        <View>
          {images!.length == 1 ? <Render_1 images={images} /> : null}
          {images!.length == 2 ? <Render_2 images={images} /> : null}
          {images!.length == 3 ? <Render_3 images={images} /> : null}
          {images!.length == 4 ? <Render_4 images={images} /> : null}
          {images!.length > 4 ? <Render_orther images={images} /> : null}
        </View>
      </Pressable>
      <ImageView
        images={images!}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

const Render_1 = ({images}: MultiImageGalleryProps) => {
  return (
    <View>
      <ImageFullWidth uri={images![0].uri} />
    </View>
  );
};

const Render_2 = ({images}: MultiImageGalleryProps) => {
  return (
    <View style={styles.view_render_2}>
      <View style={[styles.row, {marginRight: 2}]}>
        <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
      </View>
      <View style={[styles.row, {marginLeft: 2}]}>
        <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
      </View>
    </View>
  );
};

const Render_3 = ({images}: MultiImageGalleryProps) => {
  return (
    <View style={styles.view_render_3}>
      <View style={{flex: 1.5, marginRight: 4}}>
        <View style={styles.first_row_render_3}>
          <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.item_render_3}>
          <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
        </View>
        <View style={styles.item2_render_3}>
          <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
        </View>
      </View>
    </View>
  );
};

const Render_4 = ({images}: MultiImageGalleryProps) => {
  return (
    <View style={styles.view_render_4}>
      <View style={{flex: 1, marginRight: 2, flexDirection: 'column'}}>
        <View style={{flex: 1, marginBottom: 2}}>
          <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
        </View>
        <View style={{flex: 1, marginTop: 2}}>
          <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
        </View>
      </View>
      <View style={{flex: 1, marginLeft: 2}}>
        <View style={{flex: 1, marginBottom: 2}}>
          <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
        </View>
        <View style={{flex: 1, marginTop: 2}}>
          <Image source={{uri: images![3].uri}} style={styles.image_render_2} />
        </View>
      </View>
    </View>
  );
};

const Render_orther = ({images}: MultiImageGalleryProps) => {
  return (
    <View style={styles.view_render_4}>
      <View style={{flex: 1, marginRight: 2, flexDirection: 'column'}}>
        <View style={{flex: 1, marginBottom: 2}}>
          <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
        </View>
        <View style={{flex: 1, marginTop: 2}}>
          <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
        </View>
      </View>
      <View style={{flex: 1, marginLeft: 2}}>
        <View style={{flex: 1, marginBottom: 2}}>
          <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
        </View>
        <View style={{flex: 1, marginTop: 2, position: 'relative'}}>
          <Text
            style={{
              fontSize: 35,
              position: 'absolute',
              zIndex: 10,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              verticalAlign: 'middle',
              alignSelf: 'center',
            }}>
            + {images!.length - 4}
          </Text>
          <Image source={{uri: images![3].uri}} style={styles.image_render_2} />
        </View>
      </View>
    </View>
  );
};

// <View style={styles.item_render_4}>
//         <Image source={{uri: images![0].uri}} style={styles.image_render_2} />
//       </View>
//       <View style={styles.item_render_4}>
//         <Image source={{uri: images![1].uri}} style={styles.image_render_2} />
//       </View>
//       <View style={styles.item_render_4}>
//         <Image source={{uri: images![2].uri}} style={styles.image_render_2} />
//       </View>
//       <View style={styles.item_render_4}>
//         <Image source={{uri: images![3].uri}} style={styles.image_render_2} />
//       </View>

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
