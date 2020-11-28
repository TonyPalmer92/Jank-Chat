function cleanData(data) {
  let Room_Id = null;
  switch (data.room_name) {
    case "JavaScript":
      Room_Id = 1;
      break;
    case "Python":
      Room_Id = 2;
      break;

    default:
      return;
  }

  const newObj = data;
  delete newObj.room_name; // removes room_name prop
  newObj.Room_Id = Room_Id;

  return newObj;
}

module.exports = {
  cleanData,
};
