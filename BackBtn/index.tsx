import { history } from 'umi';

import { useEventListener } from 'ahooks';

import s from './index.less';

const BackBtn = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  const params = new URLSearchParams(history.location.search);
  // console.log(params.get('from'));
  const backToFrom = () => {
    location.href = params.get('from')!;
  };
  useEventListener(
    'keyup',
    (e) => {
      if (e.code === 'Escape') {
        params.get('from') && backToFrom();
        onClick && onClick();
      }
    },
    { target: document },
  );

  return (
    <>
      {params.get('from') || onClick ? (
        <div className={s.close}>
          <span className={s.backBtn} onClick={onClick || backToFrom} />
        </div>
      ) : null}
    </>
  );
};

export default BackBtn;
