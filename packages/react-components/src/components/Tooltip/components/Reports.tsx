import * as React from 'react';

import styles from '../Tooltip.module.scss';
import { Text } from '../../Typography';

export interface IReportsProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const baseClass = 'reports-tooltip';

export const Reports: React.FC<IReportsProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className={styles[baseClass]}>
      <div className={styles[`${baseClass}__heading`]}>
        <Text as="div" className={styles[`${baseClass}__heading__title`]}>
          {title}
        </Text>
        <Text
          as="div"
          size="xs"
          className={styles[`${baseClass}__heading__description`]}
        >
          {description}
        </Text>
      </div>
      <div className={styles[`${baseClass}__content`]}>
        <Text as="div">{children}</Text>
      </div>
    </div>
  );
};
