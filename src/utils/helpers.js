export const generateItemID = (userID, uniqueValue) => {
  const timestamp = Date.now();
  return `${userID}-${timestamp}-${uniqueValue}`;
};

export const getExclusiveElements = (originalArray, modifiedArray) => {
  return originalArray.filter(originalObject =>
    !modifiedArray.find(modifiedObject => {
      const keys = Object.keys(originalObject);
      return keys.every(key => originalObject[key] === modifiedObject[key]);
    })
  );
};
