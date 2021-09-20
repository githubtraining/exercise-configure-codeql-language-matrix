function hasValidLanguageMatrix(parsedWorkflow) {
  const workflowJobKeys = Object.keys(parsedWorkflow.jobs["CodeQL-Build"]);
  const hasStrategy = workflowJobKeys.includes("strategy");

  if (hasStrategy) {
    const strategyKeys = Object.keys(
      parsedWorkflow.jobs["CodeQL-Build"].strategy
    );
    const hasStrategyMatrix = strategyKeys.includes("matrix");
    if (hasStrategyMatrix) {
      const matrixKeys = Object.keys(
        parsedWorkflow.jobs["CodeQL-Build"].strategy.matrix
      );
      const hasLanguageMatrix = matrixKeys.includes("language");
      if (hasLanguageMatrix) {
        const languageMatrixLength =
          parsedWorkflow.jobs["CodeQL-Build"].strategy.matrix.language;
        if (languageMatrixLength.length > 0) {
          return { isValid: true, message: "Valid Language Matrix" };
        }
        return {
          isValid: false,
          message:
            "Language matrix appears to be empty, did you add some languages?",
        };
      }
      return {
        isValid: false,
        message: "No strategy.matrix.language defined for CodeQL-Build job",
      };
    }
    return {
      isValid: false,
      message: "No strategy.matrix defined for CodeQL-Build job",
    };
  }
  return {
    isValid: false,
    message: "No strategy defined for CodeQL-Build job",
  };
}

module.exports = hasValidLanguageMatrix;
