import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DeleteIcon from '@material-ui/icons/Delete'
import MoonLoader from 'react-spinners/MoonLoader';
import React from 'reactn';
import { I18nContext } from '../../../../hooks/i18n/I18nContext';

interface CreateSetFormDialogProps {
    open: boolean;
    deleteMsg: string;
    onClose: () => void;
    onSuccess: () => void;
}


export function DeleteConfirmationDialog(props: CreateSetFormDialogProps) {
    const { deleteMsg ,open, onClose, onSuccess } = props;
    const { translate } = React.useContext(I18nContext);
    const [loading, setLoading] = React.useState(false);

    const theme = useTheme();
    // to expand to fullscreen on small displays
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleClose = () => {
        setLoading(false);
        onClose();
    };

    const handleSuccess = async () => {
        setLoading(true);
        await onSuccess();
        setLoading(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            disableBackdropClick={loading}
            disableEscapeKeyDown={loading}
            aria-labelledby="create-set-dialog"
        >
            <DialogTitle id="create-set-dialog">{translate(deleteMsg)}</DialogTitle>
                <DialogActions>
                    <Button disabled={loading} onClick={onClose} color="primary">
                        {translate("common.cancel")}
                    </Button>
                    <Button
                        onClick={handleSuccess}
                        color="primary"
                        variant="outlined"
                        startIcon={loading ?
                            <MoonLoader
                                sizeUnit={"px"}
                                size={15}
                                color={theme.palette.primary.main}
                                loading={true}
                            /> : <DeleteIcon />}
                    >
                        {translate("common.delete")}
                    </Button>
                </DialogActions>
        </Dialog>
    );
}