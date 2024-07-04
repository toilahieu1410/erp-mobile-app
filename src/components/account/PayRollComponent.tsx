import React from 'react'
import {Text, View} from 'react-native'
import {fomatNumber} from '../../../utils/CommonFunction'

type PayRollComponentProps = {
  title?: string | undefined;
  subTitle?: string | undefined;
  value?: number | 0;
  type: 'header' | 'content';
};

const PayRollComponent = ({
  subTitle,
  title,
  value,
  type,
}: PayRollComponentProps) => {
  return type == 'header' ? (
    <View>
      <Text className="text-lg text-black font-bold my-4 px-2">{title}</Text>
    </View>
  ) : (
    <View className="py-4 px-6 border-b border-gray-300 flex flex-row flex-nowrap justify-between items-center">
      <View className="flex-1">
        <Text className="text-black text-sm pb-1">{title}</Text>
        {subTitle != undefined ? (
          <Text className="text-gray-500 text-xs max-w-[75%]">{subTitle}</Text>
        ) : null}
      </View>
      <Text className="text-black text-sm">
        {value != null && fomatNumber(value)}
      </Text>
    </View>
  );
};

export default PayRollComponent;
