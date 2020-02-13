import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { BulletList } from 'react-content-loader';
import React from 'reactn';
import { ApiContext } from '../../hooks/api/ApiContext';
import { I18nContext } from '../../hooks/i18n/I18nContext';
import { KeycloakContext } from '../../hooks/keycloak/KeycloakContext';
import { deleteUserResult, ProblemKind, ServerError } from '../../services/api/types';
import { Role, SNACKBAR_VARIANTS, User } from '../../types';
import log from '../../util/log/logger';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { Forbidden } from '../shared/Forbidden';
import { InviteFormDialog } from './components/users/InviteFormDialog';
import { UsersTable } from './components/users/UsersTable';


export interface CheckedUsersByUserId {
  [index: string]: boolean;
}

export interface UserEmailsByUserId {
  [index: string]: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      backgroundColor: theme.palette.background.default,
    },
    cardContent: {
      padding: 0,
    },
  }),
);

interface UsersSummaryProps {
  hasAccess: boolean;
  onTranscriberAssign: () => void;
}

export function UsersSummary(props: UsersSummaryProps) {
  const { hasAccess, onTranscriberAssign } = props;
  const api = React.useContext(ApiContext);
  const { translate } = React.useContext(I18nContext);
  const { user } = React.useContext(KeycloakContext);
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = React.useState<User[]>([]);
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [isForbidden, setIsForbidden] = React.useState(false);
  const [usersLoading, setUsersLoading] = React.useState(true);
  const [rolesLoading, setRolesLoading] = React.useState(true);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [checkedUsers, setCheckedUsers] = React.useState<CheckedUsersByUserId>({});
  const [userEmails, setUserEmails] = React.useState<UserEmailsByUserId>({});

  const classes = useStyles();
  const theme = useTheme();

  const getUserEmailsById = (users: User[]) => {
    const tempUserEmails: UserEmailsByUserId = {};
    users.forEach(user => tempUserEmails[user.id] = user.email);
    setUserEmails(tempUserEmails);
  };

  const getUsers = async () => {
    if (api?.IAM) {
      const response = await api.IAM.getUsers();
      if (response.kind === 'ok') {
        setUsers(response.users);
        getUserEmailsById(response.users);
      } else {
        if (response.kind === ProblemKind['forbidden']) {
          setIsForbidden(true);
        }
        log({
          file: `UsersSummary.tsx`,
          caller: `getUsers - failed to get users`,
          value: response,
          important: true,
        });
      }
      setUsersLoading(false);
    }
  };

  React.useEffect(() => {
    const getRoles = async () => {
      if (api?.IAM) {
        const response = await api.IAM.getRoles();
        if (response.kind === 'ok') {
          setRoles(response.roles);
        } else {
          if (response.kind === ProblemKind['forbidden']) {
            setIsForbidden(true);
          }
          log({
            file: `UsersSummary.tsx`,
            caller: `getRoles - failed to get roles`,
            value: response,
            important: true,
          });
        }
        setRolesLoading(false);
      }
    };
    if (hasAccess) {
      getUsers();
      getRoles();
    } else {
      setIsForbidden(true);
    }
  }, []);

  if (isForbidden) {
    return <Forbidden />;
  }

  const handleInviteOpen = () => {
    setInviteOpen(true);
  };
  const handleInviteClose = () => {
    setInviteOpen(false);
    // to get an updated list
    // the new user will immediately be available
    getUsers();
  };

  /**
   * remove the deleted users from all lists
   */
  const handleUpdateSuccess = (updatedUser: User) => {
    const usersCopy = users.slice();
    for (let i = users.length - 1; i >= 0; i--) {
      const user = users[i];
      if (user.id === updatedUser.id) {
        usersCopy.splice(i, 1, updatedUser);
      }
      setUsers(usersCopy);
    };
  };

  let usersToDelete: string[] = [];
  Object.keys(checkedUsers).forEach(userId => {
    const checked = checkedUsers[userId];
    // to ensure that we don't add the current user to the list
    const isCurrentUser = userEmails[userId] === user.email;
    if (checked && !isCurrentUser) {
      usersToDelete.push(userId);
    }
  });

  const confirmDelete = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  /**
   * remove the deleted users from all lists
   */
  const handleDeleteSuccess = (idsToDelete: string[]) => {
    const usersCopy = users.slice();
    // count down to account for removing indexes
    for (let i = users.length - 1; i >= 0; i--) {
      const user = users[i];
      if (idsToDelete.includes(user.id)) {
        usersCopy.splice(i, 1);
      }
    }
    usersToDelete = [];
    setCheckedUsers({});
    setUsers(usersCopy);
  };

  const handleUserDelete = async () => {
    setDeleteLoading(true);
    closeConfirmation();
    const deleteUserPromises: Promise<deleteUserResult>[] = [];
    const successIds: string[] = [];
    usersToDelete.forEach(userId => {
      if (api?.IAM) {
        deleteUserPromises.push(api.IAM.deleteUser(userId));
      } else {
        return;
      }
    });
    let serverError: ServerError | undefined;
    const responseArray = await Promise.all(deleteUserPromises);
    responseArray.forEach((response, responseIndex) => {
      if (response.kind !== "ok") {
        //!
        //TODO
        //* DISPLAY SOMETHING HERE
        // ORGANIZATIONS MUST HAVE AT LEAST ONE MEMBER WITH A ROOT / ADMIN ROLE
        // DISPLAY ANY CAUGHT EXCEPTIONS AND REVERT THE STATE
        log({
          file: `UsersSummary.tsx`,
          caller: `handleUserDelete - Error:`,
          value: response,
          error: true,
        });
        serverError = response.serverError;
        let errorMessageText = translate('common.error');
        if (serverError?.message) {
          errorMessageText = serverError.message;
        }
        enqueueSnackbar(errorMessageText, { variant: SNACKBAR_VARIANTS.error });
      } else {
        successIds.push(usersToDelete[responseIndex]);
        enqueueSnackbar(translate('common.success'), { variant: 'success', preventDuplicate: true });
      }
    });
    // update the user list
    handleDeleteSuccess(successIds);
    setDeleteLoading(false);
  };

  return (
    <Card elevation={0} className={classes.card} >
      <CardContent className={classes.cardContent} >
        {usersLoading || rolesLoading ? <BulletList /> :
          <UsersTable
            users={users}
            roles={roles}
            usersToDelete={usersToDelete}
            confirmDelete={confirmDelete}
            handleInviteOpen={handleInviteOpen}
            deleteLoading={deleteLoading}
            setCheckedUsers={setCheckedUsers}
            handleUpdateSuccess={handleUpdateSuccess}
            onTranscriberAssign={onTranscriberAssign}
          />
        }
      </CardContent>
      <InviteFormDialog open={inviteOpen} onClose={handleInviteClose} />
      <ConfirmationDialog
        destructive
        titleText={`${translate('IAM.deleteUser', { count: usersToDelete.length })}?`}
        submitText={translate('common.delete')}
        open={confirmationOpen}
        onSubmit={handleUserDelete}
        onCancel={closeConfirmation}
      />
    </Card>
  );
};