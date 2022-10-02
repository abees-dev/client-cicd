import { List, ListItem, ListProps, styled } from '@mui/material';
import { isEmpty } from 'lodash';
import { FileType } from 'src/types';
import { PropsCustoms } from 'src/types/props';
import IconButtonAnimate from '../animate/IconButtonAnimate';
import Iconify from '../Iconify';
import Image from '../Image';

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 0,
  width: 120,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'inline-flex',
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1),
  position: 'relative',
  overflow: 'hidden',
}));

interface IMultiplePreview {
  files?: Partial<FileType[]>;
  onRemove?: (file: FileType) => void;
}

type MultiplePreviewType = IMultiplePreview & PropsCustoms<ListProps>;
export default function MultiplePreview({ files, onRemove, sx, ...other }: MultiplePreviewType) {
  const hashFiles = !isEmpty(files);
  return (
    <List
      disablePadding
      {...other}
      sx={{
        ...(hashFiles && {
          my: 2,
        }),
        ...sx,
      }}
    >
      {hashFiles &&
        files?.map((file, index) => (
          <ListItemStyled key={index}>
            <Image src={file?.preview} sx={{ width: 120, height: 120 }} ratio="1/1" />
            <IconButtonAnimate
              size="small"
              sx={{ position: 'absolute', top: 2, right: 2 }}
              onClick={() => file && onRemove && onRemove(file)}
            >
              <Iconify icon="ion:close" />
            </IconButtonAnimate>
          </ListItemStyled>
        ))}
    </List>
  );
}
