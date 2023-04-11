import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import { message } from 'antd';

import { controlPtz } from '@/services/ptz/controlPtz';

import styles from './index.less';

const DirectionControl: FC<{ path: string }> = (props) => {
  const { path } = props;
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const changeDirection = async (direction: number, type: number) => {
    try {
      const res = await controlPtz(
        {
          streamPath: path,
        },
        {
          stream_path: path,
          ptz_type: type,
          speed: 50,
          direction,
        },
      );
      if (res.code === -1) {
        message.error(res.msg);
      }
    } catch (error) {
      // message.error('请求异常')
    }
  };

  const handleDirection = (e: MouseEvent, type: number) => {
    e.stopImmediatePropagation();
    const direction = Number((e.currentTarget as HTMLElement).getAttribute('data-direction'));
    changeDirection(direction, type);
  };

  useEffect(() => {
    [topRef.current, rightRef.current, bottomRef.current, leftRef.current].forEach((item) => {
      item?.addEventListener('mousedown', (e) => handleDirection(e, 1), true);
      item?.addEventListener('mouseup', (e) => handleDirection(e, 0), true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.controlWrap} onClick={(e) => e.stopPropagation()}>
        <div className={styles.toTop} data-direction={0} ref={topRef}>
          <CaretUpOutlined className={styles.fs_80} style={{ color: '#fff' }} />
        </div>
        <div className={styles.toRight} data-direction={2} ref={rightRef}>
          <CaretRightOutlined className={styles.fs_80} style={{ color: '#fff' }} />
        </div>
        <div className={styles.toBottom} data-direction={4} ref={bottomRef}>
          <CaretDownOutlined className={styles.fs_80} style={{ color: '#fff' }} />
        </div>
        <div className={styles.toLeft} data-direction={6} ref={leftRef}>
          <CaretLeftOutlined className={styles.fs_80} style={{ color: '#fff' }} />
        </div>
        <div className={styles.center} />
      </div>
    </>
  );
};

export default DirectionControl;
