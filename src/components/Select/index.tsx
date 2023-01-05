/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Select as MuiSelect,
  MenuItem,
  createStyles,
  withStyles,
  InputBase,
  Checkbox,
  makeStyles,
} from '@material-ui/core';

import * as S from './styles';
const BaseInput: any = withStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      border: `1px solid #B2B2B3`,
      fontSize: '14px',
      padding: '9px 26px 9px 16px',
      '&:focus': {
        borderRadius: 4,
        backgroundColor: 'white',
      },
      '&:hover': {
        borderColor: ` ${(props: any) => props.theme.colors.primary}`,
      },
    },
  })
)(InputBase);

const useStyles = makeStyles({
  checked: {
    color: `${(props: any) => props.theme.colors.success} !important`,
  },
  paper: {
    maxHeight: '200px',
  },
  icon: {
    right: '10px',
    color: `${(props: any) => props.theme.colors.tundora} !important`,
  },
  disabled: {
    opacity: '0.5 !important',
    pointerEvents: 'none',
  },
});

export interface SelectOptionData {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: SelectOptionData[];
  selectedValue?: number | string | string[];
  multiple?: boolean;
  isDisabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange: (value: number | string | string[]) => void;
}

export function Select({
  options,
  selectedValue,
  multiple,
  isDisabled = false,
  error = false,
  onChange,
}: SelectProps) {
  const classes = useStyles();

  return (
    <S.Container error={error}>
      <MuiSelect
        value={selectedValue}
        onChange={(event) => onChange(event.target.value as string | string[])}
        input={<BaseInput />}
        displayEmpty
        renderValue={(selected) => {
          const value = options.find((option) => option.value === selected);
          return value?.label as string;
        }}
        multiple={multiple}
        classes={{ icon: classes.icon, disabled: classes.disabled }}
        disabled={isDisabled}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          classes: {
            paper: classes.paper,
          },
          getContentAnchorEl: null,
        }}
      >
        {multiple ? (
          options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox
                  size={'small'}
                  classes={{
                    checked: classes.checked,
                  }}
                  checked={
                    selectedValue && typeof selectedValue !== 'number'
                      ? selectedValue.indexOf(option.value as string) > -1
                      : undefined
                  }
                />
                <div>{option?.label as string}</div>
              </MenuItem>
            );
          })
        ) : options.length ? (
          options.map((option) => {
            return (
              <MenuItem key={option?.value} value={option.value}>
                <div>{option?.label as string}</div>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem value="" disabled>
            <em>Vazio</em>
          </MenuItem>
        )}
      </MuiSelect>
    </S.Container>
  );
}
