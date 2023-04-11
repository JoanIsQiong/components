import { View, Image } from '@tarojs/components';

type SvgProps = {
  src: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};
const Svg = (props: SvgProps) => {
  const { src, width, height, color, className } = props;
  return (
    <View
      className={`${className || ''} svgWrap`}
      style={`width: ${Number(width)}rpx; height: ${Number(height)}rpx;overflow: hidden;`}
    >
      <Image
        src={src}
        style={`width: 100%;height: 100%;border-right: ${10 * Number(width) + 300}rpx solid transparent;transform: translateX(-${Number(width)}rpx);filter: drop-shadow(${width}rpx 0 ${color});`}
      />
    </View>
  );
};

export default Svg;
