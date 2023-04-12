import cx from 'clsx';
import { createElement, FC } from 'react';

import styles from './Typography.module.scss';

type TSize = 'md' | 'sm' | 'xs';

interface IProps {
  /** DOM element name that will be rendered */
  as?: string;
  size?: TSize;
  /** Optional custom className */
  className?: string;
  caps?: boolean;
  bold?: boolean;
  underline?: boolean;
  strike?: boolean;
}

export const Text: FC<IProps> = ({
  as = 'p',
  size = 'md',
  caps = false,
  bold = false,
  underline = false,
  strike = false,
  children,
  className,
  ...props
}) => {
  const baseClassPrefix = caps ? 'caps' : `paragraph-${size}`;

  return createElement(
    as,
    {
      className: cx(
        {
          [styles[`${baseClassPrefix}`]]: true,
          [styles[`${baseClassPrefix}--bold`]]: bold,
          [styles[`${baseClassPrefix}--strike`]]: strike,
          [styles[`${baseClassPrefix}--underline`]]: underline,
        },
        className
      ),
      ...props,
    },
    children
  );
};
