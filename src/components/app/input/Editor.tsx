import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';

import React, {useRef, useState} from 'react';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-crop-picker';
import {IMAGES} from '../../../constants/images';
const Editor = () => {
  const refEditor = React.useRef();
  const [text, setText] = useState();

  const pickerImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(async image => {
      const imageBase64 = await convertImageToBase64(image.path);
      const strImageBase64 = `data:${image.mime};base64,${imageBase64}`;
      refEditor.current?.insertImage(strImageBase64);
    });
  };
  const convertImageToBase64 = async (
    imageUri: string,
  ): Promise<string | null> => {
    try {
      const imageData = await RNFS.readFile(imageUri, 'base64');
      return imageData;
    } catch (error) {
      return null;
    }
  };

  const insertLink = () => {
    refEditor.current?.insertLink('Example Link', 'https://example.com');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="mb-4">
      <View>
        <View className="flex flex-row flex-nowrap items-center justify-between absolute top-0 z-50">
          <RichToolbar
            editor={refEditor}
            actions={[actions.keyboard]}
            iconMap={{
              [actions.keyboard]: () => (
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>X</Text>
              ),
            }}
          />
          <RichToolbar
            editor={refEditor}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              // actions.setBold,
              // actions.setItalic,
              // actions.setUnderline,
              // actions.heading1,
              // actions.content,
              // actions.updateHeight,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.insertLine,
              actions.setParagraph,
              actions.removeFormat,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.alignFull,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.checkboxList,
              actions.insertLink,
              actions.insertText,
              actions.insertHTML,
              actions.insertImage,
              actions.insertVideo,
              actions.fontSize,
              actions.fontName,
              actions.setSubscript,
              actions.setSuperscript,
              actions.setStrikethrough,
              actions.setHR,
              actions.indent,
              actions.outdent,
              actions.undo,
              actions.redo,
              actions.code,
              actions.table,
              actions.line,
              actions.foreColor,
              actions.hiliteColor,
              actions.blockquote,
              actions.setTitlePlaceholder,
              actions.setContentPlaceholder,
              //  actions.setTitleFocusHandler,
              //actions.setContentFocusHandler,
              actions.prepareInsert,
              actions.restoreSelection,
              actions.setCustomCSS,
              actions.setTextColor,
              actions.setBackgroundColor,
              //actions.init,
              // actions.setEditorHeight,
              //actions.setFooterHeight,
              //actions.setPlatform,
            ]}
            onPressAddImage={() => {
              pickerImage();
            }}
            onInsertLink={() => {
              insertLink();
            }}
            iconMap={{
              [actions.heading1]: () => <Text style={{fontSize: 16}}>h1</Text>,
              [actions.heading2]: () => <Text style={{fontSize: 16}}>h2</Text>,
              [actions.heading3]: () => <Text style={{fontSize: 16}}>h3</Text>,
              [actions.setParagraph]: () => (
                <Text style={{fontSize: 16}}>p</Text>
              ),
              [actions.setTextColor]: () => (
                <Image
                  source={IMAGES.SET_TEXT_COLOR}
                  style={{height: 20, width: 20}}
                />
              ),
              [actions.setBackgroundColor]: () => (
                <Image
                  source={IMAGES.FILL_COLOR}
                  style={{height: 20, width: 20}}
                />
              ),
            }}
          />
        </View>
        <ScrollView>
          <View className="h-[50vh] border border-gray-400 rounded-lg">
            <RichEditor
              //onFocus={() =>}
              //onBlur={() => }
              ref={refEditor}
              androidHardwareAccelerationDisabled={true}
              onChange={text => {
                setText(text);
              }}
              initialContentHTML={
                'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
              }
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Editor;
