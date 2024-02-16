import React from 'react';

import { Link } from '@backstage/core-components';

import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { getKindNamespaceName } from '../utils/rbac-utils';

type EditRoleProps = {
  roleName: string;
  disable: boolean;
  tooltip?: string;
  dataTestId: string;
  to?: string;
};

const EditRole = ({
  roleName,
  tooltip,
  disable,
  dataTestId,
  to,
}: EditRoleProps) => {
  const { name, namespace, kind } = getKindNamespaceName(roleName);
  return (
    <Tooltip title={tooltip || ''}>
      <span data-testid={dataTestId}>
        <IconButton
          color="inherit"
          component={Link}
          aria-label={dataTestId}
          disabled={disable}
          title={tooltip || 'Edit Role'}
          to={to || `../role/${kind}/${namespace}/${name}`}
        >
          <EditIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default EditRole;
