const yaml = require("js-yaml");
const fs = require("fs");
const hasValidLanguageMatrix = require("./validateLanguageMatrix");

module.exports = async () => {
  try {
    //   Do some logic to verify the leaner understands

    const codeQLWorkflowFile = fs.readFileSync(
      `${process.env.GITHUB_WORKSPACE}/.github/workflows/codeQL.yml`,
      "utf8"
    );
    const parsedCodeQLWorkflow = yaml.load(codeQLWorkflowFile);
    const languageMatrixStatus = hasValidLanguageMatrix(parsedCodeQLWorkflow);

    if (languageMatrixStatus.isValid) {
      return {
        reports: [
          {
            filename: "",
            isCorrect: true,
            display_type: "actions",
            level: "info",
            msg: "Great job!",
            error: {
              expected: "",
              got: "",
            },
          },
        ],
      };
      // BAD-RESULT
    } else {
      return {
        reports: [
          {
            filename: "",
            isCorrect: false,
            display_type: "actions",
            level: "warning",
            msg: `incorrect solution`,
            error: {
              expected:
                "Strategy matrix for CodeQL-Build job to contain one or more languages",
              got: `${languageMatrixStatus.message}`,
            },
          },
        ],
      };
    }
  } catch (error) {
    return {
      reports: [
        {
          filename: "",
          isCorrect: false,
          display_type: "actions",
          level: "fatal",
          msg: "",
          error: {
            expected: "",
            got: "An internal error occurred.  Please open an issue at: https://github.com/githubtraining/exercise-configure-codeql-language-matrix and let us know!  Thank you",
          },
        },
      ],
    };
  }
};
