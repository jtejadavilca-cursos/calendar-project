export const getFieldsToUpdate = (updateDto) => {
  return Object.keys(updateDto).reduce((acc, key) => {
    if (updateDto[key]) {
      acc[key] = updateDto[key];
    }
    return acc;
  }, {});
};
