import React, { memo } from 'react';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import type { SidebarProps } from './interface';
import { useControllableValue } from '../../hooks';
import { cn } from '../../lib/utils';
import Badge from '../badge';
import Loading from '../loading';
import Result from '../result';
import ResultIconEmpty from '../result/icons/result-icon-empty';

const Sidebar: React.FC<SidebarProps> = ({
  className,
  loading,
  options,
  empty,
  renderItem,
  itemClassName,
  activeItemClassName,
  showIndicator = true,
  underlayColor = '#EDEFF2',
  ...restProps
}) => {
  const [value, onChange] = useControllableValue(restProps, {
    valuePropName: 'activeValue',
    defaultValuePropName: 'defaultActiveValue',
  });

  const isEmpty = loading || options.length === 0;
  const curIndex = options.findIndex((o) => o.value === value);

  return (
    <View
      {...restProps}
      className={cn(
        'flex-1 w-[88px]',
        {
          'bg-[#EDEFF2]': isEmpty,
        },
        className
      )}
    >
      <ScrollView
        bounces={false}
        contentContainerClassName={cn(isEmpty ? 'flex-1 items-center justify-center' : '')}
      >
        {loading ? <Loading vertical>加载中...</Loading> : null}

        {!loading && options.length === 0 ? (
          isUndefined(empty) ? (
            <Result
              status='warning'
              subtitle='暂无数据'
              renderIcon={() => {
                return <ResultIconEmpty width={60} height={60} />;
              }}
            />
          ) : (
            empty
          )
        ) : null}

        {!loading && options.length > 0 ? (
          <View className={cn('bg-white', itemClassName)}>
            {options.map((item, index) => {
              const isActive = value === item.value;
              const isPrev = index + 1 === curIndex;
              const isNext = index - 1 === curIndex;
              const textJSX = renderItem ? (
                renderItem(item, isActive)
              ) : (
                <Text
                  className={cn('text-[14px] leading-[20px]', {
                    'text-[#11151A]': isActive,
                    'text-[#5A6068]': !isActive,
                    'text-[#B9BEC5]': item.disabled,
                  })}
                >
                  {item.label}
                </Text>
              );

              return (
                <TouchableHighlight
                  key={item.value}
                  underlayColor={underlayColor}
                  onPress={() => {
                    onChange(item.value);
                  }}
                  disabled={item.disabled}
                  className={cn(
                    'overflow-hidden flex-row ',
                    {
                      'bg-[#EDEFF2]': isActive,
                      'rounded-br-lg': isPrev,
                      'rounded-tr-lg': isNext,
                    },
                    isActive && activeItemClassName ? activeItemClassName : ''
                  )}
                >
                  <View className='flex-1'>
                    {showIndicator && isActive ? (
                      <View className='absolute left-[-3px] top-1/2 mt-[-13px] h-6.5 w-1.5 rounded bg-primary' />
                    ) : null}

                    <View className='p-3'>
                      {!isNil(item.badge) ? <Badge {...item.badge}>{textJSX}</Badge> : textJSX}
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default memo(Sidebar);
