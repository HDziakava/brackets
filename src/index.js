module.exports = function check(str, bracketsConfig) {
  let isValid = true;

  function openGroup(group) {
    const groupIndex = bracketsConfig.findIndex((cfg) => cfg[0] === group[0]);
    if (groupIndex < 0) {
      isValid = false;
      return;
    }
    const [openingEl, closingEl] = bracketsConfig[groupIndex];
    let closeCount = 0;
    let closingIndex = null;

    const groupArray = group.split("");

    for (let index = 0; index < groupArray.length; index++) {
      if (groupArray[index] === openingEl) {
        if (openingEl === closingEl && closeCount === 1) {
          closeCount = closeCount - 1;
        } else {
          closeCount = closeCount + 1;
        }
      } else if (groupArray[index] === closingEl) {
        closeCount = closeCount - 1;
      }
      if (closeCount === 0) {
        closingIndex = index;
        break;
      }
    }

    const openedGroup = groupArray.slice(1, closingIndex).join("");

    if (closeCount !== 0) {
      isValid = false;
      return;
    }

    openedGroup.length !== 0 &&
      openGroup(groupArray.slice(1, closingIndex).join(""));
    const lastPart = groupArray.slice(closingIndex + 1);
    if (lastPart.length > 0) {
      openGroup(lastPart.join(""));
    }
  }

  openGroup(str);
  return isValid;
};
