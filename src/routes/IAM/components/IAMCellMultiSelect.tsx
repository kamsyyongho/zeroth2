import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { CellProps } from 'react-table';
import { I18nContext } from '../../../hooks/i18n/I18nContext';
import { Role, User } from '../../../types';
import { ParsedRolesById, SelectedRoleIdsByIndex } from './IAMTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAMCellMultiSelectProps {
  cellData: CellProps<User>
  availableRoles: Role[]
  parsedRolesById: ParsedRolesById
  selectedRoles: SelectedRoleIdsByIndex
  onRoleCheck: (userIndex: number, value: number[]) => void
}

export function IAMCellMultiSelect(props: IAMCellMultiSelectProps) {
  const { cellData, availableRoles, selectedRoles, parsedRolesById, onRoleCheck } = props
  const { translate } = React.useContext(I18nContext);

  const userRoles: User["roles"] = cellData.cell.value;
  const index = cellData.cell.row.index;
  const key = `${index}-roles`;

  const initialSelectedRoleIds: number[] = React.useMemo(
    () => {
      if (!userRoles.length) {
        return []
      }
      return userRoles.map(role => role.id);
    }, []);

  let defaultState: number[] | undefined;
  if (selectedRoles[index] && selectedRoles[index] instanceof Array) {
    defaultState = selectedRoles[index];
  }

  const classes = useStyles();
  const theme = useTheme();
  const [userselectedRoles, setUserSelectedRoles] = React.useState<number[]>(defaultState || initialSelectedRoleIds);

  const joinSelectedText = (selected: number[]) => {
    const selectedRoleNames: string[] = (selected).map(selectedId => (parsedRolesById[selectedId] && parsedRolesById[selectedId].name) || "")
    return selectedRoleNames.join(', ')
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number[]
    setUserSelectedRoles(value);
  };

  const handleClose = (event: React.ChangeEvent<{}>) => {
    onRoleCheck(index, userselectedRoles);
  };

  const renderMenuItems = () => {
    return availableRoles.map(role => {
      const { id, name } = role;
      return (
        <MenuItem key={id} value={id}>
          <Checkbox checked={userselectedRoles.includes(id)} />
          <ListItemText primary={name} />
        </MenuItem>
      )
    })
  }

  return (
    <FormControl className={classes.formControl} key={key} >
      <InputLabel htmlFor="select-multiple-checkbox">{translate("IAM.roles")}</InputLabel>
      <Select
        multiple
        value={userselectedRoles}
        onChange={handleChange}
        onClose={handleClose}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={(selected) => joinSelectedText(selected as number[])}
        MenuProps={MenuProps}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
}