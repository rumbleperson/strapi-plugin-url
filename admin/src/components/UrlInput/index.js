import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import { TextInput } from "@strapi/design-system/TextInput";
import { Typography } from "@strapi/design-system/Typography";
import Link from "@strapi/icons/Link";
import { yup } from "@strapi/utils/lib";
import {
  EndActionWrapper,
  FieldActionWrapper,
  TypographyWrapper,
} from "./wrappers";
import getTrad from "../../utils/getTrad";

const UrlInput = ({
  attribute,
  contentTypeUID,
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  value,
  placeholder,
  required,
}) => {
  const { formatMessage } = useIntl();

  const strapiRegexError = formatMessage({
    id: "components.Input.error.validation.regex",
    defaultMessage: "The value does not match the regex.",
  });

  const pluginRegexError = formatMessage({
    id: getTrad("url.admin.error.url-validation"),
    defaultMessage: "This must be a valid URL. DEFAULT",
  });

  const [hoverLabel, setHoverLabel] = useState(null);
  const [formFieldError, setFormFieldError] = useState(
    error === strapiRegexError ? pluginRegexError : error
  );

  const label = intlLabel.id
    ? formatMessage(
        { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
        { ...intlLabel.values }
      )
    : name;

  const hint = description
    ? formatMessage(
        { id: description.id, defaultMessage: description.defaultMessage },
        { ...description.values }
      )
    : "";

  const formattedPlaceholder = placeholder
    ? formatMessage(
        { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
        { ...placeholder.values }
      )
    : "";

  const isValidUrl = (value) => {
    try {
      yup
        .string()
        .matches(attribute.regex, pluginRegexError)
        .validateSync(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = async (e) => {
    // trigger strapi update hook
    onChange(e);

    // mocking strapi validation error messages
    if (!isValidUrl(e.target.value)) {
      setFormFieldError(
        formatMessage({
          id: getTrad("url.admin.error.url-validation"),
          defaultMessage: "This must be a valid URL.",
        })
      );
    } else {
      setFormFieldError(null);
    }
  };

  const handleClick = () => {
    window.open(value, "_blank");
  };

  const handleMouseEnter = () => {
    setHoverLabel(
      formatMessage({
        id: getTrad("url.admin.button.new-tab"),
        defaultMessage: "Open Link in New Tab",
      })
    );
  };

  const handleMouseLeave = () => {
    setHoverLabel(null);
  };

  useEffect(() => {
    setFormFieldError(error === strapiRegexError ? pluginRegexError : error);
  }, [error]);

  const disableButton = !!formFieldError || !value;

  return (
    <TextInput
      disabled={disabled}
      error={formFieldError}
      endAction={
        <EndActionWrapper>
          {hoverLabel && (
            <TypographyWrapper alignItems="center" justifyContent="flex-end">
              <Typography textColor="primary600" variant="pi">
                {hoverLabel}
              </Typography>
            </TypographyWrapper>
          )}
          <FieldActionWrapper
            onClick={handleClick}
            label={formatMessage({
              id: getTrad("url.admin.button.new-tab"),
              defaultMessage: "Open Link in New Tab",
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={disableButton}
            style={{
              cursor: disableButton ? "not-allowed" : "pointer",
            }}
          >
            <Link />
          </FieldActionWrapper>
        </EndActionWrapper>
      }
      hint={hint}
      label={label}
      labelAction={labelAction}
      name={name}
      onChange={handleChange}
      placeholder={formattedPlaceholder}
      value={value || ""}
      required={required}
    />
  );
};

UrlInput.propTypes = {
  attribute: PropTypes.shape({
    targetField: PropTypes.string,
    required: PropTypes.bool,
  }).isRequired,
  contentTypeUID: PropTypes.string.isRequired,
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  labelAction: PropTypes.element,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  required: PropTypes.bool,
};

UrlInput.defaultProps = {
  description: undefined,
  disabled: false,
  error: undefined,
  labelAction: undefined,
  placeholder: undefined,
  value: "",
  required: false,
};

export default UrlInput;
