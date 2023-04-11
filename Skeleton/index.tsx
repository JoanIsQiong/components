import {} from 'react';
import Taro from '@tarojs/taro';

import { View, Block } from '@tarojs/components';
import classnames from 'classnames';
import './index.less';

interface RowProps  {
    width: string | number;
    height: string | number;
  }
interface SkeletonProps {
  type?: 'row' | 'column';
  animate?: boolean;
  row?: number;
  title?: boolean;
  titleWidth?: string | number;
  animateName?: 'blink' | 'elastic';
  rowWidth?: number | string | (number | string)[];
  rowHeight?: number | string | (number | string)[];
  rowProps?: RowProps | RowProps[]
  className?: string;
  loading?: boolean;
  avatar?: boolean;
  avatarShape?: 'round' | 'square';
  avatarSize?: string | number;
  designWidth?: number;
  children?: JSX.Element;
}

const Skeletons = (props: SkeletonProps) => {
  const {
    children,
    loading,
    className,
    avatar,
    avatarShape = 'round',
    avatarSize = '100%',
    animate = true,
    animateName = 'blink',
    designWidth = 375,
    title,
    titleWidth = '100%',
    rowWidth = '100%',
    rowHeight = 24,
    rowProps,
    type = 'row',
    row = 0,
  } = props;

  if (!loading) {
    return <Block>{children}</Block>;
  }
  const getRowWidth = (index: number) => {
    if (rowProps) {
      if (Array.isArray(rowProps)) {
        return rowProps[index].width
      }
      return rowProps.width
    }
    if (Array.isArray(rowWidth)) {
      return rowWidth[index]
    }
    return rowWidth
  }

  const getRowHeight = (index: number) => {
    if (rowProps) {
      if (Array.isArray(rowProps)) {
        return rowProps[index].height
      }
      return rowProps.height
    }

    if (Array.isArray(rowHeight)) {
      return rowHeight[index]
    }
    return rowHeight
  }
  const addUnit = (value?: string | number) => {
    return typeof value === 'number'
      ? Taro.pxTransform(value, designWidth)
      : value;
  };
  const renderAvatar = (): JSX.Element | null => {
    if (avatar) {
      const avatarClass = classnames('skeleton-avatar', {
        'skeleton-avatar-round': avatarShape === 'round',
      });
      return (
        <View
          className={avatarClass}
          style={{ width: addUnit(avatarSize), height: addUnit(avatarSize) }}
        />
      );
    }
    return null;
  };
  const renderTitle = (): JSX.Element | null => {
    if (title) {
      return <View className='skeleton-title' style={{width: addUnit(titleWidth)}}></View>
    }
    return null
  }
  const renderRows = (): JSX.Element | null => {
    if (row) {
      const rowArray = Array.apply(null, Array(row)).map((_, index) => index)
      const Rows = rowArray.map((item, index) => {
        return <View key={item} className='skeleton-row' 
        style={{width: addUnit(getRowWidth(index)),height:addUnit(getRowHeight(index))}}/>
      })
      return <View className='skeleton-rows'>{Rows}</View>
    }
    return null
  }
  const rootClass = classnames('skeleton', className, {
    [`skeleton-type-${type}`]: true,
    'skeleton-animate-blink': animate && animateName === 'blink',
    'skeleton-animate-elastic': animate && animateName === 'elastic'
  })
  return <View className={rootClass}>
      {renderAvatar()}
      {renderTitle()}
      {renderRows()}
      </View>;
};
export default Skeletons;
