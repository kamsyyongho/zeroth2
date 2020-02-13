import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CellProps, useTable } from 'react-table';
import React from 'reactn';
import { I18nContext } from '../../../../hooks/i18n/I18nContext';
import { Role, ROLES, User } from '../../../../types';
import { CheckedUsersByUserId } from '../../UsersSummary';
import { UsersCellCheckbox } from './UsersCellCheckbox';
import { UsersCellMultiSelect } from './UsersCellMultiSelect';
import { UsersCellResetPasswordButton } from './UsersCellResetPasswordButton';
import { UsersCellSubmitButton } from './UsersCellSubmitButton';
import { UsersHeaderCheckbox } from './UsersHeaderCheckbox';
import UsersTableHeaderActions from './UsersTableHeaderActions';

const HEADER_ACTIONS = 'actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      backgroundColor: theme.palette.background.paper,
    },
  }));

export interface UsersTableProps {
  users: User[];
  roles: Role[];
  setCheckedUsers: React.Dispatch<React.SetStateAction<CheckedUsersByUserId>>;
  handleUpdateSuccess: (updatedUser: User) => void;
  onTranscriberAssign: () => void;
  usersToDelete: string[];
  confirmDelete: () => void;
  handleInviteOpen: () => void;
  deleteLoading: boolean;
}

export interface ParsedRolesById {
  [id: string]: Role;
}

export interface SelectedRoleIdsByIndex {
  [index: number]: string[];
}


export function UsersTable(props: UsersTableProps) {
  const {
    users,
    roles,
    setCheckedUsers,
    handleUpdateSuccess,
    onTranscriberAssign,
    usersToDelete,
    confirmDelete,
    handleInviteOpen,
    deleteLoading,
  } = props;

  const classes = useStyles();

  // used in the multi-select to quicly access the role by id 
  const parsedRolesById: ParsedRolesById = {};
  roles.forEach(role => parsedRolesById[role.id] = role);

  // used to determine if the transcriber role has
  // changed so we can refetch the transcriber list
  const transcriberRoleId = React.useMemo(() => {
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (role.name === ROLES.transcriber) {
        return role.id;
      }
    }
    return '';
  }, []);

  const { translate, language } = React.useContext(I18nContext);
  const [allChecked, setAllChecked] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = React.useState<SelectedRoleIdsByIndex>({});

  const handleUserCheck = (userId: string, value: boolean): void => {
    setCheckedUsers((prevCheckedUsers) => {
      return { ...prevCheckedUsers, [userId]: value };
    });
  };

  const handleRoleCheck = (userIndex: number, value: string[]): void => {
    setSelectedRoles((prevSelectedRoles) => {
      return { ...prevSelectedRoles, [userIndex]: value };
    });
  };

  const onUpdateRoleSuccess = (updatedUser: User, userIndex: number): void => {
    handleUpdateSuccess(updatedUser);
    const currentRoles = updatedUser.roles.map(role => role.id);
    setSelectedRoles((prevSelectedRoles) => {
      return { ...prevSelectedRoles, [userIndex]: currentRoles };
    });
  };

  // define the logic and what the columns should render
  const columns = React.useMemo(
    () => [
      {
        Header: <UsersHeaderCheckbox onCheck={setAllChecked} disabled={users.length < 2} />,
        accessor: 'email',
        Cell: (data: CellProps<User>) => UsersCellCheckbox({ cellData: data, onUserCheck: handleUserCheck, allChecked }),
      },
      {
        Header: `${translate("IAM.roles")}`,
        accessor: 'roles',
        Cell: (data: CellProps<User>) => UsersCellMultiSelect({ cellData: data, availableRoles: roles, parsedRolesById, onRoleCheck: handleRoleCheck, selectedRoles }),
      },
      {
        id: 'submit',
        Header: null,
        accessor: (row: User) => row,
        Cell: (data: CellProps<User>) => UsersCellSubmitButton({ cellData: data, selectedRoles, onUpdateRoleSuccess, transcriberRoleId, onTranscriberAssign }),
      },
      {
        id: HEADER_ACTIONS,
        Header: null,
        accessor: (row: User) => row,
        Cell: (data: CellProps<User>) => UsersCellResetPasswordButton({ cellData: data }),
      },
    ],
    [users, roles, language, allChecked, selectedRoles]
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<User>({
    columns,
    data: users,
  });

  // Render the UI for your table
  const renderHeader = () => headerGroups.map((headerGroup, index) => (
    <TableRow key={`headerGroup-${index}`} {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column, idx) => {
        if (column.id === HEADER_ACTIONS) {
          return (<TableCell key={`column-${idx}`} {...column.getHeaderProps()}>
            <UsersTableHeaderActions
              users={users}
              usersToDelete={usersToDelete}
              confirmDelete={confirmDelete}
              handleInviteOpen={handleInviteOpen}
              deleteLoading={deleteLoading}
            />
          </TableCell>);
        } else {
          return (<TableCell key={`column-${idx}`} {...column.getHeaderProps()}>
            {column.render('Header')}
          </TableCell>);
        }
      })}
    </TableRow>
  ));

  const renderRows = () => rows.map(
    (row, rowIndex) => {
      prepareRow(row);
      return (
        <TableRow key={`row-${rowIndex}`} {...row.getRowProps()}>
          {row.cells.map((cell, cellIndex) => {
            return (
              <TableCell key={`cell-${cellIndex}`} {...cell.getCellProps()}>
                {cell.render('Cell')}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

  return (
    <Table stickyHeader {...getTableProps()} className={classes.table} >
      <TableHead>
        {renderHeader()}
      </TableHead>
      <TableBody>
        {renderRows()}
      </TableBody>
    </Table>
  );
}


