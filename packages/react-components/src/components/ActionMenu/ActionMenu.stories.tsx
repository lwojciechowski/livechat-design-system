import * as React from 'react';

import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';

import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { RadioButton } from '../RadioButton';
import { Switch } from '../Switch';

import { ActionMenu } from './ActionMenu';
import { ActionMenuItem } from './ActionMenuItem';
import { exampleOptions } from './constants';

import './ActionMenu.stories.css';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  subcomponents: {
    ActionMenuItem,
  },
};

export const Default = (): React.ReactElement => (
  <div className="action-menu-preview">
    <ActionMenu
      options={exampleOptions}
      triggerClassName="action-menu-button"
      triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
      openedOnInit
    />
  </div>
);

export const KeepOpenOnItemClick = (): React.ReactElement => {
  const [radioButtonValue, setRadioButtonValue] = React.useState('one');
  const [switchOneValue, setSwitchOneValue] = React.useState(true);
  const [switchTwoValue, setSwitchTwoValue] = React.useState(false);
  const [checkboxOneValue, setCheckboxOneValue] = React.useState(true);
  const [checkboxTwoValue, setCheckboxTwoValue] = React.useState(true);
  const [activeOptionsKeys, setActiveOptionsKeys] = React.useState([
    'one',
    'three',
    'five',
    'six',
  ]);

  const handleOptionSelect = (
    key: string,
    type: string,
    optionHandler: void
  ) => {
    const newActiveOptions = activeOptionsKeys;

    if (type === 'radio') {
      if (!activeOptionsKeys.includes(key)) {
        const keyToRemove = key === 'one' ? 'two' : 'one';
        const index = activeOptionsKeys.indexOf(keyToRemove);
        newActiveOptions.splice(index, 1);
        setActiveOptionsKeys([...newActiveOptions, key]);
      }
    }

    if (type === 'switch' || type === 'checkbox') {
      if (activeOptionsKeys.includes(key)) {
        const index = activeOptionsKeys.indexOf(key);
        newActiveOptions.splice(index, 1);
        setActiveOptionsKeys([...newActiveOptions]);
      } else {
        activeOptionsKeys.push(key);
      }
    }

    return optionHandler;
  };

  return (
    <div className="action-menu-preview">
      <ActionMenu
        activeOptionKeys={activeOptionsKeys}
        triggerClassName="action-menu-button"
        options={[
          {
            key: 'group-1',
            element: 'Group 1',
            groupHeader: true,
          },
          {
            key: 'one',
            element: (
              <ActionMenuItem>
                <RadioButton checked={radioButtonValue === 'one'}>
                  Radio label one
                </RadioButton>
              </ActionMenuItem>
            ),
            onClick: () =>
              handleOptionSelect('one', 'radio', setRadioButtonValue('one')),
          },
          {
            key: 'two',
            element: (
              <ActionMenuItem>
                <RadioButton checked={radioButtonValue === 'two'}>
                  Radio label two
                </RadioButton>
              </ActionMenuItem>
            ),
            onClick: () =>
              handleOptionSelect('two', 'radio', setRadioButtonValue('two')),
          },
          {
            key: 'three',
            withDivider: true,
            element: (
              <ActionMenuItem
                rightNode={
                  <Switch on={switchOneValue} state="regular" size="medium" />
                }
              >
                Toggle label one
              </ActionMenuItem>
            ),
            onClick: () =>
              handleOptionSelect(
                'three',
                'switch',
                setSwitchOneValue((s) => !s)
              ),
          },
          {
            key: 'four',
            withDivider: true,
            element: (
              <ActionMenuItem
                rightNode={
                  <Switch on={switchTwoValue} state="regular" size="medium" />
                }
              >
                Toggle label two
              </ActionMenuItem>
            ),
            onClick: () =>
              handleOptionSelect(
                'four',
                'switch',
                setSwitchTwoValue((s) => !s)
              ),
          },
          {
            key: 'group-2',
            element: 'Group 2',
            groupHeader: true,
          },
          {
            key: 'five',
            element: (
              <ActionMenuItem
                leftNode={
                  <Checkbox checked={checkboxOneValue}>
                    Checkbox label one
                  </Checkbox>
                }
              />
            ),
            onClick: () =>
              handleOptionSelect(
                'five',
                'checkbox',
                setCheckboxOneValue((s) => !s)
              ),
          },
          {
            key: 'six',
            element: (
              <ActionMenuItem
                leftNode={
                  <Checkbox checked={checkboxTwoValue}>
                    Checkbox label two
                  </Checkbox>
                }
              />
            ),
            onClick: () =>
              handleOptionSelect(
                'six',
                'checkbox',
                setCheckboxTwoValue((s) => !s)
              ),
          },
        ]}
        triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
        openedOnInit
        keepOpenOnClick
      />
    </div>
  );
};
