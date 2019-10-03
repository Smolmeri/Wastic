import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item, Label, View} from 'native-base';


const FormTextInput = (props) => {
  const {error, ...otherProps} = props;
  return (
    <View>
      <Item>
        <Input {...otherProps} />
      </Item>
      {error && <Label>{error}</Label>}
    </View>
  );
};

FormTextInput.propTypes = {
  error: PropTypes.string,
};

export default FormTextInput;