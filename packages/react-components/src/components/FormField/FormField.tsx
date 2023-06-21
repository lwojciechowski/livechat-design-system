import * as React from 'react';
import cx from 'clsx';
import { Text } from '../Typography';
import { FieldError } from '../FieldError';
import { FieldDescription } from '../FieldDescription';

import styles from './FormField.module.scss';

const baseClass = 'form-field';

export interface FormFieldProps {
  /**
   * Define label text
   */
  labelText?: string;
  /**
   * Renders given element aligned to label, `inline` will affect
   */
  labelAdornment?: React.ReactNode;
  /**
   * Define to associate the label with the field
   */
  labelFor?: string;
  /**
   * The CSS class for field container
   */
  className?: string;
  /**
   * Set the label to inline version
   */
  inline?: boolean;
  /**
   * Define error text
   */
  error?: string;
  /**
   * Define the description text
   */
  description?: React.ReactNode;
  /**
   * Wrapped element
   */
  children?: React.ReactNode;
  /**
   * Renders given element above the filed
   */
  labelRightNode?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  inline,
  error,
  description,
  labelText,
  labelAdornment,
  className,
  labelFor,
  children,
  labelRightNode,
}) => {
  const childrenRef = React.useRef<HTMLDivElement>(null);
  const [labelHeight, setLabelHeight] = React.useState('auto');
  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--inline`]]: inline,
    },
    className
  );

  React.useEffect(() => {
    const div = childrenRef;

    if (inline && div.current) {
      return setLabelHeight(`${div.current.clientHeight}px`);
    }

    return setLabelHeight('auto');
  });

  return (
    <div className={mergedClassNames}>
      {labelRightNode && inline && (
        <React.Fragment>
          <div
            className={cx(
              styles[`${baseClass}__label-right-node`],
              styles[`${baseClass}__label-right-node--inline`]
            )}
          >
            {labelRightNode}
          </div>
          <div className={styles[`${baseClass}__row-break`]} />
        </React.Fragment>
      )}
      <div
        className={cx(
          styles[`${baseClass}__wrapper`],
          inline && styles[`${baseClass}__wrapper--inline`]
        )}
      >
        {(labelText || labelRightNode) && (
          <div
            className={cx(
              styles[`${baseClass}__label`],
              inline && styles[`${baseClass}__label--inline`],
              !labelText && styles[`${baseClass}__label--no-text`]
            )}
          >
            {labelText && (
              <div
                className={cx(
                  styles[`${baseClass}__label-wrapper`],
                  inline && styles[`${baseClass}__label-wrapper--inline`]
                )}
                style={{
                  height: labelHeight,
                }}
              >
                <label
                  className={styles[`${baseClass}__label-left-node`]}
                  htmlFor={labelFor}
                >
                  <Text as="span" size="sm">
                    {labelText}
                  </Text>
                </label>
                {labelAdornment && (
                  <div
                    className={cx(
                      styles[`${baseClass}__label-adornment`],
                      inline && styles[`${baseClass}__label-adornment--inline`]
                    )}
                  >
                    {labelAdornment}
                  </div>
                )}
              </div>
            )}
            {labelRightNode && !inline && (
              <div className={cx(styles[`${baseClass}__label-right-node`])}>
                {labelRightNode}
              </div>
            )}
          </div>
        )}
        <div className={cx(styles[`${baseClass}__content`])}>
          <div ref={childrenRef}>{children}</div>
          {error && <FieldError>{error}</FieldError>}
          {!error && description && (
            <FieldDescription
              className={cx(styles[`${baseClass}__content__description`])}
            >
              {description}
            </FieldDescription>
          )}
        </div>
      </div>
    </div>
  );
};
