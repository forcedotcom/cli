"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidVersion = void 0;
const isValidVersion = (currentDate) => async (version) => {
  const formattedVersion = `v${version}`;
  const resp = await (
    await fetch(
      "https://raw.githubusercontent.com/nodejs/Release/main/schedule.json"
    )
  ).json();
  console.log(resp);
  return (
    formattedVersion in resp &&
    currentDate >= resp[formattedVersion].start &&
    currentDate <= resp[formattedVersion].end
  );
};
exports.isValidVersion = isValidVersion;
//# sourceMappingURL=nodeVersions.js.map
