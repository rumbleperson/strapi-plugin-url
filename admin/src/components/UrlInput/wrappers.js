import styled from "styled-components";
import { Box } from "@strapi/design-system/Box";
import { FieldAction } from "@strapi/design-system/Field";
import { Flex } from "@strapi/design-system/Flex";

export const EndActionWrapper = styled(Box)`
  position: relative;
`;

export const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

export const TypographyWrapper = styled(Flex)`
  position: absolute;
  right: ${({ theme }) => theme.spaces[6]};
  width: 132px;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.neutral0};

  svg {
    margin-right: ${({ theme }) => theme.spaces[1]};
    height: ${12 / 16}rem;
    width: ${12 / 16}rem;
    path {
      fill: ${({ theme, notAvailable }) =>
        !notAvailable ? theme.colors.success600 : theme.colors.danger600};
    }
  }
`;
