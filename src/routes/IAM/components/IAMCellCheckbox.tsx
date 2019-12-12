import { FormControlLabel, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { CellProps } from 'react-table';
import { KeycloakContext } from '../../../hooks/keycloak/KeycloakContext';
import { User } from '../../../types';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAMCellCheckboxProps {
  cellData: CellProps<User>;
  onUserCheck: (userId: string, value: boolean) => void;
  allChecked: boolean;
}

export function IAMCellCheckbox(props: IAMCellCheckboxProps) {
  const { cellData, onUserCheck, allChecked } = props;
  const { user } = React.useContext(KeycloakContext);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheck = (userId: string, value: boolean) => {
    onUserCheck(userId, value);
    setIsChecked(value);
  };

  const email: User["email"] = cellData.cell.value;
  const cellUser: User = cellData.cell.row.original;
  const index = cellData.cell.row.index;
  const key = `${index}-email:${email}`;

  React.useEffect(() => {
    handleCheck(cellUser.id, allChecked);
  }, [allChecked]);

  if (cellUser.email === email) {
    return <Typography>{email}</Typography>;
  }

  return <FormControlLabel
    key={key}
    control={
      <Checkbox
        checked={isChecked}
        value="checkedB"
        color="secondary"
        onChange={(event) => handleCheck(cellUser.id, event.target.checked)}
      />
    }
    label={email}
  />;
}

