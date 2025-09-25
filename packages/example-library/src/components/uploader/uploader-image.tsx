import isNil from 'lodash/isNil';
import React, { useMemo, memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import type { UploaderImageProps } from './interface';
import { CrossOutline, CrossCircleOutline } from '../icons';
import LoadingCircular from '../loading';

/**
 * UploaderImage 文件上传的缩略图
 */
const UploaderImage: React.FC<UploaderImageProps> = ({
  filepath,
  status = 'done',
  imageComponent: ImageComponent = Image,
  deletable = true,
  size,
  marginRight,
  marginBottom,
  onPress,
  onPressDelete,
  isUpload,
  children,
}) => {
  const customSizeStyle = useMemo(() => ({ width: size, height: size }), [size]);

  const customStyle = useMemo(
    () => ({
      width: size,
      height: size,
      marginRight: marginRight,
      marginBottom: marginBottom,
    }),
    [size, marginRight, marginBottom]
  );
  const canPress = isUpload || (!!filepath && (status === 'done' || status === 'error'));
  return (
    <TouchableOpacity
      style={customStyle}
      className='items-center justify-center overflow-hidden rounded bg-gray-200'
      onPress={canPress ? onPress : undefined}
      activeOpacity={canPress ? 0.8 : 1}
    >
      {!isNil(children) ? (
        children
      ) : (
        <>
          <ImageComponent style={customSizeStyle} source={{ uri: filepath }} />

          {deletable && status !== 'loading' ? (
            <CrossOutline
              size={12}
              color='#fff'
              onPress={onPressDelete}
              className='absolute right-0 top-0 w-4 h-4 rounded-bl bg-black/95 items-center justify-center z-[3]'
            />
          ) : null}

          {status === 'loading' ? (
            <View className='absolute top-0 left-0 right-0 bottom-0 bg-black/95 items-center justify-center z-[2]'>
              <LoadingCircular color='#fff' size={20} />
              <Text className='text-white text-lg mt-1'>上传中...</Text>
            </View>
          ) : null}

          {status === 'error' ? (
            <View className='absolute bg-black/95 top-0 left-0 right-0 bottom-0 items-center justify-center z-[2]'>
              <CrossCircleOutline color='#fff' size={20} />
              <Text className='text-white text-lg mt-1'>{`上传失败\n点击重试`}</Text>
            </View>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
};

export default memo(UploaderImage);
