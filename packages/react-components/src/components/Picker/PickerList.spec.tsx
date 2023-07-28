import * as React from 'react';

import userEvent from '@testing-library/user-event';

import { render, vi } from 'test-utils';

import noop from '../../utils/noop';

import { defaultPickerOptions } from './constants';
import { IPickerListProps, PickerList } from './PickerList';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = () => {};

const defaultProps = {
  isOpen: false,
  items: defaultPickerOptions,
  selectedItemsKeys: null,
  onClose: () => noop,
  onSelect: () => noop,
  onSelectAll: () => noop,
};

const renderComponent = (props: IPickerListProps) => {
  return render(<PickerList {...props} />);
};

describe('<PickerList> component', () => {
  it('should not render PickerList if not isOpen', () => {
    const { container } = renderComponent(defaultProps);

    expect(container.firstChild).toBeNull();
  });

  it('should render PickerList if isOpen', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isOpen: true,
    });

    expect(container.firstChild).toBeVisible();
  });

  it('should call onSelect when list item clicked', () => {
    const onSelect = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      onSelect,
    });

    userEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith({
      key: 'three',
      name: 'Option three',
    });
  });

  it('should mark selected list item as selected', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isOpen: true,
      selectedItemsKeys: ['three'],
    });

    expect(getByTestId('three')).toHaveAttribute('aria-selected', 'true');
  });

  it('should mark selected list item as disabled', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [{ key: 'three', name: 'Option three', disabled: true }],
    });

    expect(getByTestId('three')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should display default empty state if no filter result', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [],
    });

    expect(getByText('No results found')).toBeVisible();
  });

  it('should display custom empty state if no filter result', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [],
      emptyStateText: 'Custom empty state',
    });

    expect(getByText('Custom empty state')).toBeVisible();
  });

  it('should display "Select all" option in multiselect mode if this option text is given', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      isMultiSelect: true,
      selectAllOptionText: 'Select all',
    });

    expect(getByText('Select all')).toBeVisible();
  });

  it('should display custom components as options', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [
        {
          key: 'custom-one',
          name: 'Custom one',
          customElement: {
            listItemBody: <div>List custom one</div>,
            selectedItemBody: <div>Selected custom one</div>,
          },
        },
        {
          key: 'custom-two',
          name: 'Custom two',
          customElement: {
            listItemBody: <div>List custom two</div>,
            selectedItemBody: <div>Selected custom two</div>,
          },
        },
      ],
    });

    expect(getByText('List custom one')).toBeVisible();
    expect(getByText('List custom two')).toBeVisible();
  });
});
