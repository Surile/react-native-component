import isNil from 'lodash/isNil';
import { useMemo } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { View, Text, Image } from 'react-native';

import type { UploaderRegularProps, UploaderValue, RegularCount } from './interface';
import UploaderImage from './uploader-image';
import useImageLayout from './useImageLayout';
import { PlusOutline } from '../icons';
import { usePersistFn } from '../../hooks';
import { cn } from '../../lib/utils';

const uploader_image_gap = {
  s: 6,
  m: 10,
  l: 14,
};

const UploaderRegular = <T extends UploaderValue>({
  list,
  imageComponent = Image,
  colCount = 4,
  colGap = 'm',
  onPressImage,
  onPressDelete,
  onPressError,
  count,
  onPressUpload,
  deletable = true,

  style,
  onLayout,
  ...restProps
}: UploaderRegularProps<T>) => {
  const [onLayoutWrapper, getSizeImage, getMarginImage] = useImageLayout();

  const onLayoutView = usePersistFn((e: LayoutChangeEvent) => {
    onLayoutWrapper(e);
    onLayout?.(e);
  });

  const showList = useMemo(() => {
    return (
      (typeof count === 'number' ? new Array(count).fill(null) : count) as (RegularCount | null)[]
    ).map((item, index) => {
      const _i = item || {};
      const text = _i.text ?? '图片';
      const icon = _i.icon || <PlusOutline color={'#8C9199'} pointerEvents='none' />;
      const data = list[index];

      return {
        text,
        icon,
        data,
      };
    });
  }, [count, list]);

  const genOnPressDelete = (item: T, index: number) => () => {
    onPressDelete?.(item, index, list);
  };
  const genOnPressImage = (item: T, index: number) => () => {
    const onPressCallback = item.status === 'error' ? onPressError : onPressImage;

    onPressCallback?.(item, index, list);
  };
  const genOnPressUpload = (index: number) => () => {
    onPressUpload?.(index);
  };

  const imageGap = typeof colGap === 'number' ? colGap : uploader_image_gap[colGap];
  const imageSize = getSizeImage(colCount, imageGap);
  const total = showList.length;

  return (
    <View
      {...restProps}
      style={style}
      className={cn('flex-row flex-wrap', restProps.className)}
      onLayout={onLayoutView}
    >
      {showList.map((item, index) => {
        if (item.data) {
          return (
            <UploaderImage
              key={item.data?.key || index}
              filepath={item.data.filepath}
              status={item.data.status}
              imageComponent={imageComponent}
              deletable={isNil(item.data?.deletable) ? deletable : item.data.deletable}
              size={imageSize}
              marginRight={
                getMarginImage(total, colCount, index).marginRight ? imageGap : undefined
              }
              marginBottom={
                getMarginImage(total, colCount, index).marginBottom ? imageGap : undefined
              }
              onPress={genOnPressImage(item.data, index)}
              onPressDelete={genOnPressDelete(item.data, index)}
            />
          );
        }

        return (
          <UploaderImage
            isUpload
            key={index}
            size={imageSize}
            marginRight={getMarginImage(total, colCount, index).marginRight ? imageGap : undefined}
            marginBottom={
              getMarginImage(total, colCount, index).marginBottom ? imageGap : undefined
            }
            onPress={genOnPressUpload(index)}
          >
            {item.icon}
            <Text className='text-gray-600 text-lg mt-1 text-center'>{item.text}</Text>
          </UploaderImage>
        );
      })}
    </View>
  );
};

export default UploaderRegular;
