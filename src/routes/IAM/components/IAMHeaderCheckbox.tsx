import { FormControlLabel, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { I18nContext } from '../../../hooks/i18n/I18nContext';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAMHeaderCheckboxProps {
  onCheck: (value: boolean) => void
  disabled?: boolean;
}
export function IAMHeaderCheckbox(props: IAMHeaderCheckboxProps) {
  const { onCheck, disabled } = props;
  const { translate } = React.useContext(I18nContext);
  const [isChecked, setIsChecked] = React.useState(false);
  if(disabled) {
    return <Typography>{translate("IAM.user")}</Typography>
  }

  return <FormControlLabel
    control={
      <Checkbox
        checked={isChecked}
        value="checkedB"
        color="secondary"
        onChange={(event) => {
          onCheck(event.target.checked);
          setIsChecked(event.target.checked);
        }}
      />
    }
    label={translate("IAM.user")}
  />
}

