import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';

import { useDebounce } from '../../hooks/useDebounce';

import { Formatter, numberParser } from './utils';

const FormItem = Form.Item;
const TIMEOUT = 1000;

function Input({
  label,
  description,
  mask,
  onChange = () => null,
  defaultValue = null,
}) {
  const [value, setValue] = useState(defaultValue);
  
  const debounced = useDebounce(value, TIMEOUT);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <FormItem
      className="leading-4 md:mb-0" 
      label={
        <span className="text-xs font-medium text-black-900">{ label }</span>
      }
    >
      <InputNumber
        className="w-full text-xs bg-gray-200 border-gray-300 rounded py-1 mb-2"
        formatter={value => mask ? Formatter(mask)(value) : value}
        parser={(value) => mask ? numberParser(value) : value}
        onChange={value => setValue(value)}
      />
      <span className="text-[10.5px] font-normal text-black-700">
        { description }
      </span>
    </FormItem>
  )
};

Input.propTypes = {
  defaultValue: PropTypes.number,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  mask: PropTypes.oneOf(['currency', 'percentage', 'default']),
};

export default Input;
