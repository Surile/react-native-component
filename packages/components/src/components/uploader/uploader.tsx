import isNil from 'lodash/isNil';
import { isValidElement } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { View, Text, Image } from 'react-native';

import type { UploaderProps, UploaderValue } from './interface';
import UploaderImage from './uploader-image';
import useImageLayout from './useImageLayout';
import { usePersistFn } from '../../hooks';
import { PlusOutline } from '../icons';
import { cn } from '../../lib/utils';

const uploader_image_gap = {
  s: 6,
  m: 10,
  l: 14,
};

/**
 * Uploader 文件上传
 */
const Uploader = <T extends UploaderValue>({
  list,
  maxCount = Number.MAX_SAFE_INTEGER,
  imageComponent = Image,
  deletable = true,
  showUpload = true,
  uploadText,
  uploadIcon,
  onPressUpload,
  colCount = 4,
  colGap = 'm',
  onPressImage,
  onPressDelete,
  onPressError,

  style,
  onLayout,
  ...restProps
}: UploaderProps<T>) => {
  const [onLayoutWrapper, getSizeImage, getMarginImage] = useImageLayout();
  const onLayoutView = usePersistFn((e: LayoutChangeEvent) => {
    onLayoutWrapper(e);
    onLayout?.(e);
  });
  const onPressUploadPersistFn = usePersistFn(() => {
    onPressUpload?.();
  });

  const genOnPressDelete = (item: T, index: number) => () => {
    onPressDelete?.(item, index, list);
  };
  const genOnPressImage = (item: T, index: number) => () => {
    const onPressCallback = item.status === 'error' ? onPressError : onPressImage;

    onPressCallback?.(item, index, list);
  };

  const showUploadButton = showUpload && list.length < maxCount;
  const imageGap = typeof colGap === 'number' ? colGap : uploader_image_gap[colGap];
  const imageSize = getSizeImage(colCount, imageGap);
  const total = (showUploadButton ? 1 : 0) + list.length;

  return (
    <View
      {...restProps}
      style={style}
      className={cn('flex-row flex-wrap', restProps.className)}
      onLayout={onLayoutView}
    >
      {list.map((item, index) => {
        return (
          <UploaderImage
            key={item.key}
            filepath={item.filepath}
            status={item.status}
            imageComponent={imageComponent}
            deletable={isNil(item.deletable) ? deletable : item.deletable}
            size={imageSize}
            marginRight={getMarginImage(total, colCount, index).marginRight ? imageGap : undefined}
            marginBottom={
              getMarginImage(total, colCount, index).marginBottom ? imageGap : undefined
            }
            onPress={genOnPressImage(item, index)}
            onPressDelete={genOnPressDelete(item, index)}
          />
        );
      })}

      {showUpload && list.length < maxCount ? (
        <UploaderImage
          isUpload
          size={imageSize}
          marginBottom={
            getMarginImage(total, colCount, total - 1).marginBottom ? imageGap : undefined
          }
          onPress={onPressUploadPersistFn}
        >
          {isValidElement(uploadIcon) ? (
            uploadIcon
          ) : (
            <PlusOutline color='#8C9199' pointerEvents='none' />
          )}
          <Text className='text-gray-600 text-lg mt-1 text-center'>{uploadText ?? '图片'}</Text>
        </UploaderImage>
      ) : null}
    </View>
  );
};

export default Uploader;
