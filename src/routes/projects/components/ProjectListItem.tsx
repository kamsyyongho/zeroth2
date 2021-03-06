import { Grow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React from 'reactn';
import { I18nContext } from '../../../hooks/i18n/I18nContext';
import { ICONS } from '../../../theme/icons';
import { CustomTheme } from '../../../theme/index';
import { Project } from '../../../types';
import { CheckedProjectsById } from '../ProjectsDialog';
import { ProjectDialog } from './ProjectDialog';
import { EditOpenByProjectId } from './ProjectList';

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    selected: {
      backgroundColor: theme.table.highlight,
    }
  }),
);

interface ProjectListItemProps {
  project: Project;
  selected: boolean;
  canModify: boolean;
  showEdit?: boolean;
  checkedProjects: CheckedProjectsById;
  editOpen: EditOpenByProjectId;
  onItemClick: (project: Project) => void;
  handleEditOpen: (projectId: string) => void;
  handleEditClose: (projectId: string) => void;
  handleEditSuccess: (updatedProject: Project, isEdit?: boolean) => void;
  handleProjectCheck: (projectId: string, value: boolean, triggerDelete?: boolean) => void;
}


export function ProjectListItem(props: ProjectListItemProps) {
  const {
    project,
    canModify,
    showEdit,
    editOpen,
    handleEditClose,
    handleEditOpen,
    checkedProjects,
    handleEditSuccess,
    handleProjectCheck,
    selected,
    onItemClick,
  } = props;
  const { formatDate } = React.useContext(I18nContext);
  const classes = useStyles();
  const isOpen = !!editOpen[project.id];
  let isChecked = false;
  if (checkedProjects && typeof checkedProjects[project.id] === 'boolean') {
    isChecked = checkedProjects[project.id];
  }

  const validDate = new Date(project.validFrom);

  const onClick = () => onItemClick(project);

  return (<React.Fragment key={project.id}>
    <ProjectDialog
      open={isOpen}
      onClose={() => handleEditClose(project.id)}
      onSuccess={handleEditSuccess}
      projectToEdit={project}
      hideBackdrop
    />
    <ListItem dense button onClick={onClick} className={selected ? classes.selected : undefined}>
      <ListItemText primary={project.name} secondary={formatDate(validDate, 'date')} />
      {canModify &&
        <ListItemSecondaryAction>
          <Grow in={showEdit}>
            <ListItemIcon>
              <IconButton aria-label="delete" onClick={() => handleProjectCheck(project.id, true, true)}>
                <ICONS.Trash />
              </IconButton>
            </ListItemIcon>
          </Grow>
          <Grow in={showEdit}>
            <ListItemIcon>
              <IconButton aria-label="edit" onClick={() => handleEditOpen(project.id)}>
                <EditIcon />
              </IconButton>
            </ListItemIcon>
          </Grow>
        </ListItemSecondaryAction>
      }
    </ListItem>
  </React.Fragment>);
};