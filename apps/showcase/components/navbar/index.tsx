import React, { memo } from 'react';
import isNil from 'lodash/isNil';
import { TouchableOpacity, View } from 'react-native';
import { NavBarProps } from './interface';
import { renderTextLikeJSX } from '../../helpers';
import { cn } from '../../lib/utils';
import Divider from '../divider';
import { ArrowLeftOutline } from '../icons';

const BACK_ARROW_HIT_SLOP = {
  left: 10,
  right: 10,
};

/**
 * NavBar 导航栏
 */
const NavBar: React.FC<NavBarProps> = ({
  testID,
  className,
  leftClassName,
  rightClassName,
  titleTextClassName,
  title,
  leftExtra,
  rightExtra,
  showBackArrow = true,
  divider = true,
  onPressBackArrow,
}) => {
  const titleJSX = renderTextLikeJSX(
    title,
    cn('text-2xl text-center text-[#11151A] font-bold', titleTextClassName)
  );

  return (
    <>
      <View
        className={cn('relative h-[44px] w-full justify-center px-4 bg-white', className)}
        testID={testID}
      >
        {showBackArrow || !isNil(leftExtra) ? (
          <View
            className={cn('absolute inset-y-0 left-4 z-[3] flex-row items-center', leftClassName)}
          >
            {showBackArrow ? (
              <TouchableOpacity
                className='h-12 justify-center text-base text-[#11151A]'
                onPress={onPressBackArrow}
                activeOpacity={0.8}
                hitSlop={BACK_ARROW_HIT_SLOP}
              >
                <ArrowLeftOutline />
              </TouchableOpacity>
            ) : null}

            {leftExtra}
          </View>
        ) : null}

        {!isNil(rightExtra) ? (
          <View
            className={cn('absolute inset-y-0 right-4 z-[3] flex-row items-center', rightClassName)}
          >
            {rightExtra}
          </View>
        ) : null}

        {titleJSX}
      </View>
      {divider ? <Divider /> : null}
    </>
  );
};

export default memo(NavBar);
