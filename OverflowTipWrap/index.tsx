import { useEffect, useRef, useState } from 'react';

import { DoubleRightOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';
import classNames from 'classnames';

import styles from './index.less';

enum DIFPOSITION {
  TOP,
  CENTER,
  BOTTOM,
}
const OverflowTipWrap = (props: { className: string; children: React.ReactNode }) => {
  const actionRef = useRef<HTMLDivElement>(null);
  const { className, children } = props;
  const [isShow, setShow] = useState<boolean>();
  const [isBottom, setBottom] = useState<boolean>();
  const getPosition = (scrollTop: number, scrollHeight: number, clientHeight: number) => {
    const dif = scrollHeight - scrollTop;
    // console.log(`scrollTop:${scrollTop}`, `scrollHeight:${scrollHeight}`, `scrollHeight-scrollTop:${dif}`, `clientHeight:${clientHeight}`);
    if (scrollTop < 10) return DIFPOSITION.TOP;
    if (dif - clientHeight < 10) return DIFPOSITION.BOTTOM;
    return DIFPOSITION.CENTER;
  };
  const handleShow = () => {
    if (actionRef.current) {
      const isOverflow = actionRef.current.clientHeight < actionRef.current.scrollHeight;
      setShow(isOverflow);
    }
  };
  const handlePosition = () => {
    if (actionRef.current) {
      const position = getPosition(
        actionRef.current.scrollTop,
        actionRef.current.scrollHeight,
        actionRef.current.clientHeight,
      );
      if (position === DIFPOSITION.TOP) setBottom(false);
      if (position === DIFPOSITION.BOTTOM) setBottom(true);
    }
  };
  const handleClick = () => {
    if (actionRef.current) {
      isBottom
        ? (actionRef.current.scrollTop = 0)
        : (actionRef.current.scrollTop =
          actionRef.current.scrollHeight - actionRef.current.clientHeight);
    }
    handlePosition();
  };
  useEventListener(
    'resize',
    () => {
      handleShow();
    },
    { target: window },
  );
  useEventListener(
    'mousewheel',
    () => {
      handlePosition();
    },
    { target: window.document },
  );

  useEffect(() => {
    if (children) {
      handleShow();
    }
  }, [children]);

  return (
    <div className={className} ref={actionRef}>
      {children}
      <div className={isShow ? styles.moreWrap : styles.noMore}>
        <div onClick={handleClick}>
          <DoubleRightOutlined
            className={classNames(styles.moreIcon, { [styles.toTop]: isBottom })}
            style={{ color: '#fff' }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverflowTipWrap;
