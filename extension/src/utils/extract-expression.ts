export const extractExpression = ({ input }: { input: string }) => {
  // TODO: check whether includes '' or not
  return input.replace(/^'|'$/g, "");
};
