/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// import Select from './Select';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { OutlinedInput as MuiOutlinedInput } from '@material-ui/core';
import ToggleOption from '../ToggleOption';

const OutlinedInput = withStyles(() => ({
  notchedOutline: {
    borderColor: 'white !important',
  },
}))(MuiOutlinedInput);

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }
  return (
    <FormControl variant="outlined" style={{ minWidth: 120, border: '0px' }}>
      <Select
        native
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.value}
        onChange={props.onToggle}
        input={<OutlinedInput label="Label" />}
      >
        {content}
      </Select>
    </FormControl>
  );
}
Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
