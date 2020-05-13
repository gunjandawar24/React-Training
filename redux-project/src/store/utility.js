//this is the utility function to update the object.
//updatedValues here are javascript object.
export const updateObject = (oldObject,updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    };
};  