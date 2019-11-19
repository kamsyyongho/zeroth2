import { Button, CardHeader, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React from "react";
import { List } from 'react-content-loader';
import MoonLoader from 'react-spinners/MoonLoader';
import { PERMISSIONS } from '../../constants';
import { ApiContext } from '../../hooks/api/ApiContext';
import { I18nContext } from '../../hooks/i18n/I18nContext';
import { KeycloakContext } from '../../hooks/keycloak/KeycloakContext';
import { Organization } from '../../types';
import { SnackbarError } from '../../types/snackbar.types';
import log from '../../util/log/logger';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { RenameOrganizationDialog } from '../shared/RenameOrganizationDialog';

export function UserProfile() {
  const { user, hasPermission } = React.useContext(KeycloakContext);
  const { translate } = React.useContext(I18nContext);
  const api = React.useContext(ApiContext);
  const { enqueueSnackbar } = useSnackbar();
  const [organization, setOrganization] = React.useState<Organization>({} as Organization);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [organizationLoading, setOrganizationLoading] = React.useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const theme = useTheme();

  const showDialog = () => setIsOpen(true);
  const hideDialog = () => setIsOpen(false);
  const confirmReset = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  const hasRenamePermissions = hasPermission(PERMISSIONS.organization);

  const { givenName, familyName, preferredUsername, email, organizationId } = user;

  const getOrganization = async () => {
    if (api && api.organizations) {
      setOrganizationLoading(true);
      const response = await api.organizations.getOrganization();
      if (response.kind === 'ok') {
        setOrganization(response.organization);
      } else {
        log({
          file: `UserProfile.tsx`,
          caller: `getOrganization - failed to get organization`,
          value: response,
          important: true,
        });
      }
      setOrganizationLoading(false);
    }
  };

  const resetPassword = async () => {
    if (api && api.user) {
      closeConfirmation();
      setPasswordResetLoading(true);
      const response = await api.user.resetPassword();
      const snackbarError: SnackbarError = {} as SnackbarError;
      if (response.kind === 'ok') {
        api.logout();
      } else {
        log({
          file: `UserProfile.tsx`,
          caller: `resetPassword - failed to reset password`,
          value: response,
          important: true,
        });
        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError && snackbarError.isError && enqueueSnackbar(snackbarError.errorText, { variant: 'error' });
      setPasswordResetLoading(false);
    }
  };

  React.useEffect(() => {
    if (organizationId) {
      getOrganization();
    }
  }, []);

  return (
    <Container>
      <Card >
        <CardHeader title={translate('profile.user')} />
        <CardContent>
          <Typography color="textPrimary" gutterBottom >
            {translate('profile.fullName', { family: familyName, given: givenName })}
          </Typography>
          <Typography color="textSecondary" >
            {preferredUsername}
          </Typography>
          <Typography color="textSecondary" gutterBottom >
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            size="small"
            onClick={confirmReset}
            disabled={passwordResetLoading}
            startIcon={passwordResetLoading &&
              <MoonLoader
                sizeUnit={"px"}
                size={15}
                color={theme.palette.primary.main}
                loading={true}
              />}
          >
            {translate('profile.resetPassword')}
          </Button>
        </CardActions>
      </Card>
      {(organizationLoading || !organization.name) ? <List /> :
        (<Card >
          <CardHeader title={translate('profile.organization')} />
          <CardContent>
            <Typography color="textPrimary" gutterBottom >
              {organization.name}
            </Typography>
            <Typography color="textSecondary" >
              {organization.id}
            </Typography>
          </CardContent>
          {hasRenamePermissions && (<CardActions onClick={showDialog}>
            <Button variant='contained' color='primary' size="small">{translate('organization.rename')}</Button>
          </CardActions>)}
        </Card>)}
      <RenameOrganizationDialog name={organization.name} open={isOpen} onSuccess={getOrganization} onClose={hideDialog} />
      <ConfirmationDialog
        destructive
        titleText={`${translate('profile.resetPassword')}?`}
        submitText={translate('common.reset')}
        open={confirmationOpen}
        onSubmit={resetPassword}
        onCancel={closeConfirmation}
      />
    </Container>
  );
}
