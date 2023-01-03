import { prefixPluginTranslations } from "@strapi/helper-plugin";
// import { yup } from "@strapi/utils/lib";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import getTrad from "./utils/getTrad";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "url",
      pluginId: "url",
      type: "string",
      icon: PluginIcon,
      intlLabel: {
        id: getTrad("url.label"),
        defaultMessage: "URL",
      },
      intlDescription: {
        id: getTrad("url.description"),
        defaultMessage: "Text field with URL validation",
      },
      components: {
        Input: async () => import("./components/UrlInput"),
      },
      options: {
        // validator: (args) => ({
        //   regex: yup
        //     .string()
        //     .test({
        //       name: "isValidRegExpPattern",
        //       message: "error.validation.regex",
        //       test(value) {
        //         try {
        //           const regex = new RegExp(value);
        //           return regex !== null;
        //         } catch (err) {
        //           return false;
        //         }
        //         // return new RegExp(value) !== null;
        //       },
        //     })
        //     .nullable(false),
        //   required: yup.boolean(),
        //   unique: yup.boolean().nullable(),
        //   maxLength: yup
        //     .number()
        //     .integer()
        //     .positive("error.validation.positive")
        //     .nullable(),
        //   minLength: yup
        //     .number()
        //     .integer()
        //     .min(0)
        //     .when("maxLength", (maxLength, schema) => {
        //       if (maxLength) {
        //         return schema.max(maxLength, "error.validation.minSupMax");
        //       }

        //       return schema;
        //     })
        //     .nullable(),
        //   private: yup.boolean().nullable(),
        // }),
        advanced: [
          {
            name: "regex",
            type: "text",
            intlLabel: {
              id: "form.attribute.item.text.regex",
              defaultMessage: "RegExp pattern",
            },
            description: {
              id: "form.attribute.item.text.regex.description",
              defaultMessage: "The text of the regular expression",
            },
            defaultValue:
              // ((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$
              "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)",
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: "unique",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.uniqueField",
                  defaultMessage: "Unique field",
                },
                description: {
                  id: "form.attribute.item.uniqueField.description",
                  defaultMessage:
                    "You won't be able to create an entry if there is an existing entry with identical content",
                },
              },
              {
                name: "maxLength",
                type: "checkbox-with-number-field",
                intlLabel: {
                  id: "form.attribute.item.maximumLength",
                  defaultMessage: "Maximum length",
                },
              },
              {
                name: "minLength",
                type: "checkbox-with-number-field",
                intlLabel: {
                  id: "form.attribute.item.minimumLength",
                  defaultMessage: "Minimum length",
                },
              },
              {
                name: "private",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.privateField",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.privateField.description",
                  defaultMessage:
                    "This field will not show up in the API response",
                },
              },
            ],
          },
        ],
      },
    });

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
